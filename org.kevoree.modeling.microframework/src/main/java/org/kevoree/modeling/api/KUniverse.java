package org.kevoree.modeling.api;

import org.kevoree.modeling.api.data.KDataBase;
import org.kevoree.modeling.api.data.KStore;
import org.kevoree.modeling.api.event.KEventBroker;
import org.kevoree.modeling.api.event.ListenerScope;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaOperation;

/**
 * Created by duke on 9/30/14.
 */

public interface KUniverse<A extends KDimension> {

    public void newDimension(Callback<A> callback);

    public void dimension(long key, Callback<A> callback);

    //TODO refactor with promise
    public void saveAll(Callback<Boolean> callback);

    public void deleteAll(Callback<Boolean> callback);

    public void unloadAll(Callback<Boolean> callback);

    public void disable(ModelListener listener);

    public void stream(String query, Callback<KObject> callback);

    public KStore storage();

    public void listen(ModelListener listener, ListenerScope scope);

    public KUniverse<A> setEventBroker(KEventBroker eventBroker);

    public KUniverse<A> setDataBase(KDataBase dataBase);

    public void setOperation(MetaClass clazz, MetaOperation operation, OperationCallback callback);

}