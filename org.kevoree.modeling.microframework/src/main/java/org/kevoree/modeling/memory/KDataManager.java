package org.kevoree.modeling.memory;

import org.kevoree.modeling.KObject;
import org.kevoree.modeling.KUniverse;
import org.kevoree.modeling.Callback;
import org.kevoree.modeling.KModel;
import org.kevoree.modeling.KScheduler;
import org.kevoree.modeling.memory.struct.segment.HeapCacheSegment;
import org.kevoree.modeling.util.KOperationManager;

public interface KDataManager {

    KContentDeliveryDriver cdn();

    KModel model();

    KCache cache();

    void lookup(long universe, long time, long uuid, Callback<KObject> callback);

    void lookupAllobjects(long universe, long time, long[] uuid, Callback<KObject[]> callback);

    void lookupAlltimes(long universe, long[] time, long uuid, Callback<KObject[]> callback);

    KCacheElementSegment segment(KObject origin, AccessMode accessMode);

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
