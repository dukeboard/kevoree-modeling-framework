package org.kevoree.modeling.api.data.manager;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KModel;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KScheduler;
import org.kevoree.modeling.api.KUniverse;
import org.kevoree.modeling.api.data.cache.KCache;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;
import org.kevoree.modeling.api.util.KOperationManager;

public interface KDataManager {

    KContentDeliveryDriver cdn();

    KModel model();

    KCache cache();

    void lookup(long universe, long time, long uuid, Callback<KObject> callback);

    void lookupAllobjects(long universe, long time, long[] uuid, Callback<KObject[]> callback);

    void lookupAlltimes(long universe, long[] time, long uuid, Callback<KObject[]> callback);

    KCacheEntry entry(KObject origin, AccessMode accessMode);

    void save(Callback<Throwable> callback);

    void discard(KUniverse universe, Callback<Throwable> callback);

    void delete(KUniverse universe, Callback<Throwable> callback);

    void initKObject(KObject obj);

    void initUniverse(KUniverse universe, KUniverse parent);

    long nextUniverseKey();

    long nextObjectKey();

    long nextModelKey();

    long nextGroupKey();

    void getRoot(long universe, long time, Callback<KObject> callback);

    void setRoot(KObject newRoot, Callback<Throwable> callback);

    void setContentDeliveryDriver(KContentDeliveryDriver driver);

    void setScheduler(KScheduler scheduler);

    KOperationManager operationManager();

    void connect(Callback<Throwable> callback);

    void close(Callback<Throwable> callback);

    long parentUniverseKey(long currentUniverseKey);

    long[] descendantsUniverseKeys(long currentUniverseKey);

    void reload(KContentKey[] keys, Callback<Throwable> callback);

}
