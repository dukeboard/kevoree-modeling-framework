package org.kevoree.modeling.api.data.manager;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;
import org.kevoree.modeling.api.event.KEventBroker;
import org.kevoree.modeling.api.util.KOperationManager;

/**
 * Created by duke on 10/17/14.
 */
public interface KDataManager {

    void lookup(KView originView, Long key, Callback<KObject> callback);

    void lookupAll(KView originView, Long[] key, Callback<KObject[]> callback);

    Object[] raw(KObject origin, AccessMode accessMode);

    public void save(Callback<Throwable> callback);

    public void discard(KUniverse universe, Callback<Throwable> callback);

    public void delete(KUniverse universe, Callback<Throwable> callback);

    public void initKObject(KObject obj, KView originView);

    public void initUniverse(KUniverse universe, KUniverse parent);

    long nextUniverseKey();

    long nextObjectKey();

    public void getRoot(KView originView, Callback<KObject> callback);

    public void setRoot(KObject newRoot, Callback<Throwable> callback);

    public KEventBroker eventBroker();

    public void setEventBroker(KEventBroker broker);

    public KContentDeliveryDriver dataBase();

    public void setDataBase(KContentDeliveryDriver dataBase);

    public void setScheduler(KScheduler scheduler);

    public KOperationManager operationManager();

    public void connect(Callback<Throwable> callback);

    public void close(Callback<Throwable> callback);

    public KModel getModel();

    public Long parentUniverseKey(Long currentUniverseKey);

    public Long[] descendantsUniverseKeys(Long currentUniverseKey);

}
