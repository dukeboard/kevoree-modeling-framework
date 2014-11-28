package org.kevoree.modeling.api.util;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KOperation;
import org.kevoree.modeling.api.data.KStore;
import org.kevoree.modeling.api.meta.MetaOperation;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by gregory.nain on 28/11/14.
 */
public class DefaultOperationManager implements KOperationManager{

    private Map<Integer, Map<Integer, KOperation>> operationCallbacks = new HashMap<Integer, Map<Integer, KOperation>>();
    private KStore _store;

    public DefaultOperationManager(KStore store) {
        this._store = store;
    }

    @Override
    public void registerOperation(MetaOperation operation, KOperation callback) {
        Map<Integer, KOperation> clazzOperations = operationCallbacks.get(operation.origin().index());
        if (clazzOperations == null) {
            clazzOperations = new HashMap<Integer, KOperation>();
            operationCallbacks.put(operation.origin().index(), clazzOperations);
        }
        clazzOperations.put(operation.index(), callback);
    }

    @Override
    public void call(KObject source, MetaOperation operation, Object[] param, Callback<Object> callback) {
        Map<Integer, KOperation> clazzOperations = operationCallbacks.get(source.metaClass().index());
        if (clazzOperations != null) {
            KOperation operationCore = clazzOperations.get(operation.index());
            if (callback != null) {
                operationCore.on(source, param, callback);
            } else {
                // try remote call
                //TODO
            }
        } else {
            //Try remote call
            //TODO
        }
    }


}
