package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.time.TimeTree;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by thomas on 10/2/14.
 */
public class DefaultMemoryCache implements DataCache {

    private static final char sep = '/';

    private Map<String, KObject> obj_cache = new HashMap<String, KObject>();
    private Map<String, Object[]> payload_cache = new HashMap<String, Object[]>();
    private Map<String, TimeTree> timeTreeCache = new HashMap<String, TimeTree>();

    @Override
    public void put(KDimension dimension, long time, String path, KObject obj) {
        int nbIndexes = obj.metaAttributes().length + obj.metaReferences().length + 1; //+1 for outbounds references
        String key = dimension.key() + sep + time + sep + path;
        obj_cache.put(key, obj);
        payload_cache.put(key, new Object[nbIndexes]);
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

    @Override
    public TimeTree getTimeTree(KDimension dimension, String path) {
        return timeTreeCache.get(dimension.key() + path);
    }

    @Override
    public void putTimeTree(KDimension dimension, String path, TimeTree payload) {
        timeTreeCache.put(dimension.key() + path, payload);
    }
}
