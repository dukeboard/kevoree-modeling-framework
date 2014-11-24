package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KEvent;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.data.cache.DimensionCache;
import org.kevoree.modeling.api.data.cache.TimeCache;
import org.kevoree.modeling.api.event.DefaultKBroker;
import org.kevoree.modeling.api.event.KEventBroker;
import org.kevoree.modeling.api.extrapolation.Extrapolation;
import org.kevoree.modeling.api.json.JsonModelLoader;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.api.time.DefaultTimeTree;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.HashSet;
import java.util.Set;


/**
 * Created by duke on 10/17/14.
 */
public class DefaultKStore implements KStore {

    public static final char KEY_SEP = ',';
    public static final String UUID_DB_KEY = "#UUID";
    public static final String DIM_DB_KEY = "#DIMKEY";
    private static final int RANGE_LENGTH = 500;
    private static final int RANGE_THRESHOLD = 100;

    private IDRange currentUUIDRange, nextUUIDRange;
    private IDRange currentDimensionRange, nextDimensionRange;


    private KDataBase _db;
    private Map<Long, DimensionCache> caches = new HashMap<Long, DimensionCache>();
    private KEventBroker _eventBroker;

    //TODO loadDirect and save from DB
    //long dimKeyCounter = 0;

    //TODO loadDirect and save from DB
    //long objectKey = 0;

    public DefaultKStore() {
        this._db = new MemoryKDataBase();
        this._eventBroker = new DefaultKBroker(caches);
        initRange(UUID_DB_KEY);
        initRange(DIM_DB_KEY);
    }

    private String keyTree(KDimension dim, long key) {
        return "" + dim.key() + KEY_SEP + key;
    }

    private String keyRoot(KDimension dim, long time) {
        return "" + dim.key() + KEY_SEP + time + KEY_SEP + "root";
    }

    private String keyRootTree(KDimension dim) {
        return "" + dim.key() + KEY_SEP + "root";
    }

    private String keyPayload(KDimension dim, long time, long key) {
        return "" + dim.key() + KEY_SEP + time + KEY_SEP + key;
    }

    private void initRange(String key) {
        _db.get(new String[]{key}, new ThrowableCallback<String[]>() {
            public void on(String[] results, Throwable throwable) {
                if (throwable != null) {
                    throwable.printStackTrace();
                } else {
                    long min = 1L;
                    if (results[0] != null) {
                        min = Long.parseLong(results[0]);
                    }
                    if (key.equals(UUID_DB_KEY)) {
                        nextUUIDRange = new IDRange(min, min + RANGE_LENGTH, RANGE_THRESHOLD);
                    } else {
                        nextDimensionRange = new IDRange(min, min + RANGE_LENGTH, RANGE_THRESHOLD);
                    }
                    _db.put(new String[][]{new String[]{key, "" + (min + RANGE_LENGTH)}}, new Callback<Throwable>() {
                        @Override
                        public void on(Throwable throwable) {
                            if (throwable != null) {
                                throwable.printStackTrace();
                            }
                        }
                    });
                }
            }
        });
    }

    public void initDimension(KDimension dimension, final Callback<Throwable> callback) {
        final DimensionCache dimensionCache = new DimensionCache(dimension);
        caches.put(dimension.key(), dimensionCache);
        String[] rootTreeKeys = new String[1];
        rootTreeKeys[0] = keyRootTree(dimension);
        _db.get(rootTreeKeys, new ThrowableCallback<String[]>() {
            @Override
            public void on(String[] res, Throwable error) {
                if (error != null) {
                    callback.on(error);
                } else {
                    try {
                        ((DefaultTimeTree) dimensionCache.rootTimeTree).load(res[0]);
                        callback.on(null);
                    } catch (Exception e) {
                        callback.on(e);
                    }
                }
            }
        });
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

    @Override
    public long nextDimensionKey() {
        if (currentDimensionRange == null || currentDimensionRange.isEmpty()) {
            currentDimensionRange = nextDimensionRange;
        }
        if (currentDimensionRange.isThresholdReached()) {
            initRange(DIM_DB_KEY);
        }
        return currentDimensionRange.newUuid();
    }

    @Override
    public long nextObjectKey() {
        if (currentUUIDRange == null || currentUUIDRange.isEmpty()) {
            currentUUIDRange = nextUUIDRange;
        }
        if (currentUUIDRange.isThresholdReached()) {
            initRange(UUID_DB_KEY);
        }
        return currentUUIDRange.newUuid();
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
    public Object[] raw(KObject origin, AccessMode accessMode) {
        if (accessMode.equals(AccessMode.WRITE)) {
            ((AbstractKObject) origin).setDirty(true);
        }
        DimensionCache dimensionCache = caches.get(origin.dimension().key());
        long resolvedTime = origin.timeTree().resolve(origin.now());
        boolean needCopy = accessMode.equals(AccessMode.WRITE) && resolvedTime != origin.now();
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
                    if (resolved instanceof Set) {
                        HashSet<Long> clonedSet = new HashSet<Long>();
                        clonedSet.addAll((Set<Long>) resolved);
                        cloned[i] = clonedSet;
                    } else if (resolved instanceof List) {
                        ArrayList<Long> clonedList = new ArrayList<Long>();
                        clonedList.addAll((List<Long>) resolved);
                        cloned[i] = clonedList;
                    } else {
                        cloned[i] = resolved;
                    }
                }
            }
            TimeCache timeCacheCurrent = dimensionCache.timesCaches.get(origin.now());
            if (timeCacheCurrent == null) {
                timeCacheCurrent = new TimeCache();
                dimensionCache.timesCaches.put(origin.view().now(), timeCacheCurrent);
            }
            timeCacheCurrent.payload_cache.put(origin.uuid(), cloned);
            origin.timeTree().insert(origin.view().now());
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

    private int getSizeOfDirties(DimensionCache dimensionCache, TimeCache[] timeCaches) {
        int sizeCache = 0;
        for (int i = 0; i < timeCaches.length; i++) {
            TimeCache timeCache = timeCaches[i];
            KObject[] valuesArr = timeCache.obj_cache.values().toArray(new KObject[timeCache.obj_cache.size()]);
            for (int j = 0; j < valuesArr.length; j++) {
                KObject cached = valuesArr[j];
                if (cached.isDirty()) {
                    sizeCache++;
                }
            }
            if (timeCache.rootDirty) {
                sizeCache++;
            }
        }
        TimeTree[] timeTrees = dimensionCache.timeTreeCache.values().toArray(new TimeTree[dimensionCache.timeTreeCache.size()]);
        for (int k = 0; k < timeTrees.length; k++) {
            TimeTree timeTree = timeTrees[k];
            if (timeTree.isDirty()) {
                sizeCache++;
            }
        }
        if (dimensionCache.rootTimeTree.isDirty()) {
            sizeCache++;
        }
        return sizeCache;
    }

    @Override
    public void save(KDimension dimension, Callback<Throwable> callback) {
        DimensionCache dimensionCache = caches.get(dimension.key());
        if (dimensionCache == null) {
            callback.on(null);
        } else {
            TimeCache[] timeCaches = dimensionCache.timesCaches.values().toArray(new TimeCache[dimensionCache.timesCaches.size()]);
            int sizeCache = getSizeOfDirties(dimensionCache, timeCaches);
            String[][] payloads = new String[sizeCache][2];
            int i = 0;
            for (int j = 0; j < timeCaches.length; j++) {
                TimeCache timeCache = timeCaches[j];
                KObject[] valuesArr = timeCache.obj_cache.values().toArray(new KObject[timeCache.obj_cache.size()]);
                for (int k = 0; k < valuesArr.length; k++) { //TODO call directly the ToJSON on the the Object[] raw
                    KObject cached = valuesArr[k];
                    if (cached.isDirty()) {
                        String[] payloadA = new String[2];
                        payloadA[0] = keyPayload(dimension, cached.now(), cached.uuid());
                        payloadA[1] = cached.toJSON();
                        payloads[i] = payloadA;
                        ((AbstractKObject) cached).setDirty(false);
                        i++;
                    }
                }
                if (timeCache.rootDirty) {
                    String[] payloadB = new String[2];
                    payloadB[0] = keyRoot(dimension, timeCache.root.now());
                    payloadB[1] = timeCache.root.uuid() + "";
                    payloads[i] = payloadB;
                    timeCache.rootDirty = false;
                    i++;
                }
            }

            Long[] keyArr = dimensionCache.timeTreeCache.keySet().toArray(new Long[dimensionCache.timeTreeCache.size()]);
            for (int l = 0; l < keyArr.length; l++) {
                Long timeTreeKey = keyArr[l];
                TimeTree timeTree = dimensionCache.timeTreeCache.get(timeTreeKey);
                if (timeTree.isDirty()) {
                    String[] payloadC = new String[2];
                    payloadC[0] = keyTree(dimension, timeTreeKey);
                    payloadC[1] = timeTree.toString();
                    payloads[i] = payloadC;
                    ((DefaultTimeTree) timeTree).setDirty(false);
                    i++;
                }
            }
            if (dimensionCache.rootTimeTree.isDirty()) {
                String[] payloadD = new String[2];
                payloadD[0] = keyRootTree(dimension);
                payloadD[1] = dimensionCache.rootTimeTree.toString();
                payloads[i] = payloadD;
                ((DefaultTimeTree) dimensionCache.rootTimeTree).setDirty(false);
                i++;
            }
            _db.put(payloads, callback);
            _eventBroker.flush(dimension.key());
        }
    }

    @Override
    public void saveUnload(final KDimension dimension, final Callback<Throwable> callback) {
        save(dimension, new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                if (throwable == null) {
                    discard(dimension, callback);
                } else {
                    callback.on(throwable);
                }
            }
        });
    }

    @Override
    public void timeTree(KDimension dimension, long key, final Callback<TimeTree> callback) {
        long[] keys = new long[1];
        keys[0] = key;
        timeTrees(dimension, keys, new Callback<TimeTree[]>() {
            @Override
            public void on(TimeTree[] timeTrees) {
                if (timeTrees.length == 1) {
                    callback.on(timeTrees[0]);
                } else {
                    callback.on(null);
                }
            }
        });
    }

    @Override
    public void timeTrees(final KDimension dimension, final long[] keys, final Callback<TimeTree[]> callback) {
        final List<Integer> toLoad = new ArrayList<Integer>();
        final DimensionCache dimensionCache = caches.get(dimension.key());
        final TimeTree[] result = new TimeTree[keys.length];
        for (int i = 0; i < keys.length; i++) {
            TimeTree cachedTree = dimensionCache.timeTreeCache.get(keys[i]);
            if (cachedTree != null) {
                result[i] = cachedTree;
            } else {
                toLoad.add(i);
            }
        }
        if (toLoad.isEmpty()) {
            callback.on(result);
        } else {
            String[] toLoadKeys = new String[toLoad.size()];
            for (int i = 0; i < toLoad.size(); i++) {
                toLoadKeys[i] = keyTree(dimension, keys[toLoad.get(i)]);
            }
            _db.get(toLoadKeys, new ThrowableCallback<String[]>() {
                @Override
                public void on(String[] res, Throwable error) { //TODO process error
                    if (error != null) {
                        error.printStackTrace();
                    }
                    for (int i = 0; i < res.length; i++) {
                        DefaultTimeTree newTree = new DefaultTimeTree();
                        try {
                            if (res[i] != null) {
                                newTree.load(res[i]);
                            } else {
                                newTree.insert(dimension.key());
                            }
                            dimensionCache.timeTreeCache.put(keys[toLoad.get(i)], newTree);
                            result[toLoad.get(i)] = newTree;
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                    callback.on(result);
                }
            });
        }
    }

    //TODO protect for //call

    @Override
    public void lookup(final KView originView, final long key, final Callback<KObject> callback) {
        if (callback == null) {
            return;
        }
        timeTree(originView.dimension(), key, new Callback<TimeTree>() {
            @Override
            public void on(TimeTree timeTree) {
                final Long resolvedTime = timeTree.resolve(originView.now());
                if (resolvedTime == null) {
                    callback.on(null);
                } else {
                    KObject resolved = cacheLookup(originView.dimension(), resolvedTime, key);
                    //maybe not enought because of some strategies
                    //TODO check if back elements are enought :-)
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
                        loadObjectInCache(originView, keys, new Callback<List<KObject>>() {
                            @Override
                            public void on(List<KObject> dbResolved) {
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
                            }
                        });
                    }
                }
            }
        });
    }

    //TODO optimize
    private void loadObjectInCache(final KView originView, final long[] keys, final Callback<List<KObject>> callback) {
        timeTrees(originView.dimension(), keys, new Callback<TimeTree[]>() {
            @Override
            public void on(TimeTree[] timeTrees) {
                String[] objStringKeys = new String[keys.length];
                final long[] resolved = new long[keys.length];
                for (int i = 0; i < keys.length; i++) {
                    long resolvedTime = timeTrees[i].resolve(originView.now());
                    resolved[i] = resolvedTime;
                    objStringKeys[i] = keyPayload(originView.dimension(), resolvedTime, keys[i]);
                }
                _db.get(objStringKeys, new ThrowableCallback<String[]>() {
                    @Override
                    public void on(final String[] objectPayloads, Throwable error) {
                        if (error != null) {
                            callback.on(null);
                        } else {
                            final List<Object[]> additionalLoad = new ArrayList<Object[]>();
                            final List<KObject> objs = new ArrayList<KObject>();
                            for (int i = 0; i < objectPayloads.length; i++) {
                                KObject obj = JsonModelLoader.loadDirect(objectPayloads[i], originView.dimension().time(resolved[i]), null);
                                //Put in cache
                                objs.add(obj);
                                //additional from strategy
                                Set<Extrapolation> strategies = new HashSet<Extrapolation>();
                                for (int h = 0; h < obj.metaAttributes().length; h++) {
                                    MetaAttribute metaAttribute = obj.metaAttributes()[h];
                                    strategies.add(metaAttribute.strategy());
                                }
                                Extrapolation[] strategiesArr = strategies.toArray(new Extrapolation[strategies.size()]);
                                for (int k = 0; k < strategiesArr.length; k++) {
                                    Extrapolation strategy = strategiesArr[k];
                                    Long[] additionalTimes = strategy.timedDependencies(obj);
                                    for (int j = 0; j < additionalTimes.length; j++) {
                                        if (additionalTimes[j] != obj.now()) {
                                            //check if the object is already in cache
                                            if (cacheLookup(originView.dimension(), additionalTimes[j], obj.uuid()) == null) {
                                                Object[] payload = new Object[]{keyPayload(originView.dimension(), additionalTimes[j], obj.uuid()), additionalTimes[j]};
                                                additionalLoad.add(payload);
                                            }
                                        }
                                    }
                                }
                            }
                            if (additionalLoad.isEmpty()) {
                                callback.on(objs);
                            } else {
                                String[] addtionalDBKeys = new String[additionalLoad.size()];
                                for (int i = 0; i < additionalLoad.size(); i++) {
                                    addtionalDBKeys[i] = additionalLoad.get(i)[0].toString();
                                }
                                _db.get(addtionalDBKeys, new ThrowableCallback<String[]>() {
                                    @Override
                                    public void on(String[] additionalPayloads, Throwable error) {
                                        for (int i = 0; i < objectPayloads.length; i++) {
                                            JsonModelLoader.loadDirect(additionalPayloads[i], originView.dimension().time((Long) additionalLoad.get(i)[1]), null);
                                        }
                                        callback.on(objs); //we still return the first layer of objects
                                    }
                                });
                            }
                        }
                    }
                });
            }
        });
    }

    @Override
    public void lookupAll(final KView originView, Long[] keys, final Callback<KObject[]> callback) {
        List<Long> toLoad = new ArrayList<Long>();
        for (int i = 0; i < keys.length; i++) {
            toLoad.add(keys[i]);
        }
        final List<KObject> resolveds = new ArrayList<KObject>();
        for (int i = 0; i < keys.length; i++) {
            Long kid = keys[i];
            KObject resolved = cacheLookup(originView.dimension(), originView.now(), kid);
            if (resolved != null) {
                resolveds.add(resolved);
                toLoad.remove(kid);
            }
        }
        if (toLoad.size() == 0) {
            List<KObject> proxies = new ArrayList<KObject>();
            KObject[] resolvedsArr = resolveds.toArray(new KObject[resolveds.size()]);
            for (int i = 0; i < resolvedsArr.length; i++) {
                KObject res = resolvedsArr[i];
                if (res.now() != originView.now()) {
                    KObject proxy = originView.createProxy(res.metaClass(), res.timeTree(), res.uuid());
                    proxies.add(proxy);
                } else {
                    proxies.add(res);
                }
            }
            callback.on(proxies.toArray(new KObject[proxies.size()]));
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
                    KObject[] resolvedsArr = resolveds.toArray(new KObject[resolveds.size()]);
                    for (int i = 0; i < resolvedsArr.length; i++) {
                        KObject res = resolvedsArr[i];
                        if (res.now() != originView.now()) {
                            KObject proxy = originView.createProxy(res.metaClass(), res.timeTree(), res.uuid());
                            proxies.add(proxy);
                        } else {
                            proxies.add(res);
                        }
                    }
                    callback.on(proxies.toArray(new KObject[proxies.size()]));
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

    public void getRoot(final KView originView, final Callback<KObject> callback) {
        DimensionCache dimensionCache = caches.get(originView.dimension().key());
        Long resolvedRoot = dimensionCache.rootTimeTree.resolve(originView.now());
        if (resolvedRoot == null) {
            callback.on(null);
        } else {
            TimeCache timeCache = dimensionCache.timesCaches.get(resolvedRoot);
            if (timeCache == null) {
                timeCache = new TimeCache();
            }
            if (timeCache.root != null) {
                callback.on(timeCache.root);
            } else {
                final TimeCache timeCacheFinal = timeCache;
                String[] rootKeys = new String[1];
                rootKeys[0] = keyRoot(dimensionCache.dimension, resolvedRoot);
                _db.get(rootKeys, new ThrowableCallback<String[]>() {
                    @Override
                    public void on(String[] res, Throwable error) {
                        if (error != null) {
                            callback.on(null);
                        } else {
                            try {
                                Long idRoot = Long.parseLong(res[0]);
                                lookup(originView, idRoot, new Callback<KObject>() {
                                    @Override
                                    public void on(KObject resolved) {
                                        timeCacheFinal.root = resolved;
                                        timeCacheFinal.rootDirty = false;
                                        callback.on(resolved);
                                    }
                                });
                            } catch (Exception e) {
                                e.printStackTrace();
                                callback.on(null);
                            }
                        }
                    }
                });
            }
        }
    }

    public synchronized void setRoot(KObject newRoot) {
        DimensionCache dimensionCache = caches.get(newRoot.dimension().key());
        TimeCache timeCache = dimensionCache.timesCaches.get(newRoot.now());
        timeCache.root = newRoot;
        timeCache.rootDirty = true;
        dimensionCache.rootTimeTree.insert(newRoot.now());
    }

    @Override
    public void registerListener(Object origin, ModelListener listener) {
        _eventBroker.registerListener(origin, listener);
    }


    public void notify(KEvent event) {
        _eventBroker.notify(event);
    }

    @Override
    public KEventBroker eventBroker() {
        return _eventBroker;
    }

    @Override
    public void setEventBroker(KEventBroker p_eventBroker) {
        this._eventBroker = p_eventBroker;
    }

    @Override
    public KDataBase dataBase() {
        return this._db;
    }

    @Override
    public void setDataBase(KDataBase p_dataBase) {
        this._db = p_dataBase;
        initRange(UUID_DB_KEY);
        initRange(DIM_DB_KEY);
    }
}
