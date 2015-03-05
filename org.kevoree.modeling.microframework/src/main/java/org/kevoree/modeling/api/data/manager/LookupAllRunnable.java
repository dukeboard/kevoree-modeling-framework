package org.kevoree.modeling.api.data.manager;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.cache.KCacheObject;
import org.kevoree.modeling.api.data.cache.KContentKey;

/**
 * Created by duke on 05/02/15.
 */
public class LookupAllRunnable implements Runnable {

    public static boolean DEBUG = false;

    private KView _originView;
    private long[] _keys;
    private Callback<KObject[]> _callback;
    private DefaultKDataManager _store;

    public LookupAllRunnable(KView p_originView, long[] p_keys, Callback<KObject[]> p_callback, DefaultKDataManager p_store) {
        this._originView = p_originView;
        this._keys = p_keys;
        this._callback = p_callback;
        this._store = p_store;
    }

    @Override
    public void run() {
        _store.internal_resolve_universe_time(_originView, _keys, new Callback<ResolutionResult[]>() {
            @Override
            public void on(final ResolutionResult[] objects) {
                KContentKey[] dependencyKeys = new KContentKey[objects.length];
                for (int i = 0; i < objects.length; i++) {
                    if (objects[i] != null && objects[i].resolvedQuanta != KConfig.NULL_LONG && objects[i].resolvedUniverse != KConfig.NULL_LONG) {
                        KContentKey contentKey = KContentKey.createObject(objects[i].resolvedUniverse, objects[i].resolvedQuanta, _keys[i]);
                        dependencyKeys[i] = contentKey;
                    }
                }
                _store.bumpKeysToCache(dependencyKeys, new Callback<KCacheObject[]>() {
                    @Override
                    public void on(KCacheObject[] cachedObjects) {
                        KObject[] proxies = new KObject[_keys.length];
                        for (int i = 0; i < _keys.length; i++) {
                            if (cachedObjects[i] != null && cachedObjects[i] instanceof KCacheEntry) {
                                proxies[i] = ((AbstractKView) _originView).createProxy(((KCacheEntry) cachedObjects[i]).metaClass, _keys[i]);
                            }
                        }
                        _callback.on(proxies);
                    }
                });
            }
        });
    }
}
