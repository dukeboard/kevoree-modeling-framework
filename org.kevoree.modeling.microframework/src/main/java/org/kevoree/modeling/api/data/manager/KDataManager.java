package org.kevoree.modeling.api.data.manager;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KModel;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KScheduler;
import org.kevoree.modeling.api.KUniverse;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.data.cache.KCache;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;
import org.kevoree.modeling.api.rbtree.IndexRBTree;
import org.kevoree.modeling.api.util.KOperationManager;

import java.util.List;

/**
 * Created by duke on 10/17/14.
 */
public interface KDataManager {

    KContentDeliveryDriver cdn();

    KModel model();

    KCache cache();

    void lookup(KView originView, long key, Callback<KObject> callback);

    void lookupAll(KView originView, long[] key, Callback<KObject[]> callback);

    KCacheEntry entry(KObject origin, AccessMode accessMode);

    void save(Callback<Throwable> callback);

    void discard(KUniverse universe, Callback<Throwable> callback);

    void delete(KUniverse universe, Callback<Throwable> callback);

    void initKObject(KObject obj, KView originView);

    void initUniverse(KUniverse universe, KUniverse parent);

    long nextUniverseKey();

    long nextObjectKey();

    long nextModelKey();

    long nextGroupKey();

    void getRoot(KView originView, Callback<KObject> callback);

    void setRoot(KObject newRoot, Callback<Throwable> callback);

    void setContentDeliveryDriver(KContentDeliveryDriver driver);

    void setScheduler(KScheduler scheduler);

    KOperationManager operationManager();

    void connect(Callback<Throwable> callback);

    void close(Callback<Throwable> callback);

    long parentUniverseKey(long currentUniverseKey);

    long[] descendantsUniverseKeys(long currentUniverseKey);

    void reload(KContentKey[] keys, Callback<Throwable> callback);

    void cleanObject(KObject objectToClean);

}
