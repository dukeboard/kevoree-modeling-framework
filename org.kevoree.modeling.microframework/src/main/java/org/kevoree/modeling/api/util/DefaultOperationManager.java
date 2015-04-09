package org.kevoree.modeling.api.util;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.manager.KDataManager;
import org.kevoree.modeling.api.map.IntHashMap;
import org.kevoree.modeling.api.map.LongHashMap;
import org.kevoree.modeling.api.meta.MetaOperation;
import org.kevoree.modeling.api.msg.KMessage;
import org.kevoree.modeling.api.msg.KMessageLoader;
import org.kevoree.modeling.api.msg.KOperationCallMessage;
import org.kevoree.modeling.api.msg.KOperationResultMessage;

/**
 * Created by gregory.nain on 28/11/14.
 */
public class DefaultOperationManager implements KOperationManager {

    private IntHashMap<IntHashMap<KOperation>> staticOperations;

    private LongHashMap<IntHashMap<KOperation>> instanceOperations;

    private LongHashMap<Callback<Object>> remoteCallCallbacks = new LongHashMap<Callback<Object>>(KConfig.CACHE_INIT_SIZE,KConfig.CACHE_LOAD_FACTOR);

    private KDataManager _manager;

    private int _callbackId = 0;

    public DefaultOperationManager(KDataManager p_manager) {
        this.staticOperations = new IntHashMap<IntHashMap<KOperation>>(KConfig.CACHE_INIT_SIZE,KConfig.CACHE_LOAD_FACTOR);
        this.instanceOperations = new LongHashMap<IntHashMap<KOperation>>(KConfig.CACHE_INIT_SIZE,KConfig.CACHE_LOAD_FACTOR);
        this._manager = p_manager;
    }

    @Override
    public void registerOperation(MetaOperation operation, KOperation callback, KObject target) {
        if (target == null) {
            IntHashMap<KOperation> clazzOperations = staticOperations.get(operation.origin().index());
            if (clazzOperations == null) {
                clazzOperations = new IntHashMap<KOperation>(KConfig.CACHE_INIT_SIZE,KConfig.CACHE_LOAD_FACTOR);
                staticOperations.put(operation.origin().index(), clazzOperations);
            }
            clazzOperations.put(operation.index(), callback);
        } else {
            IntHashMap<KOperation> objectOperations = instanceOperations.get(target.uuid());
            if (objectOperations == null) {
                objectOperations = new IntHashMap<KOperation>(KConfig.CACHE_INIT_SIZE,KConfig.CACHE_LOAD_FACTOR);
                instanceOperations.put(target.uuid(), objectOperations);
            }
            objectOperations.put(operation.index(), callback);
        }
    }

    private KOperation searchOperation(Long source, int clazz, int operation) {
        IntHashMap<KOperation> objectOperations = instanceOperations.get(source);
        if (objectOperations != null) {
            return objectOperations.get(operation);
        }
        IntHashMap<KOperation> clazzOperations = staticOperations.get(clazz);
        if (clazzOperations != null) {
            return clazzOperations.get(operation);
        }
        return null;
    }

    @Override
    public void call(KObject source, MetaOperation operation, Object[] param, Callback<Object> callback) {
        KOperation operationCore = searchOperation(source.uuid(), operation.origin().index(), operation.index());
        if (operationCore != null) {
            operationCore.on(source, param, callback);
        } else {
            sendToRemote(source, operation, param, callback);
        }
    }

    private void sendToRemote(KObject source, MetaOperation operation, Object[] param, Callback<Object> callback) {
        String[] stringParams = new String[param.length];
        for (int i = 0; i < param.length; i++) {
            stringParams[i] = param[i].toString();
        }
        KContentKey contentKey = new KContentKey(KContentKey.GLOBAL_SEGMENT_DATA_RAW, source.universe().key(), source.now(), source.uuid());
        KOperationCallMessage operationCall = new KOperationCallMessage();
        operationCall.id = nextKey();
        operationCall.key = contentKey;
        operationCall.classIndex = source.metaClass().index();
        operationCall.opIndex = operation.index();
        operationCall.params = stringParams;
        remoteCallCallbacks.put(operationCall.id, callback);
        _manager.cdn().send(operationCall);
    }

    public synchronized long nextKey() {
        if (_callbackId == KConfig.CALLBACK_HISTORY) {
            _callbackId = 0;
        } else {
            _callbackId++;
        }
        return _callbackId;
    }

    public void operationEventReceived(KMessage operationEvent) {
        if (operationEvent.type() == KMessageLoader.OPERATION_RESULT_TYPE) {
            KOperationResultMessage operationResult = (KOperationResultMessage) operationEvent;
            Callback<Object> cb = remoteCallCallbacks.get(operationResult.id);
            if (cb != null) {
                cb.on(operationResult.value);
            }
        } else if (operationEvent.type() == KMessageLoader.OPERATION_CALL_TYPE) {
            final KOperationCallMessage operationCall = (KOperationCallMessage) operationEvent;
            KContentKey sourceKey = operationCall.key;
            final KOperation operationCore = searchOperation(sourceKey.obj(), operationCall.classIndex, operationCall.opIndex);
            if (operationCore != null) {
                KView view = _manager.model().universe(sourceKey.universe()).time(sourceKey.time());
                view.lookup(sourceKey.obj()).then(new Callback<KObject>() {
                    public void on(KObject kObject) {
                        if (kObject != null) {
                            operationCore.on(kObject, operationCall.params, new Callback<Object>() {
                                public void on(Object o) {
                                    KOperationResultMessage operationResultMessage = new KOperationResultMessage();
                                    operationResultMessage.key = operationCall.key;
                                    operationResultMessage.id = operationCall.id;
                                    operationResultMessage.value = o.toString();
                                    _manager.cdn().send(operationResultMessage);
                                }
                            });
                        }
                    }
                });
            }
        } else {
            System.err.println("BAD ROUTING !");
            //Wrong routing.
        }
    }

}
