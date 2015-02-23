package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KModel;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KOperation;
import org.kevoree.modeling.api.KScheduler;
import org.kevoree.modeling.api.KTask;
import org.kevoree.modeling.api.KUniverse;
import org.kevoree.modeling.api.KEventListener;
import org.kevoree.modeling.api.data.manager.DefaultKDataManager;
import org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;
import org.kevoree.modeling.api.data.manager.KDataManager;
import org.kevoree.modeling.api.meta.MetaModel;
import org.kevoree.modeling.api.meta.MetaOperation;

/**
 * Created by duke on 10/10/14.
 */
public abstract class AbstractKModel<A extends KUniverse> implements KModel<A> {

    private final KDataManager _manager;

    public abstract MetaModel metaModel();

    protected AbstractKModel() {
        _manager = new DefaultKDataManager(this);
    }

    @Override
    public void connect(Callback<Throwable> callback) {
        _manager.connect(callback);
    }

    @Override
    public void close(Callback<Throwable> callback) {
        _manager.close(callback);
    }

    @Override
    public KDataManager manager() {
        return _manager;
    }

    @Override
    public A newUniverse() {
        long nextKey = _manager.nextUniverseKey();
        final A newDimension = internal_create(nextKey);
        manager().initUniverse(newDimension, null);
        return newDimension;
    }

    protected abstract A internal_create(long key);

    @Override
    public A universe(long key) {
        A newDimension = internal_create(key);
        manager().initUniverse(newDimension, null);
        return newDimension;
    }

    @Override
    public void save(Callback<Throwable> callback) {
        _manager.save(callback);
    }

    @Override
    public void discard(Callback<Throwable> callback) {
        _manager.discard(null, callback);
    }

    @Override
    public void disable(KEventListener listener) {
        manager().cdn().unregister(listener);
    }

    @Override
    public void listen(KEventListener listener) {
        manager().cdn().registerListener(this, listener, null);
    }

    @Override
    public KModel<A> setContentDeliveryDriver(KContentDeliveryDriver p_driver) {
        manager().setContentDeliveryDriver(p_driver);
        return this;
    }

    @Override
    public KModel<A> setScheduler(KScheduler p_scheduler) {
        manager().setScheduler(p_scheduler);
        return this;
    }

    @Override
    public void setOperation(MetaOperation metaOperation, KOperation operation) {
        manager().operationManager().registerOperation(metaOperation, operation, null);
    }

    @Override
    public void setInstanceOperation(MetaOperation metaOperation, KObject target, KOperation operation) {
        manager().operationManager().registerOperation(metaOperation, operation, target);
    }

    @Override
    public KTask task() {
        return new AbstractKTask();
    }

    @Override
    public KTask<Throwable> taskSave() {
        AbstractKTaskWrapper<Throwable> task = new AbstractKTaskWrapper<Throwable>();
        save(task.initCallback());
        return task;
    }

    @Override
    public KTask<Throwable> taskDiscard() {
        AbstractKTaskWrapper<Throwable> task = new AbstractKTaskWrapper<Throwable>();
        discard(task.initCallback());
        return task;
    }

    @Override
    public KTask<Throwable> taskConnect() {
        AbstractKTaskWrapper<Throwable> task = new AbstractKTaskWrapper<Throwable>();
        connect(task.initCallback());
        return task;
    }

    @Override
    public KTask<Throwable> taskClose() {
        AbstractKTaskWrapper<Throwable> task = new AbstractKTaskWrapper<Throwable>();
        close(task.initCallback());
        return task;
    }
}
