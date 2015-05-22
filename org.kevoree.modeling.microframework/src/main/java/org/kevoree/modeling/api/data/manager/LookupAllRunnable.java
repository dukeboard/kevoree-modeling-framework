package org.kevoree.modeling.api.data.manager;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.abs.AbstractKModel;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.cache.KCacheObject;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.map.LongLongHashMap;
import org.kevoree.modeling.api.rbtree.ooheap.IndexRBTree;

/**
 * Created by duke on 05/02/15.
 */
public class LookupAllRunnable implements Runnable {

    private long _universe;
    private long _time;

    private long[] _keys;
    private Callback<KObject[]> _callback;
    private DefaultKDataManager _store;

    public LookupAllRunnable(long p_universe, long p_time, long[] p_keys, Callback<KObject[]> p_callback, DefaultKDataManager p_store) {
        this._universe = p_universe;
        this._time = p_time;

        this._keys = p_keys;
        this._callback = p_callback;
        this._store = p_store;
    }

    @Override
    public void run() {
        final KContentKey[] tempKeys = new KContentKey[_keys.length];
        for (int i = 0; i < _keys.length; i++) {
            if (_keys[i] != KConfig.NULL_LONG) {
                tempKeys[i] = KContentKey.createUniverseTree(_keys[i]);
            }
        }
        _store.bumpKeysToCache(tempKeys, new Callback<KCacheObject[]>() {
            @Override
            public void on(KCacheObject[] universeIndexes) {
                for (int i = 0; i < _keys.length; i++) {
                    KContentKey toLoadKey = null;
                    if (universeIndexes[i] != null) {
                        long closestUniverse = ResolutionHelper.resolve_universe(_store.globalUniverseOrder(), (LongLongHashMap) universeIndexes[i], _time, _universe);
                        toLoadKey = KContentKey.createTimeTree(closestUniverse, _keys[i]);
                    }
                    tempKeys[i] = toLoadKey;
                }
                _store.bumpKeysToCache(tempKeys, new Callback<KCacheObject[]>() {
                    @Override
                    public void on(KCacheObject[] timeIndexes) {
                        for (int i = 0; i < _keys.length; i++) {
                            KContentKey resolvedContentKey = null;
                            if (timeIndexes[i] != null) {
                                IndexRBTree cachedIndexTree = (IndexRBTree) timeIndexes[i];
                                long resolvedNode = cachedIndexTree.previousOrEqual(_time);
                                if (resolvedNode != KConfig.NULL_LONG) {
                                    resolvedContentKey = KContentKey.createObject(tempKeys[i].universe, resolvedNode, _keys[i]);
                                }
                            }
                            tempKeys[i] = resolvedContentKey;
                        }
                        _store.bumpKeysToCache(tempKeys, new Callback<KCacheObject[]>() {
                            @Override
                            public void on(KCacheObject[] cachedObjects) {
                                KObject[] proxies = new KObject[_keys.length];
                                for (int i = 0; i < _keys.length; i++) {
                                    if (cachedObjects[i] != null && cachedObjects[i] instanceof KCacheEntry) {
                                        proxies[i] = ((AbstractKModel) _store.model()).createProxy(_universe, _time, _keys[i], ((KCacheEntry) cachedObjects[i]).metaClass);
                                        if (proxies[i] != null) {
                                            IndexRBTree cachedIndexTree = (IndexRBTree) timeIndexes[i];
                                            cachedObjects[i].inc();
                                            cachedIndexTree.inc();
                                        }
                                    }
                                }
                                _callback.on(proxies);
                            }
                        });
                    }
                });
            }
        });
    }

}
