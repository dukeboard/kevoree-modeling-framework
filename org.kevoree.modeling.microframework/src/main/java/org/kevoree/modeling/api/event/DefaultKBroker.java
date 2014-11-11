package org.kevoree.modeling.api.event;

import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KEvent;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.abs.AbstractKDimension;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.abs.AbstractKUniverse;
import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.data.cache.DimensionCache;
import org.kevoree.modeling.api.data.cache.TimeCache;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by gregory.nain on 11/11/14.
 */
public class DefaultKBroker implements KEventBroker {

    private List<ModelListener> universeListeners = new ArrayList<ModelListener>();
    private Map<Long, DimensionCache> caches;
    public DefaultKBroker(Map<Long, DimensionCache> pcaches) {
        this.caches = pcaches;
    }

    public void registerListener(Object origin, ModelListener listener) {
        if (origin instanceof AbstractKObject) {
            DimensionCache dimensionCache = caches.get(((KDimension) origin).key());
            TimeCache timeCache = dimensionCache.timesCaches.get(((KView) origin).now());
            List<ModelListener> obj_listeners = timeCache.obj_listeners.get(((KObject) origin).uuid());
            if (obj_listeners == null) {
                obj_listeners = new ArrayList<ModelListener>();
                timeCache.obj_listeners.put(((KObject) origin).uuid(), obj_listeners);
            }
            obj_listeners.add(listener);
        } else if (origin instanceof AbstractKView) {
            DimensionCache dimensionCache = caches.get(((KDimension) origin).key());
            TimeCache timeCache = dimensionCache.timesCaches.get(((KView) origin).now());
            timeCache.listeners.add(listener);
        } else if (origin instanceof AbstractKDimension) {
            DimensionCache dimensionCache = caches.get(((KDimension) origin).key());
            dimensionCache.listeners.add(listener);
        } else if (origin instanceof AbstractKUniverse) {
            universeListeners.add(listener);
        }
    }

    //TODO optimize
    public void notify(KEvent event) {
        DimensionCache dimensionCache = caches.get(event.getSourceDimension());
        if(dimensionCache != null) {
            TimeCache timeCache = dimensionCache.timesCaches.get(event.getSourceTime());
            List<ModelListener> obj_listeners = timeCache.obj_listeners.get(event.getSourceUUID());
            if (obj_listeners != null) {
                for (int i = 0; i < obj_listeners.size(); i++) {
                    ModelListener listener = obj_listeners.get(i);
                    listener.on(event);
                }
            }
            for (int i = 0; i < timeCache.listeners.size(); i++) {
                ModelListener listener = timeCache.listeners.get(i);
                listener.on(event);
            }
            for (int i = 0; i < dimensionCache.listeners.size(); i++) {
                ModelListener listener = dimensionCache.listeners.get(i);
                listener.on(event);
            }
        }

        for (int i = 0; i < universeListeners.size(); i++) {
            ModelListener listener = universeListeners.get(i);
            listener.on(event);
        }
    }

    @Override
    public void flush(Long dimensionKey) {
        //noop
    }
}
