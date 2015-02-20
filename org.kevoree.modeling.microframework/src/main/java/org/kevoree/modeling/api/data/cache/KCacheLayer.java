package org.kevoree.modeling.api.data.cache;

import java.util.HashMap;
import java.util.List;

/**
 * Created by duke on 20/02/15.
 */
public class KCacheLayer {

    private HashMap<Long, KCacheLayer> _nestedLayers;

    private HashMap<Long, KCacheObject> _cachedObjects;

    private KCacheObject _cachedNullObject;

    private KCacheLayer _nestedNullLayer;

    public KCacheObject resolve(KContentKey p_key, int current) {
        if (p_key.part(current) == null) {
            if (current == KContentKey.ELEM_SIZE - 1) {
                return _cachedNullObject;
            } else {
                if (_nestedNullLayer != null) {
                    return _nestedNullLayer.resolve(p_key, current + 1);
                } else {
                    return null;
                }
            }
        } else {
            if (current == KContentKey.ELEM_SIZE - 1) {
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
    }

    public void insert(KContentKey p_key, int current, KCacheObject p_obj_insert) {
        if (p_key.part(current) == null) {
            if (current == KContentKey.ELEM_SIZE - 1) {
                _cachedNullObject = p_obj_insert;
            } else {
                if (_nestedNullLayer == null) {
                    _nestedNullLayer = new KCacheLayer();
                }
                _nestedNullLayer.insert(p_key, current + 1, p_obj_insert);
            }
        } else {
            if (current == KContentKey.ELEM_SIZE - 1) {
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
    }

    public void dirties(List<KCacheDirty> result, Long[] prefixKeys, int current) {
        if (current == KContentKey.ELEM_SIZE) {
            if (_cachedNullObject != null) {
                KContentKey nullKey = new KContentKey(prefixKeys[0], prefixKeys[1], prefixKeys[2], null);
                result.add(new KCacheDirty(nullKey, _cachedNullObject));
            }
            Long[] objKeys = _cachedObjects.keySet().toArray(new Long[_cachedObjects.keySet().size()]);
            for (int i = 0; i < objKeys.length; i++) {
                KContentKey loopKey = new KContentKey(prefixKeys[0], prefixKeys[1], prefixKeys[2], objKeys[i]);
                result.add(new KCacheDirty(loopKey, _cachedObjects.get(objKeys[i])));
            }
        } else {
            if (_nestedNullLayer != null) {
                _nestedNullLayer.dirties(result, prefixKeys, current + 1);
            }
            if (_nestedLayers != null) {
                Long[] nestedKeys = _nestedLayers.keySet().toArray(new Long[_nestedLayers.keySet().size()]);
                for (int i = 0; i < nestedKeys.length; i++) {
                    Long[] prefixKeysCloned = new Long[KContentKey.ELEM_SIZE];
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
