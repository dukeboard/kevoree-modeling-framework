package org.kevoree.modeling.api.data.manager;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KModel;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KScheduler;
import org.kevoree.modeling.api.KUniverse;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;
import org.kevoree.modeling.api.util.KOperationManager;

/**
 * Created by duke on 10/17/14.
 */
public interface KDataManager {

    void lookup(KView originView, Long key, Callback<KObject> callback);

    void lookupAll(KView originView, Long[] key, Callback<KObject[]> callback);

    KCacheEntry entry(KObject origin, AccessMode accessMode);

    public void save(Callback<Throwable> callback);

    public void discard(KUniverse universe, Callback<Throwable> callback);

    public void delete(KUniverse universe, Callback<Throwable> callback);

    public void initKObject(KObject obj, KView originView);

    public void initUniverse(KUniverse universe, KUniverse parent);

    long nextUniverseKey();

    long nextObjectKey();

    public void getRoot(KView originView, Callback<KObject> callback);

    public void setRoot(KObject newRoot, Callback<Throwable> callback);

    public KContentDeliveryDriver cdn();

    public void setContentDeliveryDriver(KContentDeliveryDriver driver);

    public void setScheduler(KScheduler scheduler);

    public KOperationManager operationManager();

    public void connect(Callback<Throwable> callback);

    public void close(Callback<Throwable> callback);

    public KModel getModel();

    public Long parentUniverseKey(Long currentUniverseKey);

    public Long[] descendantsUniverseKeys(Long currentUniverseKey);

}
