package org.kevoree.modeling.api.data.manager;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.cache.KCacheObject;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.map.LongLongHashMap;
import org.kevoree.modeling.api.rbtree.IndexRBTree;
import org.kevoree.modeling.api.rbtree.TreeNode;

/**
 * Created by duke on 05/02/15.
 */
public class LookupAllRunnable implements Runnable {

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
                        long closestUniverse = ResolutionHelper.resolve_universe(_store.globalUniverseOrder(), (LongLongHashMap) universeIndexes[i], _originView.now(), _originView.universe().key());
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
                                TreeNode resolvedNode = cachedIndexTree.previousOrEqual(_originView.now());
                                if (resolvedNode != null) {
                                    resolvedContentKey = KContentKey.createObject(tempKeys[i].universe, resolvedNode.getKey(), _keys[i]);

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
                                        proxies[i] = ((AbstractKView) _originView).createProxy(((KCacheEntry) cachedObjects[i]).metaClass, _keys[i]);
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
