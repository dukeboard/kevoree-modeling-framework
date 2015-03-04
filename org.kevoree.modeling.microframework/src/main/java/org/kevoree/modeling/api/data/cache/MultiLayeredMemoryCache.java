package org.kevoree.modeling.api.data.cache;

import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.map.LongHashMap;
import org.kevoree.modeling.api.map.LongHashMapCallBack;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by duke on 20/02/15.
 */
public class MultiLayeredMemoryCache implements KCache {

    public static boolean DEBUG = false;

    private LongHashMap<KCacheLayer> _nestedLayers;

    private static final String prefixDebugGet = "KMF_DEBUG_CACHE_GET";

    private static final String prefixDebugPut = "KMF_DEBUG_CACHE_PUT";

    public MultiLayeredMemoryCache() {
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
            if (nextLayer == null) {
                nextLayer = new KCacheLayer();
                _nestedLayers.put(key.part(0), nextLayer);
            }
            nextLayer.insert(key, 1, payload);
            if (DEBUG) {
                System.out.println(prefixDebugPut + ":" + key + "->" + payload + ")");
            }
        }
    }

    @Override
    public KCacheDirty[] dirties() {
        List<KCacheDirty> result = new ArrayList<KCacheDirty>();
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
    public void clearDataSegment() {
        _nestedLayers.remove(KContentKey.GLOBAL_SEGMENT_DATA_RAW);
        _nestedLayers.remove(KContentKey.GLOBAL_SEGMENT_DATA_INDEX);
        _nestedLayers.remove(KContentKey.GLOBAL_SEGMENT_DATA_LONG_INDEX);
        _nestedLayers.remove(KContentKey.GLOBAL_SEGMENT_DATA_ROOT);
    }

}
