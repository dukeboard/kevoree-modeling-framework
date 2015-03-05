package org.kevoree.modeling.api.data.manager;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
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
        _store.internal_resolve_universe_time(_originView, _keys, new Callback<KContentKey[]>() {
            @Override
            public void on(final KContentKey[] toLoadContentRaws) {
                _store.bumpKeysToCache(toLoadContentRaws, new Callback<KCacheObject[]>() {
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
