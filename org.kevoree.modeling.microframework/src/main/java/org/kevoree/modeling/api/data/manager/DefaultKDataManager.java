package org.kevoree.modeling.api.data.manager;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.data.cache.KCache;
import org.kevoree.modeling.api.data.cache.KCacheDirty;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.cache.KCacheObject;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.cache.MultiLayeredMemoryCache;
import org.kevoree.modeling.api.data.cdn.AtomicOperationFactory;
import org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;
import org.kevoree.modeling.api.data.cdn.KContentPutRequest;
import org.kevoree.modeling.api.data.cdn.MemoryKContentDeliveryDriver;
import org.kevoree.modeling.api.map.LongLongHashMap;
import org.kevoree.modeling.api.map.LongLongHashMapCallBack;
import org.kevoree.modeling.api.msg.KEventMessage;
import org.kevoree.modeling.api.scheduler.DirectScheduler;
import org.kevoree.modeling.api.rbtree.IndexRBTree;
import org.kevoree.modeling.api.rbtree.LongRBTree;
import org.kevoree.modeling.api.rbtree.LongTreeNode;
import org.kevoree.modeling.api.rbtree.TreeNode;
import org.kevoree.modeling.api.util.DefaultOperationManager;
import org.kevoree.modeling.api.util.KOperationManager;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by duke on 10/17/14.
 */
public class DefaultKDataManager implements KDataManager {

    private KContentDeliveryDriver _db;
    private KOperationManager _operationManager;
    private KScheduler _scheduler;
    private KModel _model;
    private KeyCalculator _objectKeyCalculator = null;
    private KeyCalculator _universeKeyCalculator = null;
    private boolean isConnected = false;

    private static final String OUT_OF_CACHE_MESSAGE = "KMF Error: your object is out of cache, you probably kept an old reference. Please reload it with a lookup";
    private static final String UNIVERSE_NOT_CONNECTED_ERROR = "Please connect your model prior to create a universe or an object";
    //private static final String DELETED_MESSAGE = "KMF Error: your object has been deleted. Please do not use object pointer after a call to delete method";

    private final int UNIVERSE_INDEX = 0;
    private final int OBJ_INDEX = 1;
    private final int GLO_TREE_INDEX = 2;

    public DefaultKDataManager(KModel model) {
        this._db = new MemoryKContentDeliveryDriver();
        this._db.setManager(this);
        this._operationManager = new DefaultOperationManager(this);
        this._scheduler = new DirectScheduler();
        this._model = model;
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

    @Override
    public synchronized long nextUniverseKey() {
        if (_universeKeyCalculator == null) {
            throw new RuntimeException(UNIVERSE_NOT_CONNECTED_ERROR);
        }
        long nextGeneratedKey = _universeKeyCalculator.nextKey();
        if (nextGeneratedKey == KConfig.NULL_LONG) {
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
        if (nextGeneratedKey == KConfig.NULL_LONG) {
            nextGeneratedKey = _objectKeyCalculator.nextKey();
        }
        return nextGeneratedKey;
    }

    //TODO activate a caching system
    private LongLongHashMap globalUniverseOrder() {
        KContentKey key = KContentKey.createGlobalUniverseTree();
        return (LongLongHashMap) _cache.get(key);
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
    public Long parentUniverseKey(Long currentUniverseKey) {
        LongLongHashMap cached = globalUniverseOrder();
        if (cached != null) {
            long lookupResult = cached.get(currentUniverseKey);
            if (lookupResult != KConfig.NULL_LONG) {
                return lookupResult;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    @Override
    public Long[] descendantsUniverseKeys(Long currentUniverseKey) {
        LongLongHashMap cached = globalUniverseOrder();
        if (cached != null) {
            List<Long> nextElems = new ArrayList<Long>();
            cached.each(new LongLongHashMapCallBack() {
                @Override
                public void on(long key, long value) {
                    if (value == currentUniverseKey && key != currentUniverseKey) {
                        nextElems.add(key);
                    }
                }
            });
            return nextElems.toArray(new Long[nextElems.size()]);
        } else {
            return new Long[0];
        }
    }

    @Override
    public synchronized void save(final Callback<Throwable> callback) {
        KCacheDirty[] dirtiesEntries = _cache.dirties();
        KContentPutRequest request = new KContentPutRequest(dirtiesEntries.length + 2);
        final KEventMessage[] notificationMessages = new KEventMessage[dirtiesEntries.length];
        for (int i = 0; i < dirtiesEntries.length; i++) {
            KCacheObject cachedObject = dirtiesEntries[i].object;
            KEventMessage newMessage = new KEventMessage();
            if (dirtiesEntries[i].object instanceof KCacheEntry) {
                newMessage.meta = ((KCacheEntry) dirtiesEntries[i].object).modifiedIndexes();
            } else {
                newMessage.meta = null;
            }
            newMessage.key = dirtiesEntries[i].key;
            notificationMessages[i] = newMessage;
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
    public void initKObject(KObject obj, KView originView) {
        KCacheEntry cacheEntry = new KCacheEntry();
        cacheEntry.initRaw(Index.RESERVED_INDEXES + obj.metaClass().metaElements().length);
        cacheEntry._dirty = true;
        cacheEntry.metaClass = obj.metaClass();
        IndexRBTree timeTree = new IndexRBTree();
        timeTree.insert(obj.now());
        LongLongHashMap universeTree = new LongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
        universeTree.put(obj.view().universe().key(), obj.now());
        _cache.put(KContentKey.createTimeTree(obj.universe().key(), obj.uuid()), timeTree);
        _cache.put(KContentKey.createUniverseTree(obj.uuid()), universeTree);
        _cache.put(KContentKey.createObject(obj.universe().key(), obj.now(), obj.uuid()), cacheEntry);
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
                                                                _cache.put(KContentKey.createGlobalUniverseTree(), globalUniverseTree);
                                                                Long newUniIndex = Long.parseLong(uniIndexPayload);
                                                                Long newObjIndex = Long.parseLong(objIndexPayload);
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
        LongLongHashMap objectUniverseTree = (LongLongHashMap) _cache.get(KContentKey.createUniverseTree(origin.uuid()));
        Long resolvedUniverse = ResolutionHelper.resolve_universe(globalUniverseOrder(), objectUniverseTree, origin.now(), origin.view().universe().key());
        IndexRBTree timeTree = (IndexRBTree) _cache.get(KContentKey.createTimeTree(resolvedUniverse, origin.uuid()));
        if (timeTree == null) {
            throw new RuntimeException(OUT_OF_CACHE_MESSAGE + " : TimeTree not found for " + KContentKey.createTimeTree(resolvedUniverse, origin.uuid()) + " from " + origin.universe().key() + "/" + resolvedUniverse);
        }
        TreeNode resolvedNode = timeTree.previousOrEqual(origin.now());
        if (resolvedNode != null) {
            long resolvedTime = resolvedNode.getKey();
            boolean needTimeCopy = accessMode.equals(AccessMode.WRITE) && (resolvedTime != origin.now());
            boolean needUniverseCopy = accessMode.equals(AccessMode.WRITE) && (resolvedUniverse != origin.universe().key());
            KCacheEntry entry = (KCacheEntry) _cache.get(KContentKey.createObject(resolvedUniverse, resolvedTime, origin.uuid()));
            if (entry == null) {
                System.err.println(OUT_OF_CACHE_MESSAGE);
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
                if (!needUniverseCopy) {
                    timeTree.insert(origin.now());
                } else {
                    IndexRBTree newTemporalTree = new IndexRBTree();
                    newTemporalTree.insert(origin.now());
                    _cache.put(KContentKey.createTimeTree(origin.universe().key(), origin.uuid()), newTemporalTree);
                    objectUniverseTree.put(origin.universe().key(), origin.now());//insert this time as a divergence point for this object
                }
                _cache.put(KContentKey.createObject(origin.universe().key(), origin.now(), origin.uuid()), clonedEntry);
                return clonedEntry;
            }
        } else {
            System.err.println(OUT_OF_CACHE_MESSAGE + " Time not resolved " + origin.now());
            return null;
        }
    }

    @Override
    public void discard(KUniverse p_universe, Callback<Throwable> callback) {
        _cache.clearDataSegment();
        KContentKey[] globalUniverseTree = new KContentKey[1];
        globalUniverseTree[0] = KContentKey.createGlobalUniverseTree();
        reload(globalUniverseTree, callback);
    }

    @Override
    public void delete(KUniverse p_universe, Callback<Throwable> callback) {
        throw new RuntimeException("Not implemented yet !");
    }

    @Override
    public void lookup(final KView originView, final long key, final Callback<KObject> callback) {
        long[] keys = new long[1];
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
    public void lookupAll(final KView originView, long[] keys, final Callback<KObject[]> callback) {
        this._scheduler.dispatch(new LookupAllRunnable(originView, keys, callback, this));
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

    void internal_resolve_universe_time(final KView originView, final long[] uuids, final Callback<ResolutionResult[]> callback) {
        final ResolutionResult[] tempResult = new ResolutionResult[uuids.length];
        //step 0: try to hit the cache layer for dimensions
        List<Integer> toLoadIndexUniverse = null;
        List<KContentKey> toLoadUniverseTrees = null;
        for (int i = 0; i < uuids.length; i++) {
            if (tempResult[i] == null) {
                tempResult[i] = new ResolutionResult();
            }
            KContentKey universeObjectTreeKey = KContentKey.createUniverseTree(uuids[i]);
            LongLongHashMap cachedUniverseTree = (LongLongHashMap) _cache.get(universeObjectTreeKey);
            if (cachedUniverseTree != null) {
                tempResult[i].universeTree = cachedUniverseTree;
            } else {
                if (toLoadIndexUniverse == null) {
                    toLoadIndexUniverse = new ArrayList<Integer>();
                }
                if (toLoadUniverseTrees == null) {
                    toLoadUniverseTrees = new ArrayList<KContentKey>();
                }
                toLoadIndexUniverse.add(i);
                toLoadUniverseTrees.add(universeObjectTreeKey);
            }
        }
        //step 1: try to hit the CDN layer for dimensions
        if (toLoadUniverseTrees != null) {
            KContentKey[] toLoadKeys = toLoadUniverseTrees.toArray(new KContentKey[toLoadUniverseTrees.size()]);
            final List<Integer> finalToLoadIndexUniverse = toLoadIndexUniverse;
            final List<KContentKey> finalToLoadUniverseTrees = toLoadUniverseTrees;
            _db.get(toLoadKeys, new ThrowableCallback<String[]>() {
                @Override
                public void on(String[] resolvedContents, Throwable error) {
                    if (error != null) {
                        error.printStackTrace();
                        callback.on(tempResult);
                    } else {
                        for (int i = 0; i < resolvedContents.length; i++) {
                            LongLongHashMap newLoadedTree;
                            if (resolvedContents[i] != null) {
                                newLoadedTree = new LongLongHashMap(0, KConfig.CACHE_LOAD_FACTOR);
                                try {
                                    newLoadedTree.unserialize(finalToLoadUniverseTrees.get(i), resolvedContents[i], model().metaModel());
                                } catch (Exception e) {
                                    e.printStackTrace();
                                }
                            } else {
                                newLoadedTree = new LongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
                            }
                            tempResult[finalToLoadIndexUniverse.get(i)].universeTree = newLoadedTree;
                            _cache.put(finalToLoadUniverseTrees.get(i), newLoadedTree);
                        }
                        internal_resolve_times(originView, uuids, tempResult, callback);
                    }
                }
            });
        } else {
            internal_resolve_times(originView, uuids, tempResult, callback);
        }
    }

    private void internal_resolve_times(final KView originView, long[] uuids, final ResolutionResult[] tempResult, final Callback<ResolutionResult[]> callback) {
        //step 1.0: try to hit the cache layer for times
        List<Integer> toLoadIndexTimes = null;
        List<KContentKey> toLoadTimeTrees = null;
        for (int i = 0; i < uuids.length; i++) {
            if (tempResult[i].universeTree != null) {
                long closestUniverse = ResolutionHelper.resolve_universe(globalUniverseOrder(), tempResult[i].universeTree, originView.now(), originView.universe().key());
                tempResult[i].resolvedUniverse = closestUniverse;
                KContentKey timeObjectTreeKey = KContentKey.createTimeTree(closestUniverse, uuids[i]);
                IndexRBTree cachedIndexTree = (IndexRBTree) _cache.get(timeObjectTreeKey);
                if (cachedIndexTree != null) {
                    tempResult[i].timeTree = cachedIndexTree;
                    TreeNode resolvedNode = cachedIndexTree.previousOrEqual(originView.now());
                    if (resolvedNode != null) {
                        tempResult[i].resolvedQuanta = resolvedNode.getKey();
                    }
                } else {
                    if (toLoadIndexTimes == null) {
                        toLoadIndexTimes = new ArrayList<Integer>();
                    }
                    if (toLoadTimeTrees == null) {
                        toLoadTimeTrees = new ArrayList<KContentKey>();
                    }
                    toLoadIndexTimes.add(i);
                    toLoadTimeTrees.add(timeObjectTreeKey);
                }

            }
        }
        //step 1.1: try to hit the CDN layer for times
        if (toLoadTimeTrees != null) {
            KContentKey[] toLoadKeys = toLoadTimeTrees.toArray(new KContentKey[toLoadTimeTrees.size()]);
            final List<Integer> finalToLoadIndexTimes = toLoadIndexTimes;
            final List<KContentKey> finalToLoadTimeTrees = toLoadTimeTrees;
            _db.get(toLoadKeys, new ThrowableCallback<String[]>() {
                @Override
                public void on(String[] resolvedContents, Throwable error) {
                    if (error != null) {
                        error.printStackTrace();
                        callback.on(tempResult);
                    } else {
                        for (int i = 0; i < resolvedContents.length; i++) {
                            IndexRBTree newLoadedTree = new IndexRBTree();
                            if (resolvedContents[i] != null) {
                                try {
                                    newLoadedTree.unserialize(finalToLoadTimeTrees.get(i), resolvedContents[i], model().metaModel());
                                } catch (Exception e) {
                                    e.printStackTrace();
                                }
                            }
                            int initialIndex = finalToLoadIndexTimes.get(i);
                            tempResult[initialIndex].timeTree = newLoadedTree;
                            TreeNode resolvedNode = newLoadedTree.previousOrEqual(originView.now());
                            if (resolvedNode != null) {
                                tempResult[initialIndex].resolvedQuanta = resolvedNode.getKey();
                            }
                            _cache.put(finalToLoadTimeTrees.get(i), newLoadedTree);
                        }
                        callback.on(tempResult);
                    }
                }
            });
        } else {
            callback.on(tempResult);
        }

    }

    public void getRoot(final KView originView, final Callback<KObject> callback) {
        bumpKeyToCache(KContentKey.createRootUniverseTree(), new Callback<KCacheObject>() {
            @Override
            public void on(KCacheObject rootGlobalUniverseIndex) {
                if (rootGlobalUniverseIndex == null) {
                    callback.on(null);
                } else {
                    long closestUniverse = ResolutionHelper.resolve_universe(globalUniverseOrder(), (LongLongHashMap) rootGlobalUniverseIndex, originView.now(), originView.universe().key());
                    KContentKey universeTreeRootKey = KContentKey.createRootTimeTree(closestUniverse);
                    bumpKeyToCache(universeTreeRootKey, new Callback<KCacheObject>() {
                        @Override
                        public void on(KCacheObject universeTree) {
                            if (universeTree == null) {
                                callback.on(null);
                            } else {
                                LongTreeNode resolvedNode = ((LongRBTree) universeTree).previousOrEqual(originView.now());
                                if (resolvedNode == null) {
                                    callback.on(null);
                                } else {
                                    lookup(originView, resolvedNode.value, callback);
                                }
                            }
                        }
                    });
                }
            }
        });
    }

    @Override
    public void setRoot(KObject newRoot, Callback<Throwable> callback) {
        bumpKeyToCache(KContentKey.createRootUniverseTree(), new Callback<KCacheObject>() {
            @Override
            public void on(KCacheObject globalRootTree) {
                LongLongHashMap cleanedTree = (LongLongHashMap) globalRootTree;
                if (cleanedTree == null) {
                    cleanedTree = new LongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
                    _cache.put(KContentKey.createRootUniverseTree(), cleanedTree);
                }
                long closestUniverse = ResolutionHelper.resolve_universe(globalUniverseOrder(), cleanedTree, newRoot.now(), newRoot.universe().key());
                cleanedTree.put(newRoot.universe().key(), newRoot.now());
                if (closestUniverse != newRoot.universe().key()) {
                    LongRBTree newTimeTree = new LongRBTree();
                    newTimeTree.insert(newRoot.now(), newRoot.uuid());
                    KContentKey universeTreeRootKey = KContentKey.createRootTimeTree(newRoot.universe().key());
                    _cache.put(universeTreeRootKey, newTimeTree);
                    if (callback != null) {
                        callback.on(null);
                    }
                } else {
                    KContentKey universeTreeRootKey = KContentKey.createRootTimeTree(closestUniverse);
                    bumpKeyToCache(universeTreeRootKey, new Callback<KCacheObject>() {
                        @Override
                        public void on(KCacheObject resolvedRootTimeTree) {
                            LongRBTree initializedTree = (LongRBTree) resolvedRootTimeTree;
                            if (initializedTree == null) {
                                initializedTree = new LongRBTree();
                                _cache.put(universeTreeRootKey, initializedTree);
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

    private MultiLayeredMemoryCache _cache = new MultiLayeredMemoryCache();

    @Override
    public KCache cache() {
        return _cache;
    }

    @Override
    public void reload(KContentKey[] keys, final Callback<Throwable> callback) {
        List<KContentKey> toReload = new ArrayList<KContentKey>();
        for (int i = 0; i < keys.length; i++) {
            KCacheObject cached = _cache.get(keys[i]);
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
                            KCacheObject cachedObj = _cache.get(correspondingKey);
                            if (cachedObj != null && !cachedObj.isDirty()) {
                                cachedObj = internal_unserialize(correspondingKey, strings[i]);
                                if (cachedObj != null) {
                                    //replace the cache value
                                    _cache.put(correspondingKey, cachedObj);
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

    public void bumpKeyToCache(KContentKey contentKey, Callback<KCacheObject> callback) {
        KCacheObject cached = _cache.get(contentKey);
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
                            _cache.put(contentKey, newObject);
                        }
                        callback.on(newObject);
                    } else {
                        callback.on(null);
                    }
                }
            });
        }
    }

    public void bumpKeysToCache(KContentKey[] contentKeys, Callback<KCacheObject[]> callback) {
        boolean[] toLoadIndexes = null;
        int nbElem = 0;
        KCacheObject[] result = new KCacheObject[contentKeys.length];
        for (int i = 0; i < contentKeys.length; i++) {
            result[i] = _cache.get(contentKeys[i]);
            if (result[i] == null) {
                if (toLoadIndexes == null) {
                    toLoadIndexes = new boolean[contentKeys.length];
                }
                toLoadIndexes[i] = true;
                nbElem++;
            }
        }
        if (toLoadIndexes == null) {
            callback.on(result);
        } else {
            KContentKey[] toLoadDbKeys = new KContentKey[nbElem];
            int[] originIndexes = new int[nbElem];
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
                                _cache.put(newObjKey, newObject);
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
        long segment = key.segment();
        if (segment == KContentKey.GLOBAL_SEGMENT_DATA_INDEX) {
            result = new IndexRBTree();
        } else if (segment == KContentKey.GLOBAL_SEGMENT_DATA_RAW) {
            result = new KCacheEntry();
        } else if (segment == KContentKey.GLOBAL_SEGMENT_DATA_ROOT_INDEX) {
            result = new LongRBTree();
        } else if (segment == KContentKey.GLOBAL_SEGMENT_DATA_HASH_INDEX || segment == KContentKey.GLOBAL_SEGMENT_UNIVERSE_TREE || segment == KContentKey.GLOBAL_SEGMENT_DATA_ROOT) {
            result = new LongLongHashMap(0, KConfig.CACHE_LOAD_FACTOR);
        } else {
            result = null;
        }
        try {
            if (result == null) {
                return null;
            } else {
                result.unserialize(key, payload, model().metaModel());
                return result;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /* TODO MultiUniverse */
    @Override
    public void timeTrees(KObject p_origin, Long start, Long end, final Callback<IndexRBTree[]> callback) {
        //TODO enhance for multiVerse
        long[] uuid = new long[1];
        uuid[0] = p_origin.uuid();
        internal_resolve_universe_time(p_origin.view(), uuid, new Callback<ResolutionResult[]>() {
            @Override
            public void on(ResolutionResult[] resolutionResults) {
                IndexRBTree[] trees = new IndexRBTree[1];
                trees[0] = resolutionResults[0].timeTree;
                callback.on(trees);
            }
        });
    }

}
