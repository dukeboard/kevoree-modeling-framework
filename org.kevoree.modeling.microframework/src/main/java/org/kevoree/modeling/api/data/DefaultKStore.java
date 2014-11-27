package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.data.cache.DimensionCache;
import org.kevoree.modeling.api.data.cache.TimeCache;
import org.kevoree.modeling.api.event.DefaultKBroker;
import org.kevoree.modeling.api.event.KEventBroker;
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

    public DefaultKStore() {
        this._db = new MemoryKDataBase();
        this._eventBroker = new DefaultKBroker();
        initRange(UUID_DB_KEY);
        initRange(DIM_DB_KEY);
    }

    private String keyTree(long dim, long key) {
        return "" + dim + KEY_SEP + key;
    }

    private String keyRoot(long dim, long time) {
        return "" + dim + KEY_SEP + time + KEY_SEP + "root";
    }

    private String keyRootTree(KDimension dim) {
        return "" + dim.key() + KEY_SEP + "root";
    }

    private String keyPayload(long dim, long time, long key) {
        return "" + dim + KEY_SEP + time + KEY_SEP + key;
    }

    //TODO refactor this...
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

    public void initDimension(KDimension dimension, final Callback<Throwable> callback) {
        final DimensionCache dimensionCache = new DimensionCache();
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
        write_tree(obj.dimension().key(), obj.uuid(), obj.timeTree());
        CacheEntry cacheEntry = new CacheEntry();
        cacheEntry.raw = new Object[Index.RESERVED_INDEXES + obj.metaAttributes().length + obj.metaReferences().length];
        cacheEntry.raw[Index.IS_DIRTY_INDEX] = true;
        cacheEntry.metaClass = obj.metaClass();
        cacheEntry.timeTree = obj.timeTree();
        write_cache(obj.dimension().key(), obj.now(), obj.uuid(), cacheEntry);
    }

    //TODO
    @Override
    public Object[] raw(KObject origin, AccessMode accessMode) {
        //TODO manage multi dimension, and protect for potential null
        long resolvedTime = origin.timeTree().resolve(origin.now());
        boolean needCopy = accessMode.equals(AccessMode.WRITE) && resolvedTime != origin.now();
        DimensionCache dimensionCache = caches.get(origin.dimension().key());
        if (dimensionCache == null) {
            return null;
        }
        TimeCache timeCache = dimensionCache.timesCaches.get(resolvedTime);
        if (timeCache == null) {
            return null;
        }
        CacheEntry entry = timeCache.payload_cache.get(origin.uuid());
        if (entry == null) {
            return null;
        }
        Object[] payload = entry.raw;
        if (!needCopy) {
            if (accessMode.equals(AccessMode.WRITE)) {
                payload[Index.IS_DIRTY_INDEX] = true;
            }
            return payload;
        } else {
            //deep copy the structure
            Object[] cloned = new Object[payload.length];
            cloned[Index.IS_DIRTY_INDEX] = true;
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
            CacheEntry clonedEntry = new CacheEntry();
            clonedEntry.raw = cloned;
            clonedEntry.metaClass = entry.metaClass;
            clonedEntry.timeTree = entry.timeTree;
            write_cache(origin.dimension().key(), origin.now(), origin.uuid(), clonedEntry);
            return clonedEntry.raw;
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
            Long[] times = dimensionCache.timesCaches.keySet().toArray(new Long[dimensionCache.timesCaches.keySet().size()]);
            int sizeCache = size_dirties(dimensionCache);
            String[][] payloads = new String[sizeCache][2];
            int i = 0;
            for (int j = 0; j < times.length; j++) {
                Long now = times[j];
                TimeCache timeCache = dimensionCache.timesCaches.get(now);
                Long[] keys = timeCache.payload_cache.keySet().toArray(new Long[timeCache.payload_cache.keySet().size()]);
                for (int k = 0; k < keys.length; k++) {
                    Long idObj = keys[k];
                    CacheEntry cached_entry = timeCache.payload_cache.get(idObj);
                    Object[] cached_raw = cached_entry.raw;
                    if (cached_raw[Index.IS_DIRTY_INDEX] instanceof Boolean && (Boolean) cached_raw[Index.IS_DIRTY_INDEX]) {
                        String[] payloadA = new String[2];
                        payloadA[0] = keyPayload(dimension.key(), now, idObj);
                        payloadA[1] = JsonRaw.encode(cached_raw, idObj,cached_entry.metaClass);
                        payloads[i] = payloadA;
                        cached_raw[Index.IS_DIRTY_INDEX] = true;
                        i++;
                    }
                }
                if (timeCache.rootDirty) {
                    String[] payloadB = new String[2];
                    payloadB[0] = keyRoot(dimension.key(), timeCache.root.now());
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
                    payloadC[0] = keyTree(dimension.key(), timeTreeKey);
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

    //TODO protect for //call

    @Override
    public void lookup(final KView originView, final Long key, final Callback<KObject> callback) {
        Long[] keys = new Long[1];
        keys[0] = key;
        lookupAll(originView, keys, new Callback<KObject[]>() {
            @Override
            public void on(KObject[] kObjects) {
                if (kObjects.length == 1) {
                    if (callback != null) {
                        callback.on(kObjects[0]);
                    }
                } else {
                    if (callback != null) {
                        callback.on(null);
                    }
                }
            }
        });
    }

    @Override
    public void lookupAll(final KView originView, Long[] keys, final Callback<KObject[]> callback) {
        internal_resolve_dim_time(originView, keys, new Callback<Object[][]>() {
            @Override
            public void on(Object[][] objects) {
                KObject[] resolved = new KObject[keys.length];
                List<Integer> toLoadIndexes = new ArrayList<Integer>();
                for (int i = 0; i < objects.length; i++) {
                    CacheEntry entry = read_cache((Long) objects[i][INDEX_RESOLVED_DIM], (Long) objects[i][INDEX_RESOLVED_DIM], keys[i]);
                    if (entry == null) {
                        toLoadIndexes.add(i);
                    } else {
                        resolved[i] = originView.createProxy(entry.metaClass, entry.timeTree, keys[i]);
                    }
                }
                if (toLoadIndexes.isEmpty()) {
                    callback.on(resolved);
                } else {
                    String[] toLoadKeys = new String[toLoadIndexes.size()];
                    for (int i = 0; i < toLoadIndexes.size(); i++) {
                        int toLoadIndex = toLoadIndexes.get(i);
                        toLoadKeys[i] = keyPayload((Long) objects[i][INDEX_RESOLVED_DIM], (Long) objects[i][INDEX_RESOLVED_DIM], keys[i]);
                    }
                    _db.get(toLoadKeys, new ThrowableCallback<String[]>() {
                        @Override
                        public void on(String[] strings, Throwable error) {
                            if (error != null) {
                                error.printStackTrace();
                                callback.on(null);
                            } else {
                                for (int i = 0; i < strings.length; i++) {
                                    if(strings[i] != null){
                                        int index = toLoadIndexes.get(i);
                                        //Create the raw CacheEntry
                                        CacheEntry entry = JsonRaw.decode(strings[i], originView, (Long) objects[index][INDEX_RESOLVED_TIME]);
                                        entry.timeTree = (TimeTree) objects[index][INDEX_RESOLVED_TIMETREE];
                                        //Create and Add the proxy
                                        resolved[i] = originView.createProxy(entry.metaClass, entry.timeTree, keys[index]);
                                        //Save the cache value
                                        write_cache((Long) objects[i][INDEX_RESOLVED_DIM], (Long) objects[i][INDEX_RESOLVED_DIM], keys[index], entry);
                                    }
                                }
                                callback.on(resolved);
                            }
                        }
                    });
                }
            }
        });
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
                rootKeys[0] = keyRoot(originView.dimension().key(), resolvedRoot);
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

    public void setRoot(KObject newRoot) {
        DimensionCache dimensionCache = caches.get(newRoot.dimension().key());
        TimeCache timeCache = dimensionCache.timesCaches.get(newRoot.now());
        timeCache.root = newRoot;
        timeCache.rootDirty = true;
        dimensionCache.rootTimeTree.insert(newRoot.now());
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

    /* Private not synchronized methods */

    private CacheEntry read_cache(long dimensionKey, long timeKey, long uuid) {
        DimensionCache dimensionCache = caches.get(dimensionKey);
        if (dimensionCache != null) {
            TimeCache timeCache = dimensionCache.timesCaches.get(timeKey);
            if (timeCache == null) {
                return null;
            } else {
                return timeCache.payload_cache.get(uuid);
            }
        } else {
            return null;
        }
    }

    private void write_cache(long dimensionKey, long timeKey, long uuid, CacheEntry cacheEntry) {
        DimensionCache dimensionCache = caches.get(dimensionKey);
        if (dimensionCache == null) {
            dimensionCache = new DimensionCache();
            caches.put(dimensionKey, dimensionCache);
        }
        TimeCache timeCache = dimensionCache.timesCaches.get(timeKey);
        if (timeCache == null) {
            timeCache = new TimeCache();
            dimensionCache.timesCaches.put(timeKey, timeCache);
        }
        timeCache.payload_cache.put(uuid, cacheEntry);
    }

    private void write_tree(long dimensionKey, long uuid, TimeTree timeTree) {
        DimensionCache dimensionCache = caches.get(dimensionKey);
        if (dimensionCache == null) {
            dimensionCache = new DimensionCache();
            caches.put(dimensionKey, dimensionCache);
        }
        dimensionCache.timeTreeCache.put(uuid, timeTree);
    }

    private int size_dirties(DimensionCache dimensionCache) {
        TimeCache[] timeCaches = dimensionCache.timesCaches.values().toArray(new TimeCache[dimensionCache.timesCaches.size()]);
        int sizeCache = 0;
        for (int i = 0; i < timeCaches.length; i++) {
            TimeCache timeCache = timeCaches[i];
            Long[] keys = timeCache.payload_cache.keySet().toArray(new Long[timeCache.payload_cache.keySet().size()]);
            for (int k = 0; k < keys.length; k++) {
                Long idObj = keys[k];
                CacheEntry cachedEntry = timeCache.payload_cache.get(idObj);
                if (cachedEntry != null && cachedEntry.raw[Index.IS_DIRTY_INDEX] instanceof Boolean && (Boolean) cachedEntry.raw[Index.IS_DIRTY_INDEX]) {
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

    private static final int INDEX_RESOLVED_DIM = 0;

    private static final int INDEX_RESOLVED_TIME = 1;

    private static final int INDEX_RESOLVED_TIMETREE = 2;

    private void internal_resolve_dim_time(KView originView, Long[] uuids, Callback<Object[][]> callback) {
        Object[][] result = new Object[uuids.length][2];
        resolve_timeTrees(originView.dimension(), uuids, new Callback<TimeTree[]>() {
            @Override
            public void on(TimeTree[] timeTrees) {
                for (int i = 0; i < timeTrees.length; i++) {
                    Object[] resolved = new Object[3];
                    resolved[INDEX_RESOLVED_DIM] = originView.dimension().key(); //TODO better ...
                    resolved[INDEX_RESOLVED_TIME] = timeTrees[i].resolve(originView.now());
                    resolved[INDEX_RESOLVED_TIMETREE] = timeTrees[i];
                    result[i] = resolved;
                }
                callback.on(result);
            }
        });
    }

    private void resolve_timeTrees(final KDimension dimension, final Long[] keys, final Callback<TimeTree[]> callback) {
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
                toLoadKeys[i] = keyTree(dimension.key(), keys[toLoad.get(i)]);
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
                            //Write in cache the Resolved TimeTree
                            write_tree(dimension.key(), keys[toLoad.get(i)], newTree);
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

}
