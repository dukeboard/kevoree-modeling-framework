package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KObject;

import java.util.HashMap;

/**
 * Created by thomas on 10/2/14.
 */
public class DefaultMemoryCache implements DataCache {

    private static final char sep = '/';

    private HashMap<String, KObject> obj_cache = new HashMap<String, KObject>();
    private HashMap<String, Object[]> payload_cache = new HashMap<String, Object[]>();

    @Override
    public void put(KDimension dimension, long time, String path, KObject value, int indexSize) {
        String key = dimension.key() + sep + time + sep + path;
        obj_cache.put(key, value);
        payload_cache.put(key, new Object[indexSize]);
    }

    @Override
    public KObject get(KDimension dimension, long time, String path) {
        String key = dimension.key() + sep + time + sep + path;
        return obj_cache.get(key);
    }

    @Override
    public Object getPayload(KDimension dimension, long time, String path, int index) {
        String key = dimension.key() + sep + time + sep + path;
        Object[] previousArray = payload_cache.get(key);
        if (previousArray == null) {
            throw new RuntimeException("Inconsistency error, bad allocation");
        }
        return previousArray[index];

    }

    @Override
    public void putPayload(KDimension dimension, long time, String path, int index, Object payload) {
        String key = dimension.key() + sep + time + sep + path;
        Object[] previousArray = payload_cache.get(key);
        if (previousArray == null) {
            throw new RuntimeException("Inconsistency error, bad allocation");
        }
        previousArray[index] = payload;
    }
}
