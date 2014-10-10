package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.data.DataCache;
import org.kevoree.modeling.api.KObject;

import java.util.HashMap;

/**
 * Created by thomas on 10/2/14.
 */
public class DefaultMemoryCache implements DataCache {
    private HashMap<String, KObject> obj_cache = new HashMap<String, KObject>();
    private HashMap<String, Object[]> payload_cache = new HashMap<String, Object[]>();

    @Override
    public void put(String key, KObject value, int indexSize) {
        obj_cache.put(key, value);
        payload_cache.put(key, new Object[indexSize]);
    }

    @Override
    public KObject get(String key) {
        return obj_cache.get(key);
    }

    @Override
    public Object getPayload(String key, int index) {
        Object[] previousArray = payload_cache.get(key);
        if (previousArray == null) {
            throw new RuntimeException("Inconsistency error, bad allocation");
        }
        return previousArray[index];
    }

    @Override
    public void putPayload(String key, int index, Object payload) {
        Object[] previousArray = payload_cache.get(key);
        if (previousArray == null) {
            throw new RuntimeException("Inconsistency error, bad allocation");
        }
        previousArray[index] = payload;
    }
}
