package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.*;

/**
 * Created by duke on 10/10/14.
 */
public abstract class AbstractKUniverse<A extends KView, B extends KUniverse, C extends KModel> implements KUniverse<A, B, C> {

    private KModel _model;

    private long _key;

    protected AbstractKUniverse(KModel p_model, long p_key) {
        this._model = p_model;
        this._key = p_key;
    }

    @Override
    public long key() {
        return _key;
    }

    @Override
    public C model() {
        return (C) _model;
    }

    @Override
    public void save(Callback<Throwable> callback) {
        model().storage().save(this, callback);
    }

    @Override
    public void unload(Callback<Throwable> callback) {
        //TODO
        model().storage().saveUnload(this, callback);
    }

    @Override
    public void delete(Callback<Throwable> callback) {
        model().storage().delete(this, callback);
    }

    @Override
    public void discard(Callback<Throwable> callback) {
        model().storage().discard(this, callback);
    }

    @Override
    public synchronized A time(long timePoint) {
        return internal_create(timePoint);
    }

    @Override
    public void listen(ModelListener listener) {
        model().storage().eventBroker().registerListener(this, listener, null);
    }

    @Override
    public void listenAllTimes(KObject target, ModelListener listener) {
        model().storage().eventBroker().registerListener(this, listener, target);
    }

    protected abstract A internal_create(Long timePoint);

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof AbstractKUniverse)) {
            return false;
        } else {
            AbstractKUniverse casted = (AbstractKUniverse) obj;
            return casted._key == _key;
        }
    }

    @Override
    public void origin(Callback<B> callback) {
        //TODO
    }

    @Override
    public void split(Callback<B> callback) {
        //TODO
    }

    @Override
    public void descendants(Callback<B[]> callback) {
        //TODO
    }

    @Override
    public KTask<B> taskSplit() {
        AbstractKTaskWrapper<B> task = new AbstractKTaskWrapper<B>();
        split(task.initCallback());
        return task;
    }

    @Override
    public KTask<B> taskOrigin() {
        AbstractKTaskWrapper<B> task = new AbstractKTaskWrapper<B>();
        origin(task.initCallback());
        return task;
    }

    @Override
    public KTask<B[]> taskDescendants() {
        AbstractKTaskWrapper<B[]> task = new AbstractKTaskWrapper<B[]>();
        descendants(task.initCallback());
        return task;
    }

    @Override
    public KTask<Throwable> taskSave() {
        AbstractKTaskWrapper<Throwable> task = new AbstractKTaskWrapper<Throwable>();
        save(task.initCallback());
        return task;
    }

    @Override
    public KTask<Throwable> taskUnload() {
        AbstractKTaskWrapper<Throwable> task = new AbstractKTaskWrapper<Throwable>();
        unload(task.initCallback());
        return task;
    }

    @Override
    public KTask<Throwable> taskDelete() {
        AbstractKTaskWrapper<Throwable> task = new AbstractKTaskWrapper<Throwable>();
        delete(task.initCallback());
        return task;
    }

    @Override
    public KTask<Throwable> taskDiscard() {
        AbstractKTaskWrapper<Throwable> task = new AbstractKTaskWrapper<Throwable>();
        discard(task.initCallback());
        return task;
    }
}
