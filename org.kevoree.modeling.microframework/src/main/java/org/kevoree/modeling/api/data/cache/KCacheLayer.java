package org.kevoree.modeling.api.data.cache;

import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.map.LongHashMap;
import org.kevoree.modeling.api.map.LongHashMapCallBack;

import java.util.List;

/**
 * Created by duke on 20/02/15.
 */
public class KCacheLayer {

    private LongHashMap<KCacheLayer> _nestedLayers;

    private LongHashMap<KCacheObject> _cachedObjects;

    public boolean empty(){
        return (_nestedLayers == null || _nestedLayers.size() == 0) && (_cachedObjects == null ||_cachedObjects.size() == 0);
    }

    public KCacheObject resolve(KContentKey p_key, int current) {
        if (current == KConfig.KEY_SIZE - 1) {
            if(_cachedObjects != null){
                return _cachedObjects.get(p_key.part(current));
            } else {
                return null;
            }
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

    public void decClean(KContentKey p_key, int current) {
        if (current == KConfig.KEY_SIZE - 1) {
            KCacheObject obj = _cachedObjects.get(p_key.part(current));
            if(obj != null){
                obj.dec();
                if(obj.counter()<= 0){
                    if(!obj.isDirty()){
                        _cachedObjects.remove(p_key.part(current));
                    }
                }
            }
        } else {
            if (_nestedLayers != null) {
                KCacheLayer nextLayer = _nestedLayers.get(p_key.part(current));
                if (nextLayer != null) {
                    nextLayer.decClean(p_key, current + 1);
                    if(nextLayer.empty()){
                        _nestedLayers.remove(p_key.part(current));
                    }
                }
            }
        }
    }

    public void insert(KContentKey p_key, int current, KCacheObject p_obj_insert) {
        if (current == KConfig.KEY_SIZE - 1) {
            //TODO, protect, only in case of conflict...
            private_insert_object(p_key, current, p_obj_insert);
        } else {
            if (_nestedLayers == null) {
                private_nestedLayers_init();
            }
            KCacheLayer previousLayer = _nestedLayers.get(p_key.part(current));
            if (previousLayer != null) {
                previousLayer.insert(p_key, current + 1, p_obj_insert);
            } else {
                private_insert_nested(p_key, current, p_obj_insert);
            }
        }
    }

    private synchronized void private_insert_object(KContentKey p_key, int current, KCacheObject p_obj_insert) {
        if (_cachedObjects == null) {
            _cachedObjects = new LongHashMap<KCacheObject>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
        }
        _cachedObjects.put(p_key.part(current), p_obj_insert);
    }

    private synchronized void private_nestedLayers_init() {
        if (_nestedLayers == null) {
            _nestedLayers = new LongHashMap<KCacheLayer>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
        }
    }

    private synchronized void private_insert_nested(KContentKey p_key, int current, KCacheObject p_obj_insert) {
        KCacheLayer previousLayer = _nestedLayers.get(p_key.part(current));
        if (previousLayer == null) {
            previousLayer = new KCacheLayer();
            _nestedLayers.put(p_key.part(current), previousLayer);
        }
        previousLayer.insert(p_key, current + 1, p_obj_insert);
    }

    public void dirties(final List<KCacheDirty> result, final long[] prefixKeys, final int current) {
        if (current == KConfig.KEY_SIZE - 1) {
            if (_cachedObjects != null) {
                _cachedObjects.each(new LongHashMapCallBack<KCacheObject>() {
                    @Override
                    public void on(long loopKey, KCacheObject loopCached) {
                        if (loopCached != null && loopCached.isDirty()) {
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
