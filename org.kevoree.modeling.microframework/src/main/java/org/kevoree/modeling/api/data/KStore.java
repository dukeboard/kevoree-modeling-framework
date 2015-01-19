package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KUniverse;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.event.KEventBroker;
import org.kevoree.modeling.api.util.KOperationManager;

/**
 * Created by duke on 10/17/14.
 */
public interface KStore {

    void lookup(KView originView, Long key, Callback<KObject> callback);

    void lookupAll(KView originView, Long[] key, Callback<KObject[]> callback);

    Object[] raw(KObject origin, AccessMode accessMode);

    public void save(KUniverse universe, Callback<Throwable> callback);

    public void saveUnload(KUniverse universe, Callback<Throwable> callback);

    public void discard(KUniverse universe, Callback<Throwable> callback);

    public void delete(KUniverse universe, Callback<Throwable> callback);

    public void initKObject(KObject obj, KView originView);

    public void initUniverse(KUniverse universe);

    long nextUniverseKey();

    long nextObjectKey();

    public void getRoot(KView originView, Callback<KObject> callback);

    public void setRoot(KObject newRoot, Callback<Throwable> callback);

    public KEventBroker eventBroker();

    public void setEventBroker(KEventBroker broker);

    public KDataBase dataBase();

    public void setDataBase(KDataBase dataBase);

    public KOperationManager operationManager();

    public void connect(Callback<Throwable> callback);

    public void close(Callback<Throwable> callback);

}
