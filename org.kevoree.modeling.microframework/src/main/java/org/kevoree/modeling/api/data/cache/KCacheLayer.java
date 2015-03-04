package org.kevoree.modeling.api.data.cache;

import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.map.LongHashMap;
import org.kevoree.modeling.api.map.LongHashMapCallBack;

import java.util.HashMap;
import java.util.List;

/**
 * Created by duke on 20/02/15.
 */
public class KCacheLayer {

    private LongHashMap<KCacheLayer> _nestedLayers;

    private LongHashMap<KCacheObject> _cachedObjects;

    public KCacheObject resolve(KContentKey p_key, int current) {
        if (current == KConfig.KEY_SIZE - 1) {
            return _cachedObjects.get(p_key.part(current));
        } else {
            if (_nestedLayers != null) {
                KCacheLayer nextLayer = _nestedLayers.get(p_key.part(current));
                if (nextLayer != null) {
                    return nextLayer.resolve(p_key, current + 1);
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }
    }

    public void insert(KContentKey p_key, int current, KCacheObject p_obj_insert) {
        if (current == KConfig.KEY_SIZE - 1) {
            if (_cachedObjects == null) {
                _cachedObjects = new LongHashMap<KCacheObject>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
            }
            _cachedObjects.put(p_key.part(current), p_obj_insert);
        } else {
            if (_nestedLayers == null) {
                _nestedLayers = new LongHashMap<KCacheLayer>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
            }
            KCacheLayer previousLayer = _nestedLayers.get(p_key.part(current));
            if (previousLayer == null) {
                previousLayer = new KCacheLayer();
                _nestedLayers.put(p_key.part(current), previousLayer);
            }
            previousLayer.insert(p_key, current + 1, p_obj_insert);
        }
    }

    public void dirties(List<KCacheDirty> result, long[] prefixKeys, int current) {
        if (current == KConfig.KEY_SIZE - 1) {
            if (_cachedObjects != null) {
                _cachedObjects.each(new LongHashMapCallBack<KCacheObject>() {
                    @Override
                    public void on(long loopKey, KCacheObject loopCached) {
                        if (loopCached.isDirty()) {
                            KContentKey cachedKey = new KContentKey(prefixKeys[0], prefixKeys[1], prefixKeys[2], loopKey);
                            result.add(new KCacheDirty(cachedKey, loopCached));
                        }
                    }
                });
            }
        } else {
            if (_nestedLayers != null) {
                _nestedLayers.each(new LongHashMapCallBack<KCacheLayer>() {
                    @Override
                    public void on(long loopKey, KCacheLayer loopValue) {
                        long[] prefixKeysCloned = new long[KConfig.KEY_SIZE];
                        for (int j = 0; j < current; j++) {
                            prefixKeysCloned[j] = prefixKeys[j];
                        }
                        prefixKeysCloned[current] = loopKey;
                        loopValue.dirties(result, prefixKeysCloned, current + 1);
                    }
                });
            }
        }
    }

}
