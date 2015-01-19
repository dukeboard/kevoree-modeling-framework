package org.kevoree.modeling.api;

import org.kevoree.modeling.api.data.KDataBase;
import org.kevoree.modeling.api.data.KStore;
import org.kevoree.modeling.api.event.KEventBroker;
import org.kevoree.modeling.api.meta.MetaModel;
import org.kevoree.modeling.api.meta.MetaOperation;

/**
 * Created by duke on 9/30/14.
 */

public interface KModel<A extends KUniverse> {

    public void connect(Callback<Throwable> callback);

    public void close(Callback<Throwable> callback);

    public A newDimension();

    public A dimension(long key);

    //TODO refactor with promise
    public void saveAll(Callback<Boolean> callback);

    public void deleteAll(Callback<Boolean> callback);

    public void unloadAll(Callback<Boolean> callback);

    public void disable(ModelListener listener);

    public void stream(String query, Callback<KObject> callback);

    public KStore storage();

    public void listen(ModelListener listener);

    public KModel<A> setEventBroker(KEventBroker eventBroker);

    public KModel<A> setDataBase(KDataBase dataBase);

    public void setOperation(MetaOperation metaOperation, KOperation operation);

    public MetaModel metaModel();

}