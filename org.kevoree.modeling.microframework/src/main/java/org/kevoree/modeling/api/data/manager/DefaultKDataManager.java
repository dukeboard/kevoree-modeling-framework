package org.kevoree.modeling.api.data.manager;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KModel;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KScheduler;
import org.kevoree.modeling.api.KUniverse;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.data.cache.KCacheDirty;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.cache.KCacheObject;
import org.kevoree.modeling.api.data.cdn.AtomicOperation;
import org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;
import org.kevoree.modeling.api.data.cdn.KContentPutRequest;
import org.kevoree.modeling.api.data.cdn.MemoryKContentDeliveryDriver;
import org.kevoree.modeling.api.msg.KEventMessage;
import org.kevoree.modeling.api.msg.KMessage;
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
    //private static final String DELETED_MESSAGE = "KMF Error: your object has been deleted. Please do not use object pointer after a call to delete method";

    public DefaultKDataManager(KModel model) {
        this._db = new MemoryKContentDeliveryDriver();
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
        return _universeKeyCalculator.nextKey();
    }

    private static final String UNIVERSE_NOT_CONNECTED_ERROR = "Please connect your model prior to create a universe or an object";

    @Override
    public synchronized long nextObjectKey() {
        if (_objectKeyCalculator == null) {
            throw new RuntimeException(UNIVERSE_NOT_CONNECTED_ERROR);
        }
        return _objectKeyCalculator.nextKey();
    }

    @Override
    public void initUniverse(KUniverse p_universe, KUniverse p_parent) {
        KContentKey key = KContentKey.createGlobalUniverseTree();
        LongRBTree cachedTree = (LongRBTree) _db.cache().get(key);
        if (cachedTree != null && cachedTree.lookup(p_universe.key()) == null) {
            if (p_parent == null) {
                cachedTree.insert(p_universe.key(), p_universe.key());
            } else {
                cachedTree.insert(p_universe.key(), p_parent.key());
            }
        }
    }

    @Override
    public Long parentUniverseKey(Long currentUniverseKey) {
        KContentKey key = KContentKey.createGlobalUniverseTree();
        LongRBTree cachedTree = (LongRBTree) _db.cache().get(key);
        if (cachedTree != null) {
            return cachedTree.lookup(currentUniverseKey);
        } else {
            return null;
        }
    }

    @Override
    public Long[] descendantsUniverseKeys(Long currentUniverseKey) {
        KContentKey key = KContentKey.createGlobalUniverseTree();
        LongRBTree cachedTree = (LongRBTree) _db.cache().get(key);
        if (cachedTree != null) {
            List<Long> nextElems = new ArrayList<Long>();
            LongTreeNode elem = cachedTree.first();
            while (elem != null) {
                if (elem.value == currentUniverseKey && elem.key != currentUniverseKey) {
                    nextElems.add(elem.key);
                }
                elem = elem.next();
            }
            return nextElems.toArray(new Long[nextElems.size()]);
        } else {
            return new Long[0];
        }
    }

    @Override
    public synchronized void save(Callback<Throwable> callback) {
        KCacheDirty[] dirtiesEntries = _db.cache().dirties();
        KContentPutRequest request = new KContentPutRequest(dirtiesEntries.length + 2);
        int nbCacheEntry = 0;
        for (int i = 0; i < dirtiesEntries.length; i++) {
            if (dirtiesEntries[i].object instanceof KCacheEntry) {
                nbCacheEntry = nbCacheEntry + 1;
            }
        }
        KMessage[] notificationMessages = new KMessage[nbCacheEntry];
        int nbInsertedMsg = 0;
        for (int i = 0; i < dirtiesEntries.length; i++) {
            KCacheObject cachedObject = dirtiesEntries[i].object;
            if (dirtiesEntries[i].object instanceof KCacheEntry) {
                KEventMessage newMessage = new KEventMessage();
                newMessage.meta = ((KCacheEntry) dirtiesEntries[i].object).modifiedIndexes();
                newMessage.key = dirtiesEntries[i].key;
                notificationMessages[nbInsertedMsg] = newMessage;
                nbInsertedMsg = nbInsertedMsg + 1;
            }
            cachedObject.setClean();
            request.put(dirtiesEntries[i].key, cachedObject.serialize());
        }
        request.put(KContentKey.createLastObjectIndexFromPrefix(_objectKeyCalculator.prefix()), "" + _objectKeyCalculator.lastComputedIndex());
        request.put(KContentKey.createLastUniverseIndexFromPrefix(_universeKeyCalculator.prefix()), "" + _universeKeyCalculator.lastComputedIndex());
        _db.put(request, new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                if (throwable != null) {
                    _db.send(notificationMessages);
                }
                callback.on(throwable);
            }
        });
    }

    @Override
    public void initKObject(KObject obj, KView originView) {
        KCacheEntry cacheEntry = new KCacheEntry();
        cacheEntry.raw = new Object[Index.RESERVED_INDEXES + obj.metaClass().metaAttributes().length + obj.metaClass().metaReferences().length];
        cacheEntry._dirty = true;
        cacheEntry.metaClass = obj.metaClass();
        cacheEntry.universeTree = obj.universeTree();
        IndexRBTree timeTree = new IndexRBTree();
        timeTree.insert(obj.now());
        _db.cache().put(KContentKey.createTimeTree(obj.universe().key(), obj.uuid()), timeTree);
        _db.cache().put(KContentKey.createUniverseTree(obj.uuid()), cacheEntry.universeTree);
        _db.cache().put(KContentKey.createObject(obj.universe().key(), obj.now(), obj.uuid()), cacheEntry);
    }

    private final int UNIVERSE_INDEX = 0;
    private final int OBJ_INDEX = 1;
    private final int GLO_TREE_INDEX = 2;

    @Override
    public void connect(Callback<Throwable> connectCallback) {
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
                        _db.atomicGetMutate(KContentKey.createLastPrefix(), new AtomicOperation() {
                            @Override
                            public String mutate(String previous) {
                                try {
                                    Short previousPrefix;
                                    if (previous != null) {
                                        previousPrefix = Short.parseShort(previous);
                                    } else {
                                        previousPrefix = Short.parseShort("0");
                                    }
                                    if (previousPrefix == Short.MAX_VALUE) {
                                        return "" + Short.MIN_VALUE;
                                    } else {
                                        return "" + (previousPrefix + 1);
                                    }
                                } catch (Exception e) {
                                    e.printStackTrace();
                                    return "" + Short.MIN_VALUE;
                                }
                            }
                        }, new ThrowableCallback<String>() {
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
                                                        LongRBTree globalUniverseTree = new LongRBTree();
                                                        if (globalUniverseTreePayload != null) {
                                                            try {
                                                                globalUniverseTree.unserialize(globalUniverseTreePayload);
                                                            } catch (Exception e) {
                                                                e.printStackTrace();
                                                            }
                                                        }
                                                        _db.cache().put(KContentKey.createGlobalUniverseTree(), globalUniverseTree);
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
                        connectCallback.on(throwable);
                    }
                }
            });
        }
    }

    @Override
    public KCacheEntry entry(KObject origin, AccessMode accessMode) {
        LongRBTree dimensionTree = origin.universeTree();
        Long resolvedUniverse = internal_resolve_universe(dimensionTree, origin.now(), origin.view().universe().key());
        IndexRBTree timeTree = (IndexRBTree) _db.cache().get(KContentKey.createTimeTree(resolvedUniverse, origin.uuid()));
        if (timeTree == null) {
            throw new RuntimeException(OUT_OF_CACHE_MESSAGE + " : TimeTree not found for " + KContentKey.createTimeTree(resolvedUniverse, origin.uuid()) + " from " + origin.universe().key() + "/" + resolvedUniverse);
        }
        TreeNode resolvedNode = timeTree.previousOrEqual(origin.now());
        Long resolvedTime;
        if (resolvedNode != null) {
            resolvedTime = resolvedNode.getKey();
        } else {
            System.err.println(OUT_OF_CACHE_MESSAGE + " Time not resolved " + origin.now());
            return null;
        }
        boolean needTimeCopy = accessMode.equals(AccessMode.WRITE) && (resolvedTime != origin.now());
        boolean needUniverseCopy = accessMode.equals(AccessMode.WRITE) && (resolvedUniverse != origin.universe().key());
        KCacheEntry entry = (KCacheEntry) _db.cache().get(KContentKey.createObject(resolvedUniverse, resolvedTime, origin.uuid()));
        if (entry == null) {
            System.err.println(OUT_OF_CACHE_MESSAGE);
            return null;
        }
        Object[] payload = entry.raw;
        if (accessMode.equals(AccessMode.DELETE)) {
            timeTree.delete(origin.now());
            KCacheEntry clonedEntry = entry.clone();
            entry.raw = null;
            return clonedEntry;
        }
        if (payload == null) {
            //System.err.println(DELETED_MESSAGE);
            return null;
        } else {
            if (!needTimeCopy && !needUniverseCopy) {
                if (accessMode.equals(AccessMode.WRITE)) {
                    entry._dirty = true;
                }
                return entry;
            } else {
                KCacheEntry clonedEntry = entry.clone();
                clonedEntry._dirty = true;
                if (!needUniverseCopy) {
                    timeTree.insert(origin.now());
                } else {
                    IndexRBTree newTemporalTree = new IndexRBTree();
                    newTemporalTree.insert(origin.now());
                    _db.cache().put(KContentKey.createTimeTree(origin.universe().key(), origin.uuid()), newTemporalTree);
                    dimensionTree.insert(origin.universe().key(), origin.now());//insert this time as a divergence point for this object
                }
                _db.cache().put(KContentKey.createObject(origin.universe().key(), origin.now(), origin.uuid()), clonedEntry);
                return clonedEntry;
            }
        }
    }

    @Override
    public void discard(KUniverse p_universe, Callback<Throwable> callback) {
        _db.cache().clearDataSegment();
        //TODO REVERT UNIVERSE_TREE
        if (callback != null) {
            callback.on(null);
        }
    }

    @Override
    public void delete(KUniverse p_universe, Callback<Throwable> callback) {
        throw new RuntimeException("Not implemented yet !");
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
        this._scheduler.dispatch(new LookupAllRunnable(originView, keys, callback, this));
    }

    @Override
    public KContentDeliveryDriver cdn() {
        return this._db;
    }

    @Override
    public void setContentDeliveryDriver(KContentDeliveryDriver p_dataBase) {
        this._db = p_dataBase;
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

    void internal_resolve_universe_time(KView originView, Long[] uuids, Callback<ResolutionResult[]> callback) {
        final ResolutionResult[] tempResult = new ResolutionResult[uuids.length];
        //step 0: try to hit the cache layer for dimensions
        List<Integer> toLoadIndexUniverse = null;
        List<KContentKey> toLoadUniverseTrees = null;
        for (int i = 0; i < uuids.length; i++) {
            if (tempResult[i] == null) {
                tempResult[i] = new ResolutionResult();
            }
            KContentKey universeObjectTreeKey = KContentKey.createUniverseTree(uuids[i]);
            LongRBTree cachedUniverseTree = (LongRBTree) _db.cache().get(universeObjectTreeKey);
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
                            LongRBTree newLoadedTree = new LongRBTree();
                            if (resolvedContents[i] != null) {
                                try {
                                    newLoadedTree.unserialize(resolvedContents[i]);
                                } catch (Exception e) {
                                    e.printStackTrace();
                                }
                            }
                            tempResult[finalToLoadIndexUniverse.get(i)].universeTree = newLoadedTree;
                            _db.cache().put(finalToLoadUniverseTrees.get(i), newLoadedTree);
                        }
                        internal_resolve_times(originView, uuids, tempResult, callback);
                    }
                }
            });
        } else {
            internal_resolve_times(originView, uuids, tempResult, callback);
        }
    }

    private void internal_resolve_times(KView originView, Long[] uuids, ResolutionResult[] tempResult, Callback<ResolutionResult[]> callback) {
        //step 1.0: try to hit the cache layer for times
        List<Integer> toLoadIndexTimes = null;
        List<KContentKey> toLoadTimeTrees = null;
        for (int i = 0; i < uuids.length; i++) {
            if (tempResult[i].universeTree != null) {
                Long closestUniverse = internal_resolve_universe(tempResult[i].universeTree, originView.now(), originView.universe().key());
                if (closestUniverse != null) {
                    tempResult[i].resolvedUniverse = closestUniverse;
                    KContentKey timeObjectTreeKey = KContentKey.createTimeTree(closestUniverse, uuids[i]);
                    IndexRBTree cachedIndexTree = (IndexRBTree) _db.cache().get(timeObjectTreeKey);
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
                } else {
                    System.err.println("KMF ERROR on object:" + uuids[i]);
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
                                    newLoadedTree.unserialize(resolvedContents[i]);
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
                            _db.cache().put(finalToLoadTimeTrees.get(i), newLoadedTree);
                        }
                        callback.on(tempResult);
                    }
                }
            });
        } else {
            callback.on(tempResult);
        }

    }

    private Long internal_resolve_universe(LongRBTree universeTree, long timeToResolve, long currentUniverse) {
        //TODO :( uch
        return currentUniverse;
    }


    /* ROOT MANAGEMENT */

    public void internal_root_load(KContentKey contentKey, Callback<LongRBTree> callback) {
        LongRBTree rootUniverseTree = (LongRBTree) _db.cache().get(contentKey);
        if (rootUniverseTree == null) {
            KContentKey[] requestKeys = new KContentKey[1];
            requestKeys[0] = contentKey;
            _db.get(requestKeys, new ThrowableCallback<String[]>() {
                @Override
                public void on(String[] strings, Throwable error) {
                    if (error != null) {
                        error.printStackTrace();
                        callback.on(null);
                    } else {
                        LongRBTree newRootUniverseTree = new LongRBTree();
                        try {
                            newRootUniverseTree.unserialize(strings[0]);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                        _db.cache().put(contentKey, newRootUniverseTree);
                        callback.on(newRootUniverseTree);
                    }
                }
            });
        } else {
            callback.on(rootUniverseTree);
        }
    }

    public void getRoot(final KView originView, final Callback<KObject> callback) {
        KContentKey universeTreeRootKey = KContentKey.createRootUniverseTree();
        internal_root_load(universeTreeRootKey, new Callback<LongRBTree>() {
            @Override
            public void on(LongRBTree longRBTree) {
                if (longRBTree == null) {
                    callback.on(null);
                } else {
                    Long closestUniverse = internal_resolve_universe(longRBTree, originView.now(), originView.universe().key());
                    if (closestUniverse == null) {
                        callback.on(null);
                    } else {
                        KContentKey universeTreeRootKey = KContentKey.createRootTimeTree(closestUniverse);
                        internal_root_load(universeTreeRootKey, new Callback<LongRBTree>() {
                            @Override
                            public void on(LongRBTree longRBTree) {
                                if (longRBTree == null) {
                                    callback.on(null);
                                } else {
                                    LongTreeNode resolvedNode = longRBTree.previousOrEqual(originView.now());
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
            }
        });
    }

    @Override
    public void setRoot(KObject newRoot, Callback<Throwable> callback) {
        KContentKey universeTreeRootKey = KContentKey.createRootUniverseTree();
        internal_root_load(universeTreeRootKey, new Callback<LongRBTree>() {
            @Override
            public void on(LongRBTree longRBTree) {
                if (longRBTree == null) {
                    callback.on(new Exception("KMF ERROR, ROOT TREE CANNOT BE CREATED"));
                } else {
                    Long closestUniverse = internal_resolve_universe(longRBTree, newRoot.now(), newRoot.universe().key());
                    if (closestUniverse != newRoot.universe().key()) {
                        longRBTree.insert(newRoot.universe().key(), newRoot.now());
                        LongRBTree newTimeTree = new LongRBTree();
                        newTimeTree.insert(newRoot.now(), newRoot.uuid());
                        KContentKey universeTreeRootKey = KContentKey.createRootTimeTree(newRoot.universe().key());
                        _db.cache().put(universeTreeRootKey, newTimeTree);
                        if (callback != null) {
                            callback.on(null);
                        }
                    } else {
                        KContentKey universeTreeRootKey = KContentKey.createRootTimeTree(closestUniverse);
                        internal_root_load(universeTreeRootKey, new Callback<LongRBTree>() {
                            @Override
                            public void on(LongRBTree longRBTree) {
                                if (longRBTree == null) {
                                    if (callback != null) {
                                        callback.on(new Exception("KMF ERROR, ROOT TREE CANNOT BE CREATED"));
                                    }
                                } else {
                                    longRBTree.insert(newRoot.now(), newRoot.uuid());
                                    if (callback != null) {
                                        callback.on(null);
                                    }
                                }
                            }
                        });
                    }
                }
            }
        });
    }

    @Override
    public void timeTrees(KObject origin, Long start, Long end, Callback<IndexRBTree[]> callback) {
        //TODO
    }

}
