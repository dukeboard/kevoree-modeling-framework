package org.kevoree.modeling.api;

import org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;
import org.kevoree.modeling.api.data.manager.KDataManager;
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

    public KDataManager manager();

    public void listen(ModelListener listener);

    public KModel<A> setContentDeliveryDriver(KContentDeliveryDriver dataBase);

    public KModel<A> setScheduler(KScheduler scheduler);

    public void setOperation(MetaOperation metaOperation, KOperation operation);

    public void setInstanceOperation(MetaOperation metaOperation, KObject target, KOperation operation);

    public MetaModel metaModel();

    public KTask task();

    public void save(Callback<Throwable> callback);

    public void discard(Callback<Throwable> callback);

    public void connect(Callback<Throwable> callback);

    public void close(Callback<Throwable> callback);

    public KTask<Throwable> taskSave();

    public KTask<Throwable> taskDiscard();

    public KTask<Throwable> taskConnect();

    public KTask<Throwable> taskClose();

}