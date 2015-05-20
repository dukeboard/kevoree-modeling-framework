package org.kevoree.modeling.api.data.manager;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.KModel;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KScheduler;
import org.kevoree.modeling.api.KUniverse;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.data.cache.*;
import org.kevoree.modeling.api.data.cdn.AtomicOperationFactory;
import org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;
import org.kevoree.modeling.api.data.cdn.KContentPutRequest;
import org.kevoree.modeling.api.data.cdn.MemoryKContentDeliveryDriver;
import org.kevoree.modeling.api.map.LongLongHashMap;
import org.kevoree.modeling.api.map.LongLongHashMapCallBack;
import org.kevoree.modeling.api.msg.KEvents;
import org.kevoree.modeling.api.scheduler.DirectScheduler;
import org.kevoree.modeling.api.rbtree.IndexRBTree;
import org.kevoree.modeling.api.rbtree.LongRBTree;
import org.kevoree.modeling.api.rbtree.LongTreeNode;
import org.kevoree.modeling.api.rbtree.TreeNode;
import org.kevoree.modeling.api.util.DefaultOperationManager;
import org.kevoree.modeling.api.util.KOperationManager;

import java.util.ArrayList;
import java.util.List;

public class DefaultKDataManager implements KDataManager {

    private static final String OUT_OF_CACHE_MESSAGE = "KMF Error: your object is out of cache, you probably kept an old reference. Please reload it with a lookup";
    private static final String UNIVERSE_NOT_CONNECTED_ERROR = "Please connect your model prior to create a universe or an object";

    private KContentDeliveryDriver _db;
    private KOperationManager _operationManager;
    private KScheduler _scheduler;
    private KModel _model;
    private KeyCalculator _objectKeyCalculator = null;
    private KeyCalculator _universeKeyCalculator = null;
    private KeyCalculator _modelKeyCalculator;
    private KeyCalculator _groupKeyCalculator;
    private boolean isConnected = false;
    private final int UNIVERSE_INDEX = 0;
    private final int OBJ_INDEX = 1;
    private final int GLO_TREE_INDEX = 2;
    private KCache _cache;
    private static final short zeroPrefix = 0;

    public DefaultKDataManager(KModel model) {
        _cache = new HashMemoryCache();
        _modelKeyCalculator = new KeyCalculator(zeroPrefix, 0);
        _groupKeyCalculator = new KeyCalculator(zeroPrefix, 0);
        this._db = new MemoryKContentDeliveryDriver();
        this._db.setManager(this);
        this._operationManager = new DefaultOperationManager(this);
        this._scheduler = new DirectScheduler();
        this._model = model;
    }

    @Override
    public KCache cache() {
        return _cache;
    }

    @Override
    public KModel model() {
        return _model;
    }

    @Override
    public void close(Callback<Throwable> callback) {
        isConnected = false;
        if (_db != null) {
            _db.close(callback);
        } else {
            callback.on(null);
        }
    }

    /* Key Management Section */
    @Override
    public synchronized long nextUniverseKey() {
        if (_universeKeyCalculator == null) {
            throw new RuntimeException(UNIVERSE_NOT_CONNECTED_ERROR);
        }
        long nextGeneratedKey = _universeKeyCalculator.nextKey();
        if (nextGeneratedKey == KConfig.NULL_LONG || nextGeneratedKey == KConfig.END_OF_TIME) {
            nextGeneratedKey = _universeKeyCalculator.nextKey();
        }
        return nextGeneratedKey;
    }

    @Override
    public synchronized long nextObjectKey() {
        if (_objectKeyCalculator == null) {
            throw new RuntimeException(UNIVERSE_NOT_CONNECTED_ERROR);
        }
        long nextGeneratedKey = _objectKeyCalculator.nextKey();
        if (nextGeneratedKey == KConfig.NULL_LONG || nextGeneratedKey == KConfig.END_OF_TIME) {
            nextGeneratedKey = _objectKeyCalculator.nextKey();
        }
        return nextGeneratedKey;
    }

    @Override
    public synchronized long nextModelKey() {
        return _modelKeyCalculator.nextKey();
    }

    @Override
    public synchronized long nextGroupKey() {
        return _groupKeyCalculator.nextKey();
    }

    /* End Key Management Section */
    public LongLongHashMap globalUniverseOrder() {
        return (LongLongHashMap) _cache.get(KConfig.NULL_LONG, KConfig.NULL_LONG, KConfig.NULL_LONG);
    }

    @Override
    public void initUniverse(KUniverse p_universe, KUniverse p_parent) {
        LongLongHashMap cached = globalUniverseOrder();
        if (cached != null && cached.get(p_universe.key()) == KConfig.NULL_LONG) {
            if (p_parent == null) {
                cached.put(p_universe.key(), p_universe.key());
            } else {
                cached.put(p_universe.key(), p_parent.key());
            }
        }
    }

    @Override
    public long parentUniverseKey(long currentUniverseKey) {
        LongLongHashMap cached = globalUniverseOrder();
        if (cached != null) {
            return cached.get(currentUniverseKey);
        } else {
            return KConfig.NULL_LONG;
        }
    }

    @Override
    public long[] descendantsUniverseKeys(final long currentUniverseKey) {
        LongLongHashMap cached = globalUniverseOrder();
        if (cached != null) {
            final LongLongHashMap temp = new LongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
            cached.each(new LongLongHashMapCallBack() {
                @Override
                public void on(long key, long value) {
                    if (value == currentUniverseKey && key != currentUniverseKey) {
                        temp.put(key, value);
                    }
                }
            });
            final long[] result = new long[temp.size()];
            final int[] insertIndex = {0};
            temp.each(new LongLongHashMapCallBack() {
                @Override
                public void on(long key, long value) {
                    result[insertIndex[0]] = key;
                    insertIndex[0]++;
                }
            });
            return result;
        } else {
            return new long[0];
        }
    }

    @Override
    public synchronized void save(final Callback<Throwable> callback) {
        KCacheDirty[] dirtiesEntries = _cache.dirties();
        KContentPutRequest request = new KContentPutRequest(dirtiesEntries.length + 2);
        final KEvents notificationMessages = new KEvents(dirtiesEntries.length);
        for (int i = 0; i < dirtiesEntries.length; i++) {
            KCacheObject cachedObject = dirtiesEntries[i].object;
            int[] meta;
            if (dirtiesEntries[i].object instanceof KCacheEntry) {
                meta = ((KCacheEntry) dirtiesEntries[i].object).modifiedIndexes();
            } else {
                meta = null;
            }
            notificationMessages.setEvent(i, dirtiesEntries[i].key, meta);
            request.put(dirtiesEntries[i].key, cachedObject.serialize());
            cachedObject.setClean();
        }
        request.put(KContentKey.createLastObjectIndexFromPrefix(_objectKeyCalculator.prefix()), "" + _objectKeyCalculator.lastComputedIndex());
        request.put(KContentKey.createLastUniverseIndexFromPrefix(_universeKeyCalculator.prefix()), "" + _universeKeyCalculator.lastComputedIndex());
        _db.put(request, new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                if (throwable == null) {
                    _db.send(notificationMessages);
                }
                if (callback != null) {
                    callback.on(throwable);
                }
            }
        });
    }

    @Override
    public void initKObject(KObject obj) {
        KCacheEntry cacheEntry = new KCacheEntry();
        cacheEntry.initRaw(obj.metaClass().metaElements().length);
        cacheEntry._dirty = true;
        cacheEntry.metaClass = obj.metaClass();
        cacheEntry.inc();
        //initiate time management
        IndexRBTree timeTree = new IndexRBTree();
        timeTree.inc();
        timeTree.insert(obj.now());
        //initiate universe management
        LongLongHashMap universeTree = new LongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
        universeTree.inc();
        universeTree.put(obj.universe(), obj.now());
        //save related objects to cache
        _cache.put(obj.universe(), KConfig.NULL_LONG, obj.uuid(), timeTree);
        _cache.put(KConfig.NULL_LONG, KConfig.NULL_LONG, obj.uuid(), universeTree);
        _cache.put(obj.universe(), obj.now(), obj.uuid(), cacheEntry);
    }

    @Override
    public void connect(final Callback<Throwable> connectCallback) {
        if (isConnected) {
            if (connectCallback != null) {
                connectCallback.on(null);
            }
        }
        if (_db == null) {
            if (connectCallback != null) {
                connectCallback.on(new Exception("Please attach a KDataBase AND a KBroker first !"));
            }
        } else {
            _db.connect(new Callback<Throwable>() {
                @Override
                public void on(Throwable throwable) {
                    if (throwable == null) {
                        _db.atomicGetMutate(KContentKey.createLastPrefix(), AtomicOperationFactory.getMutatePrefixOperation(),
                                new ThrowableCallback<String>() {
                                    @Override
                                    public void on(String payloadPrefix, Throwable error) {
                                        if (error != null) {
                                            if (connectCallback != null) {
                                                connectCallback.on(error);
                                            }
                                        } else {
                                            String cleanedPrefixPayload = payloadPrefix;
                                            if (cleanedPrefixPayload == null || cleanedPrefixPayload.equals("")) {
                                                cleanedPrefixPayload = "0";
                                            }
                                            Short newPrefix;
                                            try {
                                                newPrefix = Short.parseShort(cleanedPrefixPayload);
                                            } catch (Exception e) {
                                                newPrefix = Short.parseShort("0");
                                            }
                                            KContentKey[] connectionElemKeys = new KContentKey[3];
                                            connectionElemKeys[UNIVERSE_INDEX] = KContentKey.createLastUniverseIndexFromPrefix(newPrefix);
                                            connectionElemKeys[OBJ_INDEX] = KContentKey.createLastObjectIndexFromPrefix(newPrefix);
                                            connectionElemKeys[GLO_TREE_INDEX] = KContentKey.createGlobalUniverseTree();
                                            final Short finalNewPrefix = newPrefix;
                                            _db.get(connectionElemKeys, new ThrowableCallback<String[]>() {
                                                @Override
                                                public void on(String[] strings, Throwable errorL2) {
                                                    if (errorL2 != null) {
                                                        if (connectCallback != null) {
                                                            connectCallback.on(errorL2);
                                                        }
                                                    } else {
                                                        if (strings.length == 3) {
                                                            Exception detected = null;
                                                            try {
                                                                String uniIndexPayload = strings[UNIVERSE_INDEX];
                                                                if (uniIndexPayload == null || uniIndexPayload.equals("")) {
                                                                    uniIndexPayload = "0";
                                                                }
                                                                String objIndexPayload = strings[OBJ_INDEX];
                                                                if (objIndexPayload == null || objIndexPayload.equals("")) {
                                                                    objIndexPayload = "0";
                                                                }
                                                                String globalUniverseTreePayload = strings[GLO_TREE_INDEX];
                                                                LongLongHashMap globalUniverseTree;
                                                                if (globalUniverseTreePayload != null) {
                                                                    globalUniverseTree = new LongLongHashMap(0, KConfig.CACHE_LOAD_FACTOR);
                                                                    try {
                                                                        globalUniverseTree.unserialize(KContentKey.createGlobalUniverseTree(), globalUniverseTreePayload, model().metaModel());
                                                                    } catch (Exception e) {
                                                                        e.printStackTrace();
                                                                    }
                                                                } else {
                                                                    globalUniverseTree = new LongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
                                                                }
                                                                _cache.put(KConfig.NULL_LONG, KConfig.NULL_LONG, KConfig.NULL_LONG, globalUniverseTree);
                                                                long newUniIndex = Long.parseLong(uniIndexPayload);
                                                                long newObjIndex = Long.parseLong(objIndexPayload);
                                                                _universeKeyCalculator = new KeyCalculator(finalNewPrefix, newUniIndex);
                                                                _objectKeyCalculator = new KeyCalculator(finalNewPrefix, newObjIndex);
                                                                isConnected = true;
                                                            } catch (Exception e) {
                                                                detected = e;
                                                            }
                                                            if (connectCallback != null) {
                                                                connectCallback.on(detected);
                                                            }
                                                        } else {
                                                            if (connectCallback != null) {
                                                                connectCallback.on(new Exception("Error while connecting the KDataStore..."));
                                                            }
                                                        }
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                    } else {
                        if (connectCallback != null) {
                            connectCallback.on(throwable);
                        }
                    }
                }
            });
        }
    }

    @Override
    public KCacheEntry entry(KObject origin, AccessMode accessMode) {
        KCacheEntry currentEntry = (KCacheEntry) _cache.get(origin.universe(), origin.now(), origin.uuid());
        if (currentEntry != null) {
            return currentEntry;
        }
        LongLongHashMap objectUniverseTree = (LongLongHashMap) _cache.get(KConfig.NULL_LONG, KConfig.NULL_LONG, origin.uuid());
        long resolvedUniverse = ResolutionHelper.resolve_universe(globalUniverseOrder(), objectUniverseTree, origin.now(), origin.universe());
        IndexRBTree timeTree = (IndexRBTree) _cache.get(resolvedUniverse, KConfig.NULL_LONG, origin.uuid());
        if (timeTree == null) {
            throw new RuntimeException(OUT_OF_CACHE_MESSAGE + " : TimeTree not found for " + KContentKey.createTimeTree(resolvedUniverse, origin.uuid()) + " from " + origin.universe() + "/" + resolvedUniverse);
        }
        TreeNode resolvedNode = timeTree.previousOrEqual(origin.now());
        if (resolvedNode != null) {
            long resolvedTime = resolvedNode.getKey();
            boolean needTimeCopy = accessMode.equals(AccessMode.WRITE) && (resolvedTime != origin.now());
            boolean needUniverseCopy = accessMode.equals(AccessMode.WRITE) && (resolvedUniverse != origin.universe());
            KCacheEntry entry = (KCacheEntry) _cache.get(resolvedUniverse, resolvedTime, origin.uuid());
            if (entry == null) {
                return null;
            }
            if (accessMode.equals(AccessMode.DELETE)) {
                timeTree.delete(origin.now());
                return entry;
            }
            if (!needTimeCopy && !needUniverseCopy) {
                if (accessMode.equals(AccessMode.WRITE)) {
                    entry._dirty = true;
                }
                return entry;
            } else {
                KCacheEntry clonedEntry = entry.clone();
                _cache.put(origin.universe(), origin.now(), origin.uuid(), clonedEntry);
                if (!needUniverseCopy) {
                    timeTree.insert(origin.now());
                } else {
                    IndexRBTree newTemporalTree = new IndexRBTree();
                    newTemporalTree.insert(origin.now());
                    _cache.put(origin.universe(), KConfig.NULL_LONG, origin.uuid(), newTemporalTree);
                    objectUniverseTree.put(origin.universe(), origin.now());//insert this time as a divergence point for this object
                }
                entry.dec();
                return clonedEntry;
            }
        } else {
            System.err.println(OUT_OF_CACHE_MESSAGE + " Time not resolved " + origin.now());
            return null;
        }
    }

    @Override
    public void discard(KUniverse p_universe, final Callback<Throwable> callback) {
        //save prefix to not negociate again prefix
        _cache.clear();
        KContentKey[] globalUniverseTree = new KContentKey[1];
        globalUniverseTree[0] = KContentKey.createGlobalUniverseTree();
        reload(globalUniverseTree, new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                callback.on(throwable);
            }
        });
    }

    @Override
    public void delete(KUniverse p_universe, Callback<Throwable> callback) {
        throw new RuntimeException("Not implemented yet !");
    }

    @Override
    public void lookup(long universe, long time, long uuid, Callback<KObject> callback) {
        long[] keys = new long[1];
        keys[0] = uuid;
        lookupAllobjects(universe, time, keys, new Callback<KObject[]>() {
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
    public void lookupAllobjects(long universe, long time, long[] uuids, final Callback<KObject[]> callback) {
        this._scheduler.dispatch(new LookupAllRunnable(universe, time, uuids, callback, this));
    }

    @Override
    public void lookupAlltimes(long universe, long[] time, long uuid, Callback<KObject[]> callback) {
        throw new RuntimeException("Not Implemented Yet !");
        //this._scheduler.dispatch(new LookupAllRunnable(universe,time, uuids, callback, this));
    }

    @Override
    public KContentDeliveryDriver cdn() {
        return this._db;
    }

    @Override
    public void setContentDeliveryDriver(KContentDeliveryDriver p_dataBase) {
        this._db = p_dataBase;
        p_dataBase.setManager(this);
    }

    @Override
    public void setScheduler(KScheduler p_scheduler) {
        if (p_scheduler != null) {
            this._scheduler = p_scheduler;
        }
    }

    public KOperationManager operationManager() {
        return _operationManager;
    }

    /* Special case management for Root */
    public void getRoot(long universe, long time, final Callback<KObject> callback) {
        bumpKeyToCache(KContentKey.createRootUniverseTree(), new Callback<KCacheObject>() {
            @Override
            public void on(KCacheObject rootGlobalUniverseIndex) {
                if (rootGlobalUniverseIndex == null) {
                    callback.on(null);
                } else {
                    long closestUniverse = ResolutionHelper.resolve_universe(globalUniverseOrder(), (LongLongHashMap) rootGlobalUniverseIndex, time, universe);
                    KContentKey universeTreeRootKey = KContentKey.createRootTimeTree(closestUniverse);
                    bumpKeyToCache(universeTreeRootKey, new Callback<KCacheObject>() {
                        @Override
                        public void on(KCacheObject universeTree) {
                            if (universeTree == null) {
                                callback.on(null);
                            } else {
                                LongTreeNode resolvedNode = ((LongRBTree) universeTree).previousOrEqual(time);
                                if (resolvedNode == null) {
                                    callback.on(null);
                                } else {
                                    lookup(universe, time, resolvedNode.value, callback);
                                }
                            }
                        }
                    });
                }
            }
        });
    }

    @Override
    public void setRoot(final KObject newRoot, final Callback<Throwable> callback) {
        bumpKeyToCache(KContentKey.createRootUniverseTree(), new Callback<KCacheObject>() {
            @Override
            public void on(KCacheObject globalRootTree) {
                LongLongHashMap cleanedTree = (LongLongHashMap) globalRootTree;
                if (cleanedTree == null) {
                    cleanedTree = new LongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
                    _cache.put(KConfig.NULL_LONG, KConfig.NULL_LONG, KConfig.END_OF_TIME, cleanedTree);
                }
                long closestUniverse = ResolutionHelper.resolve_universe(globalUniverseOrder(), cleanedTree, newRoot.now(), newRoot.universe());
                cleanedTree.put(newRoot.universe(), newRoot.now());
                if (closestUniverse != newRoot.universe()) {
                    LongRBTree newTimeTree = new LongRBTree();
                    newTimeTree.insert(newRoot.now(), newRoot.uuid());
                    KContentKey universeTreeRootKey = KContentKey.createRootTimeTree(newRoot.universe());
                    _cache.put(universeTreeRootKey.universe, universeTreeRootKey.time, universeTreeRootKey.obj, newTimeTree);
                    if (callback != null) {
                        callback.on(null);
                    }
                } else {
                    final KContentKey universeTreeRootKey = KContentKey.createRootTimeTree(closestUniverse);
                    bumpKeyToCache(universeTreeRootKey, new Callback<KCacheObject>() {
                        @Override
                        public void on(KCacheObject resolvedRootTimeTree) {
                            LongRBTree initializedTree = (LongRBTree) resolvedRootTimeTree;
                            if (initializedTree == null) {
                                initializedTree = new LongRBTree();
                                _cache.put(universeTreeRootKey.universe, universeTreeRootKey.time, universeTreeRootKey.obj, initializedTree);
                            }
                            initializedTree.insert(newRoot.now(), newRoot.uuid());
                            if (callback != null) {
                                callback.on(null);
                            }
                        }
                    });
                }
            }
        });
    }
    /* End of root section */

    @Override
    public void reload(KContentKey[] keys, final Callback<Throwable> callback) {
        List<KContentKey> toReload = new ArrayList<KContentKey>();
        for (int i = 0; i < keys.length; i++) {
            KCacheObject cached = _cache.get(keys[i].universe, keys[i].time, keys[i].obj);
            if (cached != null && !cached.isDirty()) {
                toReload.add(keys[i]);
            }
        }
        final KContentKey[] toReload_flat = toReload.toArray(new KContentKey[toReload.size()]);
        _db.get(toReload_flat, new ThrowableCallback<String[]>() {
            @Override
            public void on(String[] strings, Throwable error) {
                if (error != null) {
                    error.printStackTrace();
                    if (callback != null) {
                        callback.on(null);
                    }
                } else {
                    for (int i = 0; i < strings.length; i++) {
                        if (strings[i] != null) {
                            KContentKey correspondingKey = toReload_flat[i];
                            KCacheObject cachedObj = _cache.get(correspondingKey.universe, correspondingKey.time, correspondingKey.obj);
                            if (cachedObj != null && !cachedObj.isDirty()) {
                                cachedObj = internal_unserialize(correspondingKey, strings[i]);
                                if (cachedObj != null) {
                                    //replace the cache value
                                    _cache.put(correspondingKey.universe, correspondingKey.time, correspondingKey.obj, cachedObj);
                                }
                            }
                        }
                    }
                    if (callback != null) {
                        callback.on(null);
                    }
                }
            }
        });
    }

    public void bumpKeyToCache(final KContentKey contentKey, final Callback<KCacheObject> callback) {
        KCacheObject cached = _cache.get(contentKey.universe, contentKey.time, contentKey.obj);
        if (cached != null) {
            callback.on(cached);
        } else {
            KContentKey[] keys = new KContentKey[1];
            keys[0] = contentKey;
            _db.get(keys, new ThrowableCallback<String[]>() {
                @Override
                public void on(String[] strings, Throwable error) {
                    if (strings[0] != null) {
                        KCacheObject newObject = internal_unserialize(contentKey, strings[0]);
                        if (newObject != null) {
                            _cache.put(contentKey.universe, contentKey.time, contentKey.obj, newObject);
                        }
                        callback.on(newObject);
                    } else {
                        callback.on(null);
                    }
                }
            });
        }
    }

    public void bumpKeysToCache(KContentKey[] contentKeys, final Callback<KCacheObject[]> callback) {
        boolean[] toLoadIndexes = null;
        int nbElem = 0;
        final KCacheObject[] result = new KCacheObject[contentKeys.length];
        for (int i = 0; i < contentKeys.length; i++) {
            if (contentKeys[i] != null) {
                result[i] = _cache.get(contentKeys[i].universe, contentKeys[i].time, contentKeys[i].obj);
                if (result[i] == null) {
                    if (toLoadIndexes == null) {
                        toLoadIndexes = new boolean[contentKeys.length];
                    }
                    toLoadIndexes[i] = true;
                    nbElem++;
                }
            }
        }
        if (toLoadIndexes == null) {
            callback.on(result);
        } else {
            final KContentKey[] toLoadDbKeys = new KContentKey[nbElem];
            final int[] originIndexes = new int[nbElem];
            int toLoadIndex = 0;
            for (int i = 0; i < contentKeys.length; i++) {
                if (toLoadIndexes[i]) {
                    toLoadDbKeys[toLoadIndex] = contentKeys[i];
                    originIndexes[toLoadIndex] = i;
                    toLoadIndex++;
                }
            }
            _db.get(toLoadDbKeys, new ThrowableCallback<String[]>() {
                @Override
                public void on(String[] payloads, Throwable error) {
                    for (int i = 0; i < payloads.length; i++) {
                        if (payloads[i] != null) {
                            KContentKey newObjKey = toLoadDbKeys[i];
                            KCacheObject newObject = internal_unserialize(newObjKey, payloads[i]);
                            if (newObject != null) {
                                _cache.put(newObjKey.universe, newObjKey.time, newObjKey.obj, newObject);
                                int originIndex = originIndexes[i];
                                result[originIndex] = newObject;
                            }
                        }
                    }
                    callback.on(result);
                }
            });
        }
    }

    /* This method unserialize objects according to KContentKey specification */
    private KCacheObject internal_unserialize(KContentKey key, String payload) {
        KCacheObject result;
        boolean isUniverseNotNull = key.universe != KConfig.NULL_LONG;
        if (KConfig.END_OF_TIME == key.obj) {
            if (isUniverseNotNull) {
                result = new LongRBTree();
            } else {
                result = new LongLongHashMap(0, KConfig.CACHE_LOAD_FACTOR);
            }
        } else {
            boolean isTimeNotNull = key.time != KConfig.NULL_LONG;
            boolean isObjNotNull = key.obj != KConfig.NULL_LONG;
            if (isUniverseNotNull && isTimeNotNull && isObjNotNull) {
                result = new KCacheEntry();
            } else if (isUniverseNotNull && !isTimeNotNull && isObjNotNull) {
                result = new IndexRBTree();
            } else {
                result = new LongLongHashMap(0, KConfig.CACHE_LOAD_FACTOR);
            }
        }
        try {
            result.unserialize(key, payload, model().metaModel());
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
