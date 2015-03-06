package org.kevoree.modeling.api.event;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.cache.KCacheObject;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.manager.DefaultKDataManager;
import org.kevoree.modeling.api.data.manager.Index;
import org.kevoree.modeling.api.data.manager.KDataManager;
import org.kevoree.modeling.api.map.LongHashMap;
import org.kevoree.modeling.api.meta.Meta;
import org.kevoree.modeling.api.msg.KEventMessage;

/**
 * Created by gregory.nain on 11/11/14.
 */
public class LocalEventListeners {

    private KDataManager _manager;

    private LongHashMap<LocalListenerUniverseLayer> _universeLayers;

    public LocalEventListeners() {
        _universeLayers = new LongHashMap<LocalListenerUniverseLayer>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
    }

    public synchronized void registerListener(KObject origin, KEventListener listener) {
        LocalListenerUniverseLayer universeLayer = _universeLayers.get(origin.universe().key());
        if (universeLayer == null) {
            universeLayer = new LocalListenerUniverseLayer(origin.universe());
            _universeLayers.put(origin.universe().key(), universeLayer);
        }
        universeLayer.register(origin, listener);
    }

    public void unregister(KObject origin, KEventListener listener) {
        LocalListenerUniverseLayer universeLayer = _universeLayers.get(origin.universe().key());
        if (universeLayer != null) {
            universeLayer.unregister(origin, listener);
        }
    }

    public void clear() {
        _universeLayers.clear();
    }


    public void setManager(KDataManager manager) {
        this._manager = manager;
    }

    public void dispatch(KEventMessage[] messages) {
        if (_manager != null) {
            KContentKey[] toLoad = new KContentKey[messages.length];
            for (int i = 0; i < toLoad.length; i++) {
                LocalListenerUniverseLayer universeLayer = _universeLayers.get(messages[i].key.universe());
                if (universeLayer != null) {
                    if (universeLayer.isListen(messages[i].key)) {
                        toLoad[i] = messages[i].key;
                    }
                }
            }
            ((DefaultKDataManager) _manager).bumpKeysToCache(toLoad, new Callback<KCacheObject[]>() {
                @Override
                public void on(KCacheObject[] kCacheObjects) {
                    for (int i = 0; i < messages.length; i++) {
                        if (kCacheObjects[i] != null && kCacheObjects[i] instanceof KCacheEntry) {
                            LocalListenerUniverseLayer universeLayer = _universeLayers.get(messages[i].key.universe());
                            if (universeLayer != null) {
                                KObject toDispatch = ((AbstractKView) universeLayer.getUniverse().time(messages[i].key.time())).createProxy(((KCacheEntry) kCacheObjects[i]).metaClass, messages[i].key.obj());
                                Meta[] meta = new Meta[messages[i].meta.length];
                                for (int j = 0; j < messages[i].meta.length; j++) {
                                    if (messages[i].meta[j] >= Index.RESERVED_INDEXES) {
                                        meta[j] = toDispatch.metaClass().meta(messages[i].meta[j]);
                                    }
                                }
                                universeLayer.dispatch(toDispatch, meta);
                            }
                        }
                    }
                }
            });
        }
    }

}
