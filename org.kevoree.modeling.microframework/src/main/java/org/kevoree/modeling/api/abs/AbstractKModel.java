package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.data.manager.DefaultKDataManager;
import org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;
import org.kevoree.modeling.api.data.manager.KDataManager;
import org.kevoree.modeling.api.event.KEventBroker;
import org.kevoree.modeling.api.meta.MetaModel;
import org.kevoree.modeling.api.meta.MetaOperation;

/**
 * Created by duke on 10/10/14.
 */
public abstract class AbstractKModel<A extends KUniverse> implements KModel<A> {

    private final KDataManager _storage;

    public abstract MetaModel metaModel();

    protected AbstractKModel() {
        _storage = new DefaultKDataManager(this);
    }

    @Override
    public void connect(Callback<Throwable> callback) {
        _storage.connect(callback);
    }

    @Override
    public void close(Callback<Throwable> callback) {
        _storage.close(callback);
    }

    @Override
    public KDataManager storage() {
        return _storage;
    }

    @Override
    public A newUniverse() {
        long nextKey = _storage.nextUniverseKey();
        final A newDimension = internal_create(nextKey);
        storage().initUniverse(newDimension, null);
        return newDimension;
    }

    protected abstract A internal_create(long key);

    @Override
    public A universe(long key) {
        A newDimension = internal_create(key);
        storage().initUniverse(newDimension, null);
        return newDimension;
    }

    @Override
    public void save(Callback<Throwable> callback) {
        _storage.save(callback);
    }

    @Override
    public void discard(Callback<Throwable> callback) {
        _storage.discard(null, callback);
    }

    @Override
    public void disable(ModelListener listener) {
        storage().eventBroker().unregister(listener);
    }

    @Override
    public void listen(ModelListener listener) {
        storage().eventBroker().registerListener(this, listener, null);
    }

    @Override
    public KModel<A> setEventBroker(KEventBroker p_eventBroker) {
        storage().setEventBroker(p_eventBroker);
        p_eventBroker.setMetaModel(metaModel());
        return this;
    }

    @Override
    public KModel<A> setDataBase(KContentDeliveryDriver p_dataBase) {
        storage().setDataBase(p_dataBase);
        return this;
    }

    @Override
    public KModel<A> setScheduler(KScheduler p_scheduler) {
        storage().setScheduler(p_scheduler);
        return this;
    }

    @Override
    public void setOperation(MetaOperation metaOperation, KOperation operation) {
        storage().operationManager().registerOperation(metaOperation, operation, null);
    }

    @Override
    public void setInstanceOperation(MetaOperation metaOperation, KObject target, KOperation operation) {
        storage().operationManager().registerOperation(metaOperation, operation, target);
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
