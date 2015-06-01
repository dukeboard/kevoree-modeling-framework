package org.kevoree.modeling.memory.manager;

import org.kevoree.modeling.KObject;
import org.kevoree.modeling.Callback;
import org.kevoree.modeling.KConfig;
import org.kevoree.modeling.abs.AbstractKModel;
import org.kevoree.modeling.memory.struct.segment.KCacheSegment;
import org.kevoree.modeling.memory.KCacheElement;
import org.kevoree.modeling.memory.KContentKey;
import org.kevoree.modeling.memory.struct.map.LongLongHashMap;
import org.kevoree.modeling.memory.struct.tree.KLongTree;

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
        _store.bumpKeysToCache(tempKeys, new Callback<KCacheElement[]>() {
            @Override
            public void on(KCacheElement[] universeIndexes) {
                for (int i = 0; i < _keys.length; i++) {
                    KContentKey toLoadKey = null;
                    if (universeIndexes[i] != null) {
                        long closestUniverse = ResolutionHelper.resolve_universe(_store.globalUniverseOrder(), (LongLongHashMap) universeIndexes[i], _time, _universe);
                        toLoadKey = KContentKey.createTimeTree(closestUniverse, _keys[i]);
                    }
                    tempKeys[i] = toLoadKey;
                }
                _store.bumpKeysToCache(tempKeys, new Callback<KCacheElement[]>() {
                    @Override
                    public void on(KCacheElement[] timeIndexes) {
                        for (int i = 0; i < _keys.length; i++) {
                            KContentKey resolvedContentKey = null;
                            if (timeIndexes[i] != null) {
                                KLongTree cachedIndexTree = (KLongTree) timeIndexes[i];
                                long resolvedNode = cachedIndexTree.previousOrEqual(_time);
                                if (resolvedNode != KConfig.NULL_LONG) {
                                    resolvedContentKey = KContentKey.createObject(tempKeys[i].universe, resolvedNode, _keys[i]);
                                }
                            }
                            tempKeys[i] = resolvedContentKey;
                        }
                        _store.bumpKeysToCache(tempKeys, new Callback<KCacheElement[]>() {
                            @Override
                            public void on(KCacheElement[] cachedObjects) {
                                KObject[] proxies = new KObject[_keys.length];
                                for (int i = 0; i < _keys.length; i++) {
                                    if (cachedObjects[i] != null && cachedObjects[i] instanceof KCacheSegment) {
                                        proxies[i] = ((AbstractKModel) _store.model()).createProxy(_universe, _time, _keys[i], _store.model().metaModel().metaClasses()[((KCacheSegment) cachedObjects[i]).metaClassIndex()]);
                                        if (proxies[i] != null) {
                                            KLongTree cachedIndexTree = (KLongTree) timeIndexes[i];
                                            cachedIndexTree.inc();

                                            LongLongHashMap universeTree = (LongLongHashMap) universeIndexes[i];
                                            universeTree.inc();

                                            cachedObjects[i].inc();
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
