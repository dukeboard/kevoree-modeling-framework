package org.kevoree.modeling.api.event;

import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.KEventListener;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KUniverse;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.map.LongHashMap;
import org.kevoree.modeling.api.meta.Meta;

import java.util.ArrayList;

/**
 * Created by duke on 06/03/15.
 */
public class LocalListenerUniverseLayer {

    public KUniverse getUniverse() {
        return universe;
    }

    private KUniverse universe;

    private LongHashMap<ArrayList<KEventListener>> _objectLayers;

    public LocalListenerUniverseLayer(KUniverse universe) {
        this.universe = universe;
        _objectLayers = new LongHashMap<ArrayList<KEventListener>>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
    }

    public void register(KObject origin, KEventListener listener) {
        ArrayList<KEventListener> listeners = _objectLayers.get(origin.uuid());
        if (listeners == null) {
            listeners = new ArrayList<KEventListener>();
            _objectLayers.put(origin.uuid(), listeners);
        }
        listeners.add(listener);
    }

    public void unregister(KObject origin, KEventListener listener) {
        ArrayList<KEventListener> listeners = _objectLayers.get(origin.uuid());
        if (listeners != null) {
            listeners.remove(listener);
            if (listeners.isEmpty()) {
                _objectLayers.remove(origin.uuid());
            }
        }
    }

    public void dispatch(KObject resolved, Meta[] impactedMeta) {
        ArrayList<KEventListener> listeners = _objectLayers.get(resolved.uuid());
        if (listeners != null) {
            for (int i = 0; i < listeners.size(); i++) {
                KEventListener listener = listeners.get(i);
                listener.on(resolved, impactedMeta);
            }
        }
    }

    public boolean isListen(KContentKey key) {
        return _objectLayers.containsKey(key.obj());
    }

}
