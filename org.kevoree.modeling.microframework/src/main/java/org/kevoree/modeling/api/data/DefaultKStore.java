package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.data.cache.DimensionCache;
import org.kevoree.modeling.api.data.cache.TimeCache;
import org.kevoree.modeling.api.event.DefaultKBroker;
import org.kevoree.modeling.api.event.KEventBroker;
import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.api.time.DefaultTimeTree;
import org.kevoree.modeling.api.time.rbtree.LongRBTree;
import org.kevoree.modeling.api.time.rbtree.LongTreeNode;
import org.kevoree.modeling.api.util.DefaultOperationManager;
import org.kevoree.modeling.api.util.KOperationManager;

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

    private KDataBase _db;
    private Map<Long, DimensionCache> caches = new HashMap<Long, DimensionCache>();
    private KEventBroker _eventBroker;
    private KOperationManager _operationManager;

    private KeyCalculator _objectKeyCalculator = null;
    private KeyCalculator _dimensionKeyCalculator = null;

    private static final String OUT_OF_CACHE_MESSAGE = "KMF Error: your object is out of cache, you probably kept an old reference. Please reload it with a lookup";

    public DefaultKStore() {
        this._db = new MemoryKDataBase();
        this._eventBroker = new DefaultKBroker();
        this._operationManager = new DefaultOperationManager(this);
    }

    private boolean isConnected = false;

    @Override
    public void connect(Callback<Throwable> callback) {
        if (isConnected) {
            if (callback != null) {
                callback.on(null);
            }
            return;
        }
        if (_db == null || _eventBroker == null) {
            if (callback != null) {
                callback.on(new Exception("Please attach a KDataBase AND a KBroker first !"));
            }
        } else {
            _eventBroker.connect(new Callback<Throwable>() {
                @Override
                public void on(Throwable throwable) {
                    if (throwable == null) {
                        _db.connect(new Callback<Throwable>() {
                            @Override
                            public void on(Throwable throwable) {
                                if (throwable == null) {
                                    String[] keys = new String[1];
                                    keys[0] = keyLastPrefix();
                                    _db.get(keys, new ThrowableCallback<String[]>() {
                                        @Override
                                        public void on(String[] strings, Throwable error) {
                                            if (error != null) {
                                                if (callback != null) {
                                                    callback.on(error);
                                                }
                                            } else {
                                                if (strings.length == 1) {
                                                    try {
                                                        String payloadPrefix = strings[0];
                                                        if (payloadPrefix == null || payloadPrefix.equals("")) {
                                                            payloadPrefix = "0";
                                                        }
                                                        final Short newPrefix = Short.parseShort(payloadPrefix);
                                                        String[] keys2 = new String[2];
                                                        keys2[0] = keyLastDimIndex(payloadPrefix);
                                                        keys2[1] = keyLastObjIndex(payloadPrefix);
                                                        _db.get(keys2, new ThrowableCallback<String[]>() {
                                                            @Override
                                                            public void on(String[] strings, Throwable error) {
                                                                if (error != null) {
                                                                    if (callback != null) {
                                                                        callback.on(error);
                                                                    }
                                                                } else {
                                                                    if (strings.length == 2) {
                                                                        try {
                                                                            String dimIndexPayload = strings[0];
                                                                            if (dimIndexPayload == null || dimIndexPayload.equals("")) {
                                                                                dimIndexPayload = "0";
                                                                            }
                                                                            String objIndexPayload = strings[1];
                                                                            if (objIndexPayload == null || objIndexPayload.equals("")) {
                                                                                objIndexPayload = "0";
                                                                            }
                                                                            Long newDimIndex = Long.parseLong(dimIndexPayload);
                                                                            Long newObjIndex = Long.parseLong(objIndexPayload);
                                                                            String[][] keys3 = new String[1][2];
                                                                            String[] payloadKeys3 = new String[2];
                                                                            payloadKeys3[0] = keyLastPrefix();
                                                                            if (newPrefix == Short.MAX_VALUE) {
                                                                                payloadKeys3[1] = "" + Short.MIN_VALUE;
                                                                            } else {
                                                                                payloadKeys3[1] = "" + (newPrefix + 1);
                                                                            }
                                                                            keys3[0] = payloadKeys3;
                                                                            _db.put(keys3, new Callback<Throwable>() {
                                                                                @Override
                                                                                public void on(Throwable throwable) {
                                                                                    _dimensionKeyCalculator = new KeyCalculator(newPrefix, newDimIndex);
                                                                                    _objectKeyCalculator = new KeyCalculator(newPrefix, newObjIndex);
                                                                                    isConnected = true;
                                                                                    if (callback != null) {
                                                                                        callback.on(null);
                                                                                    }
                                                                                }
                                                                            });
                                                                        } catch (Exception e) {
                                                                            if (callback != null) {
                                                                                callback.on(e);
                                                                            }
                                                                        }
                                                                    } else {
                                                                        if (callback != null) {
                                                                            callback.on(new Exception("Error while connecting the KDataStore..."));
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        });

                                                    } catch (Exception e) {
                                                        if (callback != null) {
                                                            callback.on(e);
                                                        }
                                                    }
                                                } else {
                                                    if (callback != null) {
                                                        callback.on(new Exception("Error while connecting the KDataStore..."));
                                                    }
                                                }
                                            }
                                        }
                                    });
                                } else {
                                    callback.on(throwable);
                                }
                            }
                        });
                    } else {
                        callback.on(throwable);
                    }
                }
            });
        }
    }

    @Override
    public void close(Callback<Throwable> callback) {
        isConnected = false;
        if (_db != null) {
            _db.close(new Callback<Throwable>() {
                @Override
                public void on(Throwable throwable) {
                    if (_eventBroker != null) {
                        _eventBroker.close(callback);
                    } else {
                        callback.on(null);
                    }
                }
            });
        }
    }

    private String keyTree(long dim, long key) {
        return "" + dim + KEY_SEP + key;
    }

    private String keyRoot(long dim) {
        return "" + dim + KEY_SEP + "root";
    }

    private String keyRootTree(KDimension dim) {
        return "" + dim.key() + KEY_SEP + "root";
    }

    private String keyPayload(long dim, long time, long key) {
        return "" + dim + KEY_SEP + time + KEY_SEP + key;
    }

    private String keyLastPrefix() {
        return "ring_prefix";
    }

    private String keyLastDimIndex(String prefix) {
        return "index_dim_" + prefix;
    }

    private String keyLastObjIndex(String prefix) {
        return "index_obj_" + prefix;
    }

    @Override
    public long nextDimensionKey() {
        if (_dimensionKeyCalculator == null) {
            throw new RuntimeException(UNIVERSE_NOT_CONNECTED_ERROR);
        }
        return _dimensionKeyCalculator.nextKey();
    }

    private static final String UNIVERSE_NOT_CONNECTED_ERROR = "Please connect your universe prior to create a dimension or an object";

    @Override
    public long nextObjectKey() {
        if (_objectKeyCalculator == null) {
            throw new RuntimeException(UNIVERSE_NOT_CONNECTED_ERROR);
        }
        return _objectKeyCalculator.nextKey();
    }

    @Override
    public void initDimension(KDimension dimension) {
        //TODO maybe initiate link to previous dimension
    }

    public void initKObject(KObject obj, KView originView) {
        write_tree(obj.dimension().key(), obj.uuid(), obj.timeTree());
        CacheEntry cacheEntry = new CacheEntry();
        cacheEntry.raw = new Object[Index.RESERVED_INDEXES + obj.metaClass().metaAttributes().length + obj.metaClass().metaReferences().length];
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
        boolean needCopy = accessMode.equals(AccessMode.WRITE) && (resolvedTime != origin.now());
        DimensionCache dimensionCache = caches.get(origin.dimension().key());
        if (dimensionCache == null) {
            throw new RuntimeException(OUT_OF_CACHE_MESSAGE);
        }
        TimeCache timeCache = dimensionCache.timesCaches.get(resolvedTime);
        if (timeCache == null) {
            throw new RuntimeException(OUT_OF_CACHE_MESSAGE);
        }
        CacheEntry entry = timeCache.payload_cache.get(origin.uuid());
        if (entry == null) {
            throw new RuntimeException(OUT_OF_CACHE_MESSAGE);
        }
        Object[] payload = entry.raw;
        if (accessMode.equals(AccessMode.DELETE)) {
            entry.timeTree.delete(origin.now());
            entry.raw = null;
            return payload;
        }
        if (!needCopy) {
            if (accessMode.equals(AccessMode.WRITE)) {
                payload[Index.IS_DIRTY_INDEX] = true;
            }
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
            cloned[Index.IS_DIRTY_INDEX] = true;
            CacheEntry clonedEntry = new CacheEntry();
            clonedEntry.raw = cloned;
            clonedEntry.metaClass = entry.metaClass;
            clonedEntry.timeTree = entry.timeTree;
            entry.timeTree.insert(origin.now());
            //TODO update structure for multi dimension
            write_cache(origin.dimension().key(), origin.now(), origin.uuid(), clonedEntry);
            return clonedEntry.raw;
        }
    }


    @Override
    public void discard(KDimension dimension, Callback<Throwable> callback) {
        caches.remove(dimension.key());
        if (callback != null) {
            callback.on(null);
        }
    }

    @Override
    public void delete(KDimension dimension, Callback<Throwable> callback) {
        throw new RuntimeException("Not implemented yet !");
    }


    //TODO synchronize index and so on at the same time

    @Override
    public void save(KDimension dimension, Callback<Throwable> callback) {
        DimensionCache dimensionCache = caches.get(dimension.key());
        if (dimensionCache == null) {
            callback.on(null);
        } else {
            Long[] times = dimensionCache.timesCaches.keySet().toArray(new Long[dimensionCache.timesCaches.keySet().size()]);
            int sizeCache = size_dirties(dimensionCache) + 2;
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
                    if (cached_raw[Index.IS_DIRTY_INDEX] != null && cached_raw[Index.IS_DIRTY_INDEX].toString().equals("true")) {
                        String[] payloadA = new String[2];
                        payloadA[0] = keyPayload(dimension.key(), now, idObj);
                        payloadA[1] = JsonRaw.encode(cached_raw, idObj, cached_entry.metaClass);
                        payloads[i] = payloadA;
                        cached_raw[Index.IS_DIRTY_INDEX] = false;
                        i++;
                    }
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
            if (dimensionCache.roots != null && dimensionCache.roots.dirty) {
                String[] payloadD = new String[2];
                payloadD[0] = keyRootTree(dimension);
                payloadD[1] = dimensionCache.roots.serialize();
                payloads[i] = payloadD;
                dimensionCache.roots.dirty = false;
                i++;
            }
            String[] payloadDim = new String[2];
            payloadDim[0] = keyLastDimIndex("" + _dimensionKeyCalculator.prefix());
            payloadDim[1] = "" + _dimensionKeyCalculator.lastComputedIndex();
            payloads[i] = payloadDim;
            i++;
            String[] payloadObj = new String[2];
            payloadObj[0] = keyLastDimIndex("" + _objectKeyCalculator.prefix());
            payloadObj[1] = "" + _objectKeyCalculator.lastComputedIndex();
            payloads[i] = payloadObj;
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
                    if (objects[i][INDEX_RESOLVED_TIME] != null) {
                        CacheEntry entry = read_cache((Long) objects[i][INDEX_RESOLVED_DIM], (Long) objects[i][INDEX_RESOLVED_TIME], keys[i]);
                        if (entry == null) {
                            toLoadIndexes.add(i);
                        } else {
                            resolved[i] = ((AbstractKView) originView).createProxy(entry.metaClass, entry.timeTree, keys[i]);
                        }
                    }
                }
                if (toLoadIndexes.isEmpty()) {
                    callback.on(resolved);
                } else {
                    String[] toLoadKeys = new String[toLoadIndexes.size()];
                    for (int i = 0; i < toLoadIndexes.size(); i++) {
                        int toLoadIndex = toLoadIndexes.get(i);
                        toLoadKeys[i] = keyPayload((Long) objects[toLoadIndex][INDEX_RESOLVED_DIM], (Long) objects[toLoadIndex][INDEX_RESOLVED_TIME], keys[i]);
                    }
                    _db.get(toLoadKeys, new ThrowableCallback<String[]>() {
                        @Override
                        public void on(String[] strings, Throwable error) {
                            if (error != null) {
                                error.printStackTrace();
                                callback.on(null);
                            } else {
                                for (int i = 0; i < strings.length; i++) {
                                    if (strings[i] != null) {
                                        int index = toLoadIndexes.get(i);
                                        //Create the raw CacheEntry
                                        CacheEntry entry = JsonRaw.decode(strings[i], originView, (Long) objects[index][INDEX_RESOLVED_TIME]);
                                        if (entry != null) {
                                            entry.timeTree = (TimeTree) objects[index][INDEX_RESOLVED_TIMETREE];
                                            //Create and Add the proxy
                                            resolved[i] = ((AbstractKView) originView).createProxy(entry.metaClass, entry.timeTree, keys[index]);
                                            //Save the cache value
                                            write_cache((Long) objects[i][INDEX_RESOLVED_DIM], (Long) objects[i][INDEX_RESOLVED_TIME], keys[index], entry);
                                        }
                                    } else {
                                        System.err.println("Not resolvable UUID " + toLoadIndexes.get(i));
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
        resolve_roots(originView.dimension(), new Callback<LongRBTree>() {
            @Override
            public void on(LongRBTree longRBTree) {
                if (longRBTree == null) {
                    callback.on(null);
                } else {
                    LongTreeNode resolved = longRBTree.previousOrEqual(originView.now());
                    if (resolved == null) {
                        callback.on(null);
                    } else {
                        lookup(originView, resolved.value, callback);
                    }
                }
            }
        });
    }

    @Override
    public void setRoot(KObject newRoot, Callback<Throwable> callback) {
        resolve_roots(newRoot.dimension(), new Callback<LongRBTree>() {
            @Override
            public void on(LongRBTree longRBTree) {
                longRBTree.insert(newRoot.now(), newRoot.uuid());
                ((AbstractKObject) newRoot).setRoot(true);
                if (callback != null) {
                    callback.on(null);
                }
            }
        });
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
    }

    public KOperationManager operationManager() {
        return _operationManager;
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

    private synchronized void write_cache(long dimensionKey, long timeKey, long uuid, CacheEntry cacheEntry) {
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

    private synchronized void write_tree(long dimensionKey, long uuid, TimeTree timeTree) {
        DimensionCache dimensionCache = caches.get(dimensionKey);
        if (dimensionCache == null) {
            dimensionCache = new DimensionCache();
            caches.put(dimensionKey, dimensionCache);
        }
        dimensionCache.timeTreeCache.put(uuid, timeTree);
    }

    private synchronized void write_roots(long dimensionKey, LongRBTree timeTree) {
        DimensionCache dimensionCache = caches.get(dimensionKey);
        if (dimensionCache == null) {
            dimensionCache = new DimensionCache();
            caches.put(dimensionKey, dimensionCache);
        }
        dimensionCache.roots = timeTree;
    }

    private int size_dirties(DimensionCache dimensionCache) {
        Long[] times = dimensionCache.timesCaches.keySet().toArray(new Long[dimensionCache.timesCaches.size()]);
        int sizeCache = 0;
        for (int i = 0; i < times.length; i++) {
            TimeCache timeCache = dimensionCache.timesCaches.get(times[i]);
            if (timeCache != null) {
                Long[] keys = timeCache.payload_cache.keySet().toArray(new Long[timeCache.payload_cache.keySet().size()]);
                for (int k = 0; k < keys.length; k++) {
                    Long idObj = keys[k];
                    CacheEntry cachedEntry = timeCache.payload_cache.get(idObj);
                    if (cachedEntry != null && cachedEntry.raw[Index.IS_DIRTY_INDEX] != null && cachedEntry.raw[Index.IS_DIRTY_INDEX].toString().equals("true")) {
                        sizeCache++;
                    }
                }
                if (timeCache.rootDirty) {
                    sizeCache++;
                }
            }
        }
        Long[] ids = dimensionCache.timeTreeCache.keySet().toArray(new Long[dimensionCache.timeTreeCache.size()]);
        for (int k = 0; k < ids.length; k++) {
            TimeTree timeTree = dimensionCache.timeTreeCache.get(ids[k]);
            if (timeTree != null && timeTree.isDirty()) {
                sizeCache++;
            }
        }
        if (dimensionCache.roots != null && dimensionCache.roots.dirty) {
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
        final TimeTree[] result = new TimeTree[keys.length];
        for (int i = 0; i < keys.length; i++) {
            final DimensionCache dimensionCache = caches.get(dimension.key());
            if (dimensionCache == null) {
                toLoad.add(i);
            } else {
                TimeTree cachedTree = dimensionCache.timeTreeCache.get(keys[i]);
                if (cachedTree != null) {
                    result[i] = cachedTree;
                } else {
                    toLoad.add(i);
                }
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

    private void resolve_roots(final KDimension dimension, final Callback<LongRBTree> callback) {
        DimensionCache dimensionCache = caches.get(dimension.key());
        if (dimensionCache != null && dimensionCache.roots != null) {
            //If value is already in cache, return it
            callback.on(dimensionCache.roots);
        } else {
            //otherwise, load it from DB
            String[] keys = new String[1];
            keys[0] = keyRoot(dimension.key());
            _db.get(keys, new ThrowableCallback<String[]>() {
                @Override
                public void on(String[] res, Throwable error) { //TODO process error
                    LongRBTree tree = new LongRBTree();
                    if (error != null) {
                        error.printStackTrace();
                    } else {
                        if (res != null && res.length == 1 && res[0] != null && !res[0].equals("")) {
                            try {
                                tree.unserialize(res[0]);
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                        }
                    }
                    write_roots(dimension.key(), tree);
                    callback.on(tree);
                }
            });
        }
    }

}
