package org.kevoree.modeling.api.data.cache;

import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.data.manager.DefaultKDataManager;
import org.kevoree.modeling.api.data.manager.KDataManager;
import org.kevoree.modeling.api.data.manager.ResolutionHelper;
import org.kevoree.modeling.api.map.LongHashMap;
import org.kevoree.modeling.api.map.LongHashMapCallBack;
import org.kevoree.modeling.api.map.LongLongHashMap;
import org.kevoree.modeling.api.rbtree.IndexRBTree;
import org.kevoree.modeling.api.rbtree.TreeNode;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.ListIterator;

/*
public class MultiLayeredMemoryCache implements KCache {

    public static boolean DEBUG = false;

    private LongHashMap<KCacheLayer> _nestedLayers;

    private static final String prefixDebugGet = "KMF_DEBUG_CACHE_GET";

    private static final String prefixDebugPut = "KMF_DEBUG_CACHE_PUT";

    private DefaultKDataManager _manager;

    public MultiLayeredMemoryCache(KDataManager p_manager) {
        this._manager = (DefaultKDataManager) p_manager;
        _nestedLayers = new LongHashMap<KCacheLayer>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
    }

    @Override
    public KCacheObject get(KContentKey key) {
        if (key == null) {
            if (DEBUG) {
                System.out.println(prefixDebugGet + ":NULL->NULL)");
            }
            return null;
        } else {
            KCacheLayer nextLayer = _nestedLayers.get(key.part(0));
            if (nextLayer != null) {
                KCacheObject resolved = nextLayer.resolve(key, 1);
                if (DEBUG) {
                    System.out.println(prefixDebugGet + ":" + key + "->" + resolved + ")");
                }
                return resolved;
            } else {
                if (DEBUG) {
                    System.out.println(prefixDebugGet + ":" + key + "->NULL)");
                }
                return null;
            }
        }
    }

    @Override
    public void put(KContentKey key, KCacheObject payload) {
        if (key == null) {
            if (DEBUG) {
                System.out.println(prefixDebugPut + ":NULL->" + payload + ")");
            }
        } else {
            KCacheLayer nextLayer = _nestedLayers.get(key.part(0));
            if (nextLayer != null) {
                nextLayer.insert(key, 1, payload);
            } else {
                internal_put(key, payload);
            }
            if (DEBUG) {
                System.out.println(prefixDebugPut + ":" + key + "->" + payload + ")");
            }
        }
    }

    private synchronized void internal_put(KContentKey key, KCacheObject payload) {
        KCacheLayer nextLayer = _nestedLayers.get(key.part(0));
        if (nextLayer == null) {
            nextLayer = new KCacheLayer();
            _nestedLayers.put(key.part(0), nextLayer);
        }
        nextLayer.insert(key, 1, payload);
    }

    @Override
    public KCacheDirty[] dirties() {
        final List<KCacheDirty> result = new ArrayList<KCacheDirty>();
        _nestedLayers.each(new LongHashMapCallBack<KCacheLayer>() {
            @Override
            public void on(long loopKey, KCacheLayer loopLayer) {
                long[] prefixKey = new long[KConfig.KEY_SIZE];
                prefixKey[0] = loopKey;
                loopLayer.dirties(result, prefixKey, 1);
            }
        });
        if (DEBUG) {
            System.out.println("KMF_DEBUG_CACHE_DIRTIES:" + result.size());
        }
        return result.toArray(new KCacheDirty[result.size()]);
    }

    @Override
    public void clear() {
        _nestedLayers = new LongHashMap<KCacheLayer>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
    }

    //TODO very bad idea, for performance... drop this...
    private LinkedList<KObjectWeakReference> references = new LinkedList<KObjectWeakReference>();

    @Override
    public void monitor(KObject origin) {
        //KObjectWeakReference phantomRef = new KObjectWeakReference(origin);
        //references.add(phantomRef);
    }

    private void decCleanKey(KContentKey key) {
        if (key != null) {
            KCacheLayer nextLayer = _nestedLayers.get(key.part(0));
            if (nextLayer != null) {
                nextLayer.decClean(key, 1);
            }
        }
    }

    @Override
    public synchronized void clean() {
        if (_manager != null) {
            ListIterator<KObjectWeakReference> iterator = references.listIterator();
            while (iterator.hasNext()) {
                KObjectWeakReference loopRef = iterator.next();
                if (loopRef.get() == null) {
                    iterator.remove();
                    KContentKey objectUniverseTreeKey = KContentKey.createUniverseTree(loopRef.keyParts()[2]);
                    LongLongHashMap objectUniverseTree = (LongLongHashMap) get(objectUniverseTreeKey);
                    if (objectUniverseTree != null) {
                        long resolvedUniverse = ResolutionHelper.resolve_universe(_manager.globalUniverseOrder(), objectUniverseTree, loopRef.keyParts()[1], loopRef.keyParts()[0]);
                        KContentKey timeTreeKey = KContentKey.createTimeTree(resolvedUniverse, loopRef.keyParts()[2]);
                        IndexRBTree timeTree = (IndexRBTree) get(timeTreeKey);
                        if (timeTree != null) {
                            TreeNode resolvedNode = timeTree.previousOrEqual(loopRef.keyParts()[1]);
                            if (resolvedNode != null) {
                                KContentKey toCleanKey = KContentKey.createObject(resolvedUniverse, resolvedNode.getKey(), loopRef.keyParts()[2]);
                                decCleanKey(toCleanKey);
                                decCleanKey(timeTreeKey);
                                decCleanKey(objectUniverseTreeKey);
                            }
                        }
                    }
                }
            }
        }
    }

}*/
