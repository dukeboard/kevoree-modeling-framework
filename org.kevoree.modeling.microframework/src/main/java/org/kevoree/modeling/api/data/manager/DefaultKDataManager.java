package org.kevoree.modeling.api.data.manager;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.cache.KCacheObject;
import org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;
import org.kevoree.modeling.api.data.cdn.KContentPutRequest;
import org.kevoree.modeling.api.data.cdn.MemoryKContentDeliveryDriver;
import org.kevoree.modeling.api.event.DefaultKBroker;
import org.kevoree.modeling.api.event.KEventBroker;
import org.kevoree.modeling.api.scheduler.DirectScheduler;
import org.kevoree.modeling.api.time.DefaultTimeTree;
import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.api.time.rbtree.LongRBTree;
import org.kevoree.modeling.api.time.rbtree.LongTreeNode;
import org.kevoree.modeling.api.util.DefaultOperationManager;
import org.kevoree.modeling.api.util.KOperationManager;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by duke on 10/17/14.
 */
public class DefaultKDataManager implements KDataManager {

    public static final char KEY_SEP = ',';

    private KContentDeliveryDriver _db;
    private KEventBroker _eventBroker;
    private KOperationManager _operationManager;
    private KScheduler _scheduler;
    private KModel _model;
    private KeyCalculator _objectKeyCalculator = null;
    private KeyCalculator _dimensionKeyCalculator = null;
    private boolean isConnected = false;

    private static final String OUT_OF_CACHE_MESSAGE = "KMF Error: your object is out of cache, you probably kept an old reference. Please reload it with a lookup";
    private static final String DELETED_MESSAGE = "KMF Error: your object has been deleted. Please do not use object pointer after a call to delete method";

    public DefaultKDataManager(KModel model) {
        this._db = new MemoryKContentDeliveryDriver();
        this._eventBroker = new DefaultKBroker();
        this._eventBroker.setKStore(this);
        this._operationManager = new DefaultOperationManager(this);
        this._scheduler = new DirectScheduler();
        this._model = model;
    }

    @Override
    public KModel getModel() {
        return _model;
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

    @Override
    public synchronized long nextUniverseKey() {
        if (_dimensionKeyCalculator == null) {
            throw new RuntimeException(UNIVERSE_NOT_CONNECTED_ERROR);
        }
        return _dimensionKeyCalculator.nextKey();
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
        KContentKey[] dirtiesKeys = _db.cache().dirties();
        KContentPutRequest request = new KContentPutRequest(dirtiesKeys.length);
        for (int i = 0; i < dirtiesKeys.length; i++) {
            KCacheObject cachedObject = _db.cache().get(dirtiesKeys[i]);
            cachedObject.setClean();
            request.put(dirtiesKeys[i], cachedObject.serialize());
        }
        _db.put(request, new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                _eventBroker.flush();
                callback.on(throwable);
            }
        });
    }

    @Override
    public void initKObject(KObject obj, KView originView) {
        KCacheEntry KCacheEntry = new KCacheEntry();
        KCacheEntry.raw = new Object[Index.RESERVED_INDEXES + obj.metaClass().metaAttributes().length + obj.metaClass().metaReferences().length];
        KCacheEntry._dirty = true;
        KCacheEntry.metaClass = obj.metaClass();
        KCacheEntry.timeTree = obj.timeTree();
        KCacheEntry.universeTree = obj.universeTree();
        _db.cache().put(KContentKey.createTimeTree(obj.universe().key(), obj.uuid()), obj.timeTree());
        _db.cache().put(KContentKey.createUniverseTree(obj.uuid()), obj.universeTree());
        _db.cache().put(KContentKey.createObject(obj.universe().key(), obj.now(), obj.uuid()), KCacheEntry);
    }

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
                                                        String[] keys2 = new String[3];
                                                        keys2[0] = keyLastUniIndex(payloadPrefix);
                                                        keys2[1] = keyLastObjIndex(payloadPrefix);
                                                        keys2[2] = keyUniverseGlobalTree();
                                                        _db.get(keys2, new ThrowableCallback<String[]>() {
                                                            @Override
                                                            public void on(String[] strings, Throwable error) {
                                                                if (error != null) {
                                                                    if (callback != null) {
                                                                        callback.on(error);
                                                                    }
                                                                } else {
                                                                    if (strings.length == 3) {
                                                                        try {
                                                                            String dimIndexPayload = strings[0];
                                                                            if (dimIndexPayload == null || dimIndexPayload.equals("")) {
                                                                                dimIndexPayload = "0";
                                                                            }
                                                                            String objIndexPayload = strings[1];
                                                                            if (objIndexPayload == null || objIndexPayload.equals("")) {
                                                                                objIndexPayload = "0";
                                                                            }
                                                                            String globalUniverseTreePayload = strings[2];
                                                                            try {
                                                                                LongRBTree globalUniverseTree = new LongRBTree();
                                                                                globalUniverseTree.unserialize(globalUniverseTreePayload);
                                                                                _db.cache().put(KContentKey.createGlobalUniverseTree(), globalUniverseTree);
                                                                            } catch (Exception e) {
                                                                                e.printStackTrace();
                                                                                //noop
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

    private String keyTimeTree(long uni, long key) {
        return "" + uni + KEY_SEP + key;
    }

    private String keyRoot(long uni) {
        return "" + uni + KEY_SEP + "root";
    }
    
    private String keyLastPrefix() {
        return "ring_prefix";
    }

    private String keyLastUniIndex(String prefix) {
        return "index_uni_" + prefix;
    }

    private String keyUniverseGlobalTree() {
        return "uni_tree";
    }

    private String keyLastObjIndex(String prefix) {
        return "index_obj_" + prefix;
    }

    //TODO
    @Override
    public Object[] raw(KObject origin, AccessMode accessMode) {
        //TODO manage multi universe, and protect for potential null
        long resolvedTime = origin.timeTree().resolve(origin.now());
        boolean needCopy = accessMode.equals(AccessMode.WRITE) && (resolvedTime != origin.now());
        KCacheEntry entry = (KCacheEntry) _db.cache().get(KContentKey.createObject(origin.universe().key(), origin.now(), origin.uuid()));
        if (entry == null) {
            System.err.println(OUT_OF_CACHE_MESSAGE);
            return null;
        }
        Object[] payload = entry.raw;
        if (accessMode.equals(AccessMode.DELETE)) {
            entry.timeTree.delete(origin.now());
            entry.raw = null;
            return payload;
        }
        if (payload == null) {
            System.err.println(DELETED_MESSAGE);
            return null;
        } else {
            if (!needCopy) {
                if (accessMode.equals(AccessMode.WRITE)) {
                    entry._dirty = true;
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
                        } else if (resolved instanceof KInferState) {
                            cloned[i] = ((KInferState) resolved).cloneState();
                        } else {
                            cloned[i] = resolved;
                        }
                    }
                }
                KCacheEntry clonedEntry = new KCacheEntry();
                clonedEntry._dirty = true;
                clonedEntry.raw = cloned;
                clonedEntry.metaClass = entry.metaClass;
                clonedEntry.timeTree = entry.timeTree;
                clonedEntry.universeTree = entry.universeTree;
                clonedEntry.timeTree.insert(origin.now());
                //TODO update structure for multi universe
                _db.cache().put(KContentKey.createObject(origin.universe().key(), origin.now(), origin.uuid()), clonedEntry);
                return clonedEntry.raw;
            }
        }
    }


    @Override
    public void discard(KUniverse p_universe, Callback<Throwable> callback) {
        _db.cache().clearDataSegment();
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

    public void getRoot(final KView originView, final Callback<KObject> callback) {
        resolve_roots(originView.universe(), new Callback<LongRBTree>() {
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
        resolve_roots(newRoot.universe(), new Callback<LongRBTree>() {
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
        this._eventBroker.setKStore(this);
    }

    @Override
    public KContentDeliveryDriver dataBase() {
        return this._db;
    }

    @Override
    public void setDataBase(KContentDeliveryDriver p_dataBase) {
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

    /* Private not synchronized methods */

    public static final int INDEX_RESOLVED_UNIVERSE = 0;

    public static final int INDEX_RESOLVED_UNIVERSE_TREE = 1;

    public static final int INDEX_RESOLVED_TIME = 2;

    public static final int INDEX_RESOLVED_TIME_TREE = 3;

    public static final int INDEX_SIZE = 4;

    void internal_resolve_universe_time(KView originView, Long[] uuids, Callback<Object[][]> callback) {
        Object[][] result = new Object[uuids.length][];
        resolve_timeTrees(originView.universe(), uuids, new Callback<TimeTree[]>() {
            @Override
            public void on(TimeTree[] timeTrees) {
                for (int i = 0; i < timeTrees.length; i++) {
                    Object[] resolved = new Object[INDEX_SIZE];
                    resolved[INDEX_RESOLVED_UNIVERSE] = originView.universe().key(); //TODO better ...
                    resolved[INDEX_RESOLVED_UNIVERSE_TREE] = null; //TODO
                    if (timeTrees[i] != null) {
                        resolved[INDEX_RESOLVED_TIME] = timeTrees[i].resolve(originView.now());
                    }
                    resolved[INDEX_RESOLVED_TIME_TREE] = timeTrees[i];
                    result[i] = resolved;
                }
                callback.on(result);
            }
        });
    }

    private void resolve_timeTrees(final KUniverse p_universe, final Long[] keys, final Callback<TimeTree[]> callback) {
        final List<Integer> toLoad = new ArrayList<Integer>();
        final TimeTree[] result = new TimeTree[keys.length];
        for (int i = 0; i < keys.length; i++) {
            final UniverseCache universeCache = cache.universeCache.get(p_universe.key());
            if (universeCache == null) {
                toLoad.add(i);
            } else {
                TimeTree cachedTree = universeCache.timeTreeCache.get(keys[i]);
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
                toLoadKeys[i] = keyTimeTree(p_universe.key(), keys[toLoad.get(i)]);
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
                                newTree.insert(p_universe.key());
                            }
                            //Write in cache the Resolved TimeTree
                            //TODO resolve first the universeTree
                            write_time_tree(p_universe.key(), keys[toLoad.get(i)], newTree);
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

    private void resolve_roots(final KUniverse p_universe, final Callback<LongRBTree> callback) {
        UniverseCache universeCache = cache.universeCache.get(p_universe.key());
        if (universeCache != null && universeCache.roots != null) {
            //If value is already in cache, return it
            callback.on(universeCache.roots);
        } else {
            //otherwise, load it from DB
            String[] keys = new String[1];
            keys[0] = keyRoot(p_universe.key());
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
                    write_roots(p_universe.key(), tree);
                    callback.on(tree);
                }
            });
        }
    }

}
