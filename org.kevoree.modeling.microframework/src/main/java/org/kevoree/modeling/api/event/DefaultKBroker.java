package org.kevoree.modeling.api.event;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KEvent;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.OperationCallback;
import org.kevoree.modeling.api.abs.AbstractKDimension;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.abs.AbstractKUniverse;
import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaOperation;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by gregory.nain on 11/11/14.
 */
public class DefaultKBroker implements KEventBroker {

    private List<ModelListener> universeListeners = new ArrayList<ModelListener>();
    private Map<Long, List<ModelListener>> dimensionListeners = new HashMap<Long, List<ModelListener>>();
    private List<ListenerRegistration> timeListeners = new ArrayList<ListenerRegistration>();
    private List<ListenerRegistration> objectListeners =new ArrayList<ListenerRegistration>();

    private Map<Integer, Map<Integer, OperationCallback>> operationCallbacks = new HashMap<Integer, Map<Integer, OperationCallback>>();

    public DefaultKBroker() {
    }

    public void registerListener(Object origin, ModelListener listener, ListenerScope scope) {

        if (origin instanceof AbstractKUniverse) {
            universeListeners.add(listener);
        } else if (origin instanceof AbstractKDimension) {
            List<ModelListener> dimListeners = dimensionListeners.get(((KDimension) origin).key());
            if(dimListeners == null) {
                dimListeners = new ArrayList<ModelListener>();
                dimensionListeners.put(((KDimension) origin).key(), dimListeners);
            }
            dimListeners.add(listener);
        } else if (origin instanceof AbstractKView) {
            ListenerScope sc = scope;
            if(sc == null) {
                sc = ListenerScope.DIMENSION;
            }
            ListenerRegistration reg = new ListenerRegistration(listener, sc, ((AbstractKView) origin).dimension().key(), ((AbstractKView) origin).now(), 0);
            timeListeners.add(reg);
        } else if (origin instanceof AbstractKObject) {
            ListenerScope sc = scope;
            if(sc == null) {
                sc = ListenerScope.TIME;
            }
            ListenerRegistration reg = new ListenerRegistration(listener, sc, ((AbstractKObject) origin).dimension().key(), ((AbstractKObject) origin).now(), ((AbstractKObject) origin).uuid());
            objectListeners.add(reg);
        }
    }

    @Override
    public void registerOperation(MetaClass clazz, MetaOperation operation, OperationCallback callback) {
        Map<Integer, OperationCallback> clazzOperations = operationCallbacks.get(clazz.index());
        if(clazzOperations == null) {
            clazzOperations = new HashMap<Integer, OperationCallback>();
            operationCallbacks.put(clazz.index(), clazzOperations);
        }
        clazzOperations.put(operation.index(), callback);
    }

    //TODO optimize
    public void notify(KEvent event) {

        for (int i = 0; i < universeListeners.size(); i++) {
            ModelListener listener = universeListeners.get(i);
            listener.on(event);
        }

        List<ModelListener> dimList = dimensionListeners.get(event.dimension());
        if(dimList != null) {
            for (int j = 0; j < dimList.size(); j++) {
                ModelListener listener = dimList.get(j);
                listener.on(event);
            }
        }

        for (int k = 0; k < timeListeners.size(); k++) {
            ListenerRegistration reg = timeListeners.get(k);
            if((reg.scope().value() & ListenerScope.UNIVERSE.value())!=0) {
                if(reg.time() == event.time()) {
                    reg.listener().on(event);
                }
            } else {
                if(reg.dimension() == event.dimension() && reg.time() == event.time()) {
                    reg.listener().on(event);
                }
            }
        }

        for (int l = 0; l < objectListeners.size(); l++) {
            ListenerRegistration reg = objectListeners.get(l);
            if((reg.scope().value() & ListenerScope.UNIVERSE.value())!=0) {
                if(reg.uuid() == event.uuid()) {
                    reg.listener().on(event);
                }
            } else if((reg.scope().value() & ListenerScope.DIMENSION.value())!=0) {
                if(reg.dimension() == event.dimension() && reg.uuid() == event.uuid()) {
                    reg.listener().on(event);
                }
            } else {
                if(reg.dimension() == event.dimension() && reg.time() == event.time() && reg.uuid() == event.uuid()) {
                    reg.listener().on(event);
                }
            }
        }
    }

    @Override
    public void flush(Long dimensionKey) {
        //noop
    }

    @Override
    public void call(KObject element, MetaOperation operation, Callback<Object> callback, Object... parameters) {
        Map<Integer, OperationCallback> clazzOperations = operationCallbacks.get(element.metaClass().index());
        if(clazzOperations != null) {
            OperationCallback operationCore = clazzOperations.get(operation.index());
            if(callback != null) {
                operationCore.onCall(element, callback, parameters);
            } else {
                // try remote call
            }
        } else {
            //Try remote call
        }
    }
}
