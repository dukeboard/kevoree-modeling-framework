package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.json.JSONModelLoader;
import org.kevoree.modeling.api.time.TimeTree;

import java.util.*;

/**
 * Created by duke on 10/17/14.
 */
public class DefaultKStore implements KStore {

    private static final String keyObjectCounter = "#obj_counter";

    private static final String keyDimensionCounter = "#dim_counter";

    private static final String keyGlobalTimeTree = "#main_timetree";

    private static final char keySep = ',';

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

    private String keyPayload(KDimension dim, long time, long key) {
        return "" + dim.key() + keySep + time + keySep + key;
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
        if (!dimensionCache.timeTreeCache.containsKey(obj.uuid())) {
            dimensionCache.timeTreeCache.put(obj.uuid(), obj.timeTree());
        }
        //MAYBE BOOTLENECK of PERFORMANCE WITH POLYNOMIAL
        TimeCache timeCache = dimensionCache.timesCaches.get(originView.now());
        if (timeCache == null) {
            timeCache = new TimeCache();
            dimensionCache.timesCaches.put(originView.now(), timeCache);
        }
        timeCache.obj_cache.put(obj.uuid(), obj);
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
    public Object[] raw(KObject origin, AccessMode accessMode) {
        if (accessMode.equals(AccessMode.WRITE)) {
            ((AbstractKObject) origin).setDirty(true);
        }
        DimensionCache dimensionCache = caches.get(origin.dimension().key());
        long resolvedTime = origin.now();
        boolean needCopy = accessMode.equals(AccessMode.WRITE) && resolvedTime != origin.factory().now();
        TimeCache timeCache = dimensionCache.timesCaches.get(resolvedTime);
        if (timeCache == null) {
            timeCache = new TimeCache();
            dimensionCache.timesCaches.put(resolvedTime, timeCache);
        }
        Object[] payload = timeCache.payload_cache.get(origin.uuid());
        if (payload == null) {
            payload = new Object[origin.metaAttributes().length + origin.metaReferences().length + 2];
            if (accessMode.equals(AccessMode.WRITE) && !needCopy) {
                timeCache.payload_cache.put(origin.uuid(), payload);
            }
        }
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
            timeCache.payload_cache.put(origin.uuid(), cloned);
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
        DimensionCache dimensionCache = caches.get(dimension.key());
        if (dimensionCache == null) {
            callback.on(null);
        } else {
            for (TimeCache timeCache : dimensionCache.timesCaches.values()) {
                for (KObject cached : timeCache.obj_cache.values()) {
                    if (cached.isDirty()) {
                        String key = keyPayload(dimension, cached.now(), cached.uuid());
                        String payload = cached.toJSON();
                    }
                }
            }
        }
    }

    @Override
    public void saveUnload(KDimension dimension, Callback<Throwable> callback) {
        save(dimension, (c) -> {
            if (c == null) {
                discard(dimension, callback);
            } else {
                callback.on(c);
            }
        });
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
        if (callback == null) {
            return;
        }
        TimeTree tree = timeTree(originView.dimension(), key);
        long resolvedTime = tree.resolve(originView.now());
        KObject resolved = cacheLookup(originView.dimension(), resolvedTime, key);
        if (resolved != null) {
            if (originView.now() == resolvedTime) {
                callback.on(resolved);
            } else {
                KObject proxy = originView.createProxy(resolved.metaClass(), resolved.timeTree(), key);
                callback.on(proxy);
            }
        } else {
            long[] keys = new long[1];
            keys[0] = key;
            loadObjectInCache(originView, keys, (cl) -> {
                List<KObject> dbResolved = cl;
                if (dbResolved.size() == 0) {
                    callback.on(null);
                } else {
                    KObject dbResolvedZero = dbResolved.get(0);
                    if (resolvedTime != originView.now()) {
                        KObject proxy = originView.createProxy(dbResolvedZero.metaClass(), dbResolvedZero.timeTree(), key);
                        callback.on(proxy);
                    } else {
                        callback.on(dbResolvedZero);
                    }
                }
            });
        }
    }

    private void loadObjectInCache(KView originView, long[] keys, Callback<List<KObject>> callback) {
        String[] objStringKeys = new String[keys.length];
        for (int i = 0; i < keys.length; i++) {
            TimeTree tree = timeTree(originView.dimension(), keys[i]);
            long resolvedTime = tree.resolve(originView.now());
            objStringKeys[i] = keyPayload(originView.dimension(), resolvedTime, keys[i]);
        }
        db.get(objStringKeys, (objectPayloads) -> {
            List<KObject> objs = JSONModelLoader.load(objectPayloads, originView);//TODO
            callback.on(objs);
        }, (e) -> {
            callback.on(null);
        });
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
            List<KObject> proxies = new ArrayList<KObject>();
            for (KObject res : resolveds) {
                if (res.now() != originView.now()) {
                    KObject proxy = originView.createProxy(res.metaClass(), res.timeTree(), res.uuid());
                    proxies.add(proxy);
                } else {
                    proxies.add(res);
                }
            }
            callback.on(proxies);
        } else {
            long[] toLoadKeys = new long[toLoad.size()];
            for (int i = 0; i < toLoad.size(); i++) {
                toLoadKeys[i] = toLoad.get(i);
            }
            loadObjectInCache(originView, toLoadKeys, new Callback<List<KObject>>() {
                @Override
                public void on(List<KObject> additional) {
                    resolveds.addAll(additional);
                    List<KObject> proxies = new ArrayList<KObject>();
                    for (KObject res : resolveds) {
                        if (res.now() != originView.now()) {
                            KObject proxy = originView.createProxy(res.metaClass(), res.timeTree(), res.uuid());
                            proxies.add(proxy);
                        } else {
                            proxies.add(res);
                        }
                    }
                    callback.on(proxies);
                }
            });
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
