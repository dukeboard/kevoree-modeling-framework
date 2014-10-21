package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.time.TimeTree;

import java.util.*;

/**
 * Created by duke on 10/17/14.
 */
public class DefaultKStore implements KStore {

    private KDataBase db;

    private class DimensionCache {
        protected Map<Long, TimeTree> timeTreeCache = new HashMap<Long, TimeTree>();
        protected Map<Long, TimeCache> timesCaches = new HashMap<Long, TimeCache>();
        protected KDimension dimension;

        public DimensionCache(KDimension dimension) {
            this.dimension = dimension;
        }
    }

    private class TimeCache {
        protected Map<Long, KObject> obj_cache = new HashMap<Long, KObject>();
        protected Map<Long, Object[]> payload_cache = new HashMap<Long, Object[]>();
    }


    private Map<Long, DimensionCache> caches = new HashMap<Long, DimensionCache>();

    public DefaultKStore(KDataBase db) {
        this.db = db;
    }

    public void initDimension(KDimension dimension) {
        caches.put(dimension.key(), new DimensionCache(dimension));
    }

    public void initKObject(KObject obj, KView originView) {
        DimensionCache dimensionCache = caches.get(originView.dimension().key());
        TimeCache timeCache = dimensionCache.timesCaches.get(originView.now());
        if (timeCache == null) {
            timeCache = new TimeCache();
            dimensionCache.timesCaches.put(originView.now(), timeCache);
        }
        if (!dimensionCache.timeTreeCache.containsKey(obj.kid())) {
            dimensionCache.timeTreeCache.put(obj.kid(), obj.timeTree());
        }
        timeCache.obj_cache.put(obj.kid(), obj);
        timeCache.payload_cache.put(obj.kid(), new Object[obj.metaAttributes().length + obj.metaReferences().length + 2]);
        dimensionCache.timeTreeCache.put(obj.kid(), obj.timeTree());
    }

    long dimKeyCounter = 0;

    @Override
    public long nextDimensionKey() {
        dimKeyCounter++;
        return dimKeyCounter;//TODO
    }

    long objectKey = 0;

    @Override
    public long nextObjectKey() {
        objectKey++;
        return objectKey;//TODO
    }

    private KObject cacheLookup(KDimension dimension, long time, long key) {
        DimensionCache dimensionCache = caches.get(dimension.key());
        TimeCache timeCache = dimensionCache.timesCaches.get(time);
        if (timeCache == null) {
            return null;
        } else {
            return timeCache.obj_cache.get(key);
        }
    }

    private List<KObject> cacheLookupAll(KDimension dimension, long time, Set<Long> keys) {
        List<KObject> resolved = new ArrayList<KObject>();
        for (Long kid : keys) {
            KObject res = cacheLookup(dimension, time, kid);
            if (res != null) {
                resolved.add(res);
            }
        }
        return resolved;
    }

    @Override
    public Object[] raw(KObject origin, long key, boolean write) {
        DimensionCache dimensionCache = caches.get(origin.dimension().key());
        long resolvedTime = origin.now();
        boolean needCopy = write && resolvedTime != origin.factory().now();
        TimeCache timeCache = dimensionCache.timesCaches.get(resolvedTime);
        if (timeCache == null) {
            timeCache = new TimeCache();
            dimensionCache.timesCaches.put(resolvedTime, timeCache);
        }
        Object[] payload = timeCache.payload_cache.get(key);
        if (!needCopy) {
            return payload;
        } else {
            //deep copy the structure
            Object[] cloned = new Object[payload.length];
            for (int i = 0; i < payload.length; i++) {
                Object resolved = payload[i];
                if (resolved != null) {
                    if (resolved instanceof String) {
                        cloned[i] = resolved;
                    } else if (resolved instanceof Set) {
                        HashSet<String> clonedSet = new HashSet<String>((Set<String>) resolved);
                        cloned[i] = clonedSet;
                    } else if (resolved instanceof List) {
                        ArrayList<String> clonedSet = new ArrayList<String>((List<String>) resolved);
                        cloned[i] = clonedSet;
                    }
                }
            }

            TimeCache timeCacheCurrent = dimensionCache.timesCaches.get(origin.factory().now());
            if (timeCacheCurrent == null) {
                timeCacheCurrent = new TimeCache();
                dimensionCache.timesCaches.put(origin.factory().now(), timeCacheCurrent);
            }
            timeCache.payload_cache.put(key, cloned);
            origin.timeTree().insert(origin.factory().now());
            origin.factory().dimension().globalTimeTree().insert(origin.factory().now());
            return cloned;
        }

    }

    @Override
    public void discard(KDimension dimension, Callback<Throwable> callback) {
        caches.remove(dimension.key());
        callback.on(null);
    }

    @Override
    public void delete(KDimension dimension, Callback<Throwable> callback) {
        new Exception("Not implemented yet !");
    }

    @Override
    public void save(KDimension dimension, Callback<Throwable> callback) {
        new Exception("Not implemented yet !");
    }

    @Override
    public void saveUnload(KDimension dimension, Callback<Throwable> callback) {
        new Exception("Not implemented yet !");
    }

    @Override
    public TimeTree timeTree(KDimension dimension, long key) {
        DimensionCache dimensionCache = caches.get(dimension.key());
        TimeTree cachedTree = dimensionCache.timeTreeCache.get(key);
        if (cachedTree == null) {
            return null;
        } else {
            return cachedTree;
        }
    }

    //TODO protect for //call

    @Override
    public void lookup(KView originView, long key, Callback<KObject> callback) {
        TimeTree tree = timeTree(originView.dimension(), key);
        long resolvedTime = tree.resolve(originView.now());
        KObject resolved = cacheLookup(originView.dimension(), resolvedTime, key);
        if (resolved != null) {
            if (originView.now() == resolvedTime) {
                callback.on(resolved);
            } else {
                //create proxy
                callback.on(resolved);
            }
        } else {
            db.get(keyPayload(originView.dimension(), resolvedTime, key), (objPayLoad) -> {
                KObject newObject = SerializerHelper.load(objPayLoad);
                initKObject(newObject, originView);
                callback.on(newObject);
            }, (e) -> {
                callback.on(null);
            });
        }
    }

    private final char keySep = ',';

    private String keyPayload(KDimension dim, long time, long key) {
        return "" + dim.key() + keySep + time + keySep + key;
    }

    @Override
    public void lookupAll(KView originView, Set<Long> key, Callback<List<KObject>> callback) {
        List<Long> toLoad = new ArrayList<Long>(key);
        List<KObject> resolveds = new ArrayList<KObject>();
        for (Long kid : key) {
            KObject resolved = cacheLookup(originView.dimension(), originView.now(), kid);
            if (resolved != null) {
                resolveds.add(resolved);
                toLoad.remove(kid);
            }
        }
        if (toLoad.size() == 0) {
            callback.on(resolveds);
        } else {
            //resolve
            //TODO load the rest of object
            callback.on(null);
        }
    }

    @Override
    public KDimension getDimension(long key) {
        DimensionCache dimensionCache = caches.get(key);
        if (dimensionCache != null) {
            return dimensionCache.dimension;
        } else {
            return null;
        }
    }

}
