package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KObject;
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

    public void initKObject(KObject obj, KDimension currentDim, long currentNow) {
        DimensionCache dimensionCache = caches.get(currentDim.key());
        TimeCache timeCache = dimensionCache.timesCaches.get(currentNow);
        if (timeCache == null) {
            timeCache = new TimeCache();
            dimensionCache.timesCaches.put(currentNow, timeCache);
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

    @Override
    public KObject cacheLookup(KDimension dimension, long time, long key) {
        DimensionCache dimensionCache = caches.get(dimension.key());
        TimeCache timeCache = dimensionCache.timesCaches.get(time);
        if (timeCache == null) {
            return null;
        } else {
            return timeCache.obj_cache.get(key);
        }
    }

    @Override
    public List<KObject> cacheLookupAll(KDimension dimension, long time, Set<Long> keys) {
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
    public Object[] raw(KDimension dimension, long time, long key) {
        DimensionCache dimensionCache = caches.get(dimension.key());
        TimeCache timeCache = dimensionCache.timesCaches.get(time);
        if (timeCache == null) {
            return null;
        } else {
            return timeCache.payload_cache.get(key);
        }
    }

    @Override
    public void saveUnload(KDimension dimension) {

    }

    @Override
    public void discard(KDimension dimension) {
        caches.remove(dimension.key());
    }

    @Override
    public void delete(KDimension dimension) {

    }

    @Override
    public TimeTree timeTree(KDimension dimension, long key) {
        return null;
    }

    @Override
    public void lookup(KDimension dimension, long time, long key, Callback<KObject> callback) {
        KObject resolved = cacheLookup(dimension, time, key);
        if (resolved != null) {
            callback.on(resolved);
        } else {
            //TODO load the object from the DB, unserialize and prepare cache
            callback.on(null);
        }
    }

    @Override
    public void lookupAll(KDimension dimension, long time, Set<Long> key, Callback<List<KObject>> callback) {
        List<Long> toLoad = new ArrayList<Long>(key);
        List<KObject> resolveds = new ArrayList<KObject>();
        for (Long kid : key) {
            KObject resolved = cacheLookup(dimension, time, kid);
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
