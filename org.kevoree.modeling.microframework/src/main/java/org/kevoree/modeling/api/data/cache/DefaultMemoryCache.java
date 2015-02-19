package org.kevoree.modeling.api.data.cache;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by duke on 18/02/15.
 */
public class DefaultMemoryCache implements KCache {

    public static boolean DEBUG = false;

    //TODO refactory this dummy code...
    private HashMap<String, KCacheObject> cache = new HashMap<String, KCacheObject>();

    @Override
    public KCacheObject get(KContentKey key) {
        KCacheObject result = cache.get(key.toString());
        if (DEBUG) {
            if (result != null) {
                System.out.println("CACHE_GET:" + key + "->" + result.getClass().getName() + "(" + result + ")");
            } else {
                System.out.println("CACHE_GET:" + key + "->" + null);
            }
        }
        return result;
    }

    @Override
    public void put(KContentKey key, KCacheObject payload) {
        cache.put(key.toString(), payload);
        if (DEBUG) {
            System.out.println("CACHE_PUT:" + key + "->" + payload.getClass().getName() + "(" + payload + ")");
        }
    }

    @Override
    public KContentKey[] dirties() {
        List<KContentKey> result = new ArrayList<KContentKey>();
        String[] elems = cache.keySet().toArray(new String[cache.keySet().size()]);
        for (int i = 0; i < elems.length; i++) {
            if (cache.get(elems[i]).isDirty()) {
                result.add(KContentKey.create(elems[i]));
            }
        }
        return result.toArray(new KContentKey[result.size()]);
    }

    @Override
    public void clearDataSegment() {

    }

}
