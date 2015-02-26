package org.kevoree.modeling.api.data.cdn;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KEventListener;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.data.cache.KCache;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.cache.MultiLayeredMemoryCache;
import org.kevoree.modeling.api.data.manager.KDataManager;
import org.kevoree.modeling.api.meta.Meta;
import org.kevoree.modeling.api.msg.KEventMessage;
import org.kevoree.modeling.api.msg.KMessage;
import org.kevoree.modeling.api.util.LocalEventListeners;

import java.util.HashMap;

public class MemoryKContentDeliveryDriver implements KContentDeliveryDriver {

    private final HashMap<String, String> backend = new HashMap<String, String>();
    private LocalEventListeners _localEventListeners = new LocalEventListeners();
    private KDataManager _manager;
    public static boolean DEBUG = false;

    //TODO implement a lock
    @Override
    public void atomicGetMutate(KContentKey key, AtomicOperation operation, ThrowableCallback<String> callback) {
        String result = backend.get(key.toString());
        String mutated = operation.mutate(result);
        if (DEBUG) {
            System.out.println("ATOMIC GET " + key + "->" + result);
            System.out.println("ATOMIC PUT " + key + "->" + mutated);
        }
        backend.put(key.toString(), mutated);
        callback.on(result, null);
    }

    @Override
    public void get(KContentKey[] keys, ThrowableCallback<String[]> callback) {
        String[] values = new String[keys.length];
        for (int i = 0; i < keys.length; i++) {
            values[i] = backend.get(keys[i].toString());
            if (DEBUG) {
                System.out.println("GET " + keys[i] + "->" + values[i]);
            }
        }
        if (callback != null) {
            callback.on(values, null);
        }
    }

    @Override
    public synchronized void put(KContentPutRequest p_request, Callback<Throwable> p_callback) {
        for (int i = 0; i < p_request.size(); i++) {
            backend.put(p_request.getKey(i).toString(), p_request.getContent(i));
            if (DEBUG) {
                System.out.println("PUT " + p_request.getKey(i).toString() + "->" + p_request.getContent(i));
            }
        }
        if (p_callback != null) {
            p_callback.on(null);
        }
    }

    @Override
    public void remove(String[] keys, Callback<Throwable> callback) {
        for (int i = 0; i < keys.length; i++) {
            backend.remove(keys[i]);
        }
        if (callback != null) {
            callback.on(null);
        }
    }

    @Override
    public void connect(Callback<Throwable> callback) {
        if (callback != null) {
            callback.on(null);
        }
    }

    @Override
    public void close(Callback<Throwable> callback) {
        _localEventListeners.clear();
        backend.clear();
    }



    @Override
    public void registerListener(Object p_origin, KEventListener p_listener, Object p_scope) {
        _localEventListeners.registerListener(p_origin, p_listener, p_scope);
    }

    @Override
    public void unregister(KEventListener p_listener) {
        _localEventListeners.unregister(p_listener);
    }

    @Override
    public void send(KEventMessage[] msgs) {
        //NO REMOVE MANAGEMENT
        fireLocalMessages(msgs);
    }

    @Override
    public void setManager(KDataManager manager) {
        this._manager = manager;
    }


    private void fireLocalMessages(KEventMessage[] msgs) {
        KContentKey _previousKey = null;
        KView _currentView = null;

        for(int i = 0; i < msgs.length; i++) {
            KContentKey sourceKey = msgs[i].key;
            if(_previousKey == null || sourceKey.part1() != _previousKey.part1() || sourceKey.part2() != _previousKey.part2()) {
                _currentView = _manager.model().universe(sourceKey.part1()).time(sourceKey.part2());
                _previousKey = sourceKey;
            }
            final int tempIndex = i;
            _currentView.lookup(sourceKey.part3()).then(new Callback<KObject>() {
                public void on(KObject kObject) {
                    if (kObject != null) {
                        Meta[] modifiedMetas = new Meta[msgs[tempIndex].meta.length];
                        for(int j = 0; j < msgs[tempIndex].meta.length; j++) {
                            modifiedMetas[tempIndex] = kObject.metaClass().meta(msgs[tempIndex].meta[j]);
                        }
                        _localEventListeners.dispatch(kObject, modifiedMetas);
                    }
                }
            });
        }
    }

}