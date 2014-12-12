package org.kevoree.modeling.api.event;

import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KEvent;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.abs.AbstractKDimension;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.abs.AbstractKUniverse;
import org.kevoree.modeling.api.abs.AbstractKView;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by gregory.nain on 11/11/14.
 */
public class DefaultKBroker implements KEventBroker {

    private static int DIM_INDEX = 0;
    private static int TIME_INDEX = 1;
    private static int UUID_INDEX = 2;
    private static int OBJ_INDEX = 3;
    private static int TUPLE_SIZE = 4;

    private HashMap<ModelListener, Object[]> listeners = new HashMap<ModelListener, Object[]>();

    public DefaultKBroker() {
    }

    public void registerListener(Object origin, ModelListener listener, Object scope) {
        Object[] tuple = new Object[TUPLE_SIZE];
        tuple[OBJ_INDEX] = listener;
        if (origin instanceof AbstractKDimension) {
            tuple[DIM_INDEX] = ((AbstractKDimension) origin).key();
        } else if (origin instanceof AbstractKView) {
            tuple[DIM_INDEX] = ((AbstractKView) origin).dimension().key();
            tuple[TIME_INDEX] = ((AbstractKView) origin).now();
        } else if (origin instanceof AbstractKObject) {
            AbstractKObject casted = (AbstractKObject) origin;
            if (scope == null) {
                tuple[DIM_INDEX] = casted.dimension().key();
                tuple[TIME_INDEX] = casted.now();
                tuple[UUID_INDEX] = casted.uuid();
            } else {
                tuple[UUID_INDEX] = casted.uuid();
                if (scope instanceof AbstractKDimension) {
                    tuple[DIM_INDEX] = ((AbstractKDimension) scope).key();
                }
            }
        }
        listeners.put(listener, tuple);
    }


    //TODO optimize
    public void notify(KEvent event) {


    }

    @Override
    public void flush(Long dimensionKey) {
        //Noop
    }

    @Override
    public void unregister(ModelListener listener) {
        listeners.remove(listener);
    }


}
