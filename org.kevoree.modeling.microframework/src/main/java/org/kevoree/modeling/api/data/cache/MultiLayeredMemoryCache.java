package org.kevoree.modeling.api.data.cache;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by duke on 20/02/15.
 */
public class MultiLayeredMemoryCache implements KCache {

    public static boolean DEBUG = false;

    private HashMap<Long, KCacheLayer> _nestedLayers = new HashMap<Long, KCacheLayer>();

    private static final String prefixDebugGet = "KMF_DEBUG_CACHE_GET";

    private static final String prefixDebugPut = "KMF_DEBUG_CACHE_PUT";

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
        Long[] L0_KEYS = _nestedLayers.keySet().toArray(new Long[_nestedLayers.keySet().size()]);
        for (int i = 0; i < L0_KEYS.length; i++) {
            KCacheLayer layer = _nestedLayers.get(L0_KEYS[i]);
            if (layer != null) {
                Long[] prefixKey = new Long[KContentKey.ELEM_SIZE];
                prefixKey[0] = L0_KEYS[i];
                layer.dirties(result, prefixKey, 1);
            }
        }
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
