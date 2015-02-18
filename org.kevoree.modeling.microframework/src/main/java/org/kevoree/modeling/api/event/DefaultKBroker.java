package org.kevoree.modeling.api.event;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KEvent;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.abs.AbstractKUniverse;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.data.KStore;
import org.kevoree.modeling.api.meta.MetaModel;

import java.util.HashMap;

/**
 * Created by gregory.nain on 11/11/14.
 */
public class DefaultKBroker implements KEventBroker {

    private static int DIM_INDEX = 0;
    private static int TIME_INDEX = 1;
    private static int UUID_INDEX = 2;
    private static int TUPLE_SIZE = 3;

    private HashMap<ModelListener, Long[]> listeners = new HashMap<ModelListener, Long[]>();

    private MetaModel _metaModel;

    private KStore _store;

    @Override
    public void connect(Callback<Throwable> callback) {
        if (callback != null) {
            callback.on(null);
        }
    }

    @Override
    public void close(Callback<Throwable> callback) {
        listeners.clear();
        if (callback != null) {
            callback.on(null);
        }
    }

    public void registerListener(Object origin, ModelListener listener, Object scope) {
        Long[] tuple = new Long[TUPLE_SIZE];
        if (origin instanceof AbstractKUniverse) {
            tuple[DIM_INDEX] = ((AbstractKUniverse) origin).key();
        } else if (origin instanceof AbstractKView) {
            tuple[DIM_INDEX] = ((AbstractKView) origin).universe().key();
            tuple[TIME_INDEX] = ((AbstractKView) origin).now();
        } else if (origin instanceof AbstractKObject) {
            AbstractKObject casted = (AbstractKObject) origin;
            if (scope == null) {
                tuple[DIM_INDEX] = casted.universe().key();
                tuple[TIME_INDEX] = casted.now();
                tuple[UUID_INDEX] = casted.uuid();
            } else {
                tuple[UUID_INDEX] = casted.uuid();
                if (scope instanceof AbstractKUniverse) {
                    tuple[DIM_INDEX] = ((AbstractKUniverse) scope).key();
                }
            }
        }
        listeners.put(listener, tuple);
    }


    //TODO optimize
    public void notify(KEvent event) {
        ModelListener[] keys = listeners.keySet().toArray(new ModelListener[listeners.size()]);
        for (int i = 0; i < keys.length; i++) {
            Object[] tuple = listeners.get(keys[i]);
            boolean match = true;
            if (tuple[DIM_INDEX] != null) {
                if (!tuple[DIM_INDEX].equals(event.universe())) {
                    match = false;
                }
            }
            if (tuple[TIME_INDEX] != null) {
                if (!tuple[TIME_INDEX].equals(event.time())) {
                    match = false;
                }
            }
            if (tuple[UUID_INDEX] != null) {
                if (!tuple[UUID_INDEX].equals(event.uuid())) {
                    match = false;
                }
            }
            if (match) {
                keys[i].on(event);
            }
        }
    }

    public void sendOperationEvent(KEvent eventk) {
        //NOOP DefaultBroker is local. Should have been found in DefaultOperationManager CallbackTable
    }

    @Override
    public void flush() {
        //Noop
    }

    @Override
    public void setKStore(KStore store) {
        this._store = store;
    }


    @Override
    public void setMetaModel(MetaModel p_metaModel) {
        this._metaModel = p_metaModel;
    }

    @Override
    public void unregister(ModelListener listener) {
        listeners.remove(listener);
    }


}
