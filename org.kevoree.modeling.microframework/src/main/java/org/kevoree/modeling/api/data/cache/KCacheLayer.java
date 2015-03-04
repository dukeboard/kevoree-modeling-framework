package org.kevoree.modeling.api.data.cache;

import org.kevoree.modeling.api.KConfig;

import java.util.HashMap;
import java.util.List;

/**
 * Created by duke on 20/02/15.
 */
public class KCacheLayer {

    private HashMap<Long, KCacheLayer> _nestedLayers;

    private HashMap<Long, KCacheObject> _cachedObjects;

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
                _cachedObjects = new HashMap<Long, KCacheObject>();
            }
            _cachedObjects.put(p_key.part(current), p_obj_insert);
        } else {
            if (_nestedLayers == null) {
                _nestedLayers = new HashMap<Long, KCacheLayer>();
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
                Long[] objKeys = _cachedObjects.keySet().toArray(new Long[_cachedObjects.keySet().size()]);
                for (int i = 0; i < objKeys.length; i++) {
                    KCacheObject loopCached = _cachedObjects.get(objKeys[i]);
                    if (loopCached.isDirty()) {
                        KContentKey loopKey = new KContentKey(prefixKeys[0], prefixKeys[1], prefixKeys[2], objKeys[i]);
                        result.add(new KCacheDirty(loopKey, loopCached));
                    }
                }
            }
        } else {
            if (_nestedLayers != null) {
                Long[] nestedKeys = _nestedLayers.keySet().toArray(new Long[_nestedLayers.keySet().size()]);
                for (int i = 0; i < nestedKeys.length; i++) {
                    long[] prefixKeysCloned = new long[KConfig.KEY_SIZE];
                    for (int j = 0; j < current; j++) {
                        prefixKeysCloned[j] = prefixKeys[j];
                    }
                    prefixKeysCloned[current] = nestedKeys[i];
                    _nestedLayers.get(nestedKeys[i]).dirties(result, prefixKeysCloned, current + 1);
                }
            }
        }
    }

}
