package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KEvent;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.event.KEventBroker;
import org.kevoree.modeling.api.event.ListenerScope;
import org.kevoree.modeling.api.time.TimeTree;

/**
 * Created by duke on 10/17/14.
 */
public interface KStore {

    void lookup(KView originView, Long key, Callback<KObject> callback);

    void lookupAll(KView originView, Long[] key, Callback<KObject[]> callback);

    Object[] raw(KObject origin, AccessMode accessMode);

    public void save(KDimension dimension, Callback<Throwable> callback);

    public void saveUnload(KDimension dimension, Callback<Throwable> callback);

    public void discard(KDimension dimension, Callback<Throwable> callback);

    public void delete(KDimension dimension, Callback<Throwable> callback);

    public void initKObject(KObject obj, KView originView);

    public void initDimension(KDimension dimension, Callback<Throwable> callback);

    long nextDimensionKey();

    long nextObjectKey();

    public void getRoot(KView originView, Callback<KObject> callback);

    public void setRoot(KObject newRoot);

    public KEventBroker eventBroker();

    public void setEventBroker(KEventBroker broker);

    public KDataBase dataBase();

    public void setDataBase(KDataBase dataBase);
}
