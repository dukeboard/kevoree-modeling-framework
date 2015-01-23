package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.data.DefaultKStore;
import org.kevoree.modeling.api.data.KDataBase;
import org.kevoree.modeling.api.data.KStore;
import org.kevoree.modeling.api.event.KEventBroker;
import org.kevoree.modeling.api.meta.MetaModel;
import org.kevoree.modeling.api.meta.MetaOperation;

/**
 * Created by duke on 10/10/14.
 */
public abstract class AbstractKModel<A extends KUniverse> implements KModel<A> {

    private final KStore _storage;

    public abstract MetaModel metaModel();

    protected AbstractKModel() {
        _storage = new DefaultKStore();
        //_storage.connect(null);
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
    public KStore storage() {
        return _storage;
    }

    @Override
    public A newUniverse() {
        long nextKey = _storage.nextUniverseKey();
        final A newDimension = internal_create(nextKey);
        storage().initUniverse(newDimension);
        return newDimension;
    }

    protected abstract A internal_create(long key);

    @Override
    public A universe(long key) {
        A newDimension = internal_create(key);
        storage().initUniverse(newDimension);
        return newDimension;
    }

    @Override
    public void save(Callback<Boolean> callback) {

    }

    @Override
    public void discard(Callback<Boolean> callback) {

    }

    @Override
    public void unload(Callback<Boolean> callback) {

    }

    @Override
    public void disable(ModelListener listener) {

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
    public KModel<A> setDataBase(KDataBase p_dataBase) {
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
        storage().operationManager().registerOperation(metaOperation, operation);
    }

    @Override
    public KTask task() {
        return new AbstractKTask();
    }

    @Override
    public KTask<Boolean> taskSave() {
        AbstractKTaskWrapper<Boolean> task = new AbstractKTaskWrapper<Boolean>();
        save(task.initCallback());
        return task;
    }

    @Override
    public KTask<Boolean> taskDiscard() {
        AbstractKTaskWrapper<Boolean> task = new AbstractKTaskWrapper<Boolean>();
        discard(task.initCallback());
        return task;
    }

    @Override
    public KTask<Boolean> taskUnload() {
        AbstractKTaskWrapper<Boolean> task = new AbstractKTaskWrapper<Boolean>();
        unload(task.initCallback());
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
