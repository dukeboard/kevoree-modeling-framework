package org.kevoree.modeling.api.util;

import org.kevoree.modeling.api.KEventListener;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.abs.AbstractKUniverse;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.meta.Meta;

import java.util.HashMap;

/**
 * Created by gregory.nain on 11/11/14.
 */
public class LocalEventListeners {

    private static int DIM_INDEX = 0;
    private static int TIME_INDEX = 1;
    private static int UUID_INDEX = 2;
    private static int TUPLE_SIZE = 3;

    private HashMap<KEventListener, Long[]> listeners = new HashMap<KEventListener, Long[]>();

    public void registerListener(Object origin, KEventListener listener, Object scope) {
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


    public void dispatch(KObject src, Meta[] modications) {
        KEventListener[] keys = listeners.keySet().toArray(new KEventListener[listeners.size()]);
        for (int i = 0; i < keys.length; i++) {
            Object[] tuple = listeners.get(keys[i]);
            boolean match = true;
            if (tuple[DIM_INDEX] != null) {
                if (!tuple[DIM_INDEX].equals(src.universe().key())) {
                    match = false;
                }
            }
            if (tuple[TIME_INDEX] != null) {
                if (!tuple[TIME_INDEX].equals(src.view().now())) {
                    match = false;
                }
            }
            if (tuple[UUID_INDEX] != null) {
                if (!tuple[UUID_INDEX].equals(src.uuid())) {
                    match = false;
                }
            }
            if (match) {
                keys[i].on(src, modications);
            }
        }
    }

    public void unregister(KEventListener listener) {
        listeners.remove(listener);
    }

    public void clear() {
        listeners.clear();
    }


}
