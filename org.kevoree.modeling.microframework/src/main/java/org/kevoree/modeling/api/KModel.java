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

    public A newUniverse();

    public A universe(long key);

    public void disable(ModelListener listener);

    public KStore storage();

    public void listen(ModelListener listener);

    public KModel<A> setEventBroker(KEventBroker eventBroker);

    public KModel<A> setDataBase(KDataBase dataBase);

    public void setOperation(MetaOperation metaOperation, KOperation operation);

    public MetaModel metaModel();

    public KTask task();

    public void save(Callback<Boolean> callback);

    public void discard(Callback<Boolean> callback);

    public void unload(Callback<Boolean> callback);

    public void connect(Callback<Throwable> callback);

    public void close(Callback<Throwable> callback);

    public KTask<Boolean> taskSave();

    public KTask<Boolean> taskDiscard();

    public KTask<Boolean> taskUnload();

    public KTask<Throwable> taskConnect();

    public KTask<Throwable> taskClose();

}