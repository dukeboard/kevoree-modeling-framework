package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KUniverse;
import org.kevoree.modeling.api.KOperation;
import org.kevoree.modeling.api.data.DefaultKStore;
import org.kevoree.modeling.api.data.KDataBase;
import org.kevoree.modeling.api.data.KStore;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.event.KEventBroker;
import org.kevoree.modeling.api.meta.MetaModel;
import org.kevoree.modeling.api.meta.MetaOperation;

/**
 * Created by duke on 10/10/14.
 */
public abstract class AbstractKUniverse<A extends KDimension> implements KUniverse<A> {

    private final KStore _storage;

    public abstract MetaModel metaModel();

    protected AbstractKUniverse() {
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
    public A newDimension() {
        long nextKey = _storage.nextDimensionKey();
        final A newDimension = internal_create(nextKey);
        storage().initDimension(newDimension);
        return newDimension;
    }

    protected abstract A internal_create(long key);

    @Override
    public A dimension(long key) {
        A newDimension = internal_create(key);
        storage().initDimension(newDimension);
        return newDimension;
    }

    @Override
    public void saveAll(Callback<Boolean> callback) {

    }

    @Override
    public void deleteAll(Callback<Boolean> callback) {

    }

    @Override
    public void unloadAll(Callback<Boolean> callback) {

    }

    @Override
    public void disable(ModelListener listener) {

    }

    @Override
    public void stream(String query, Callback<KObject> callback) {

    }

    @Override
    public void listen(ModelListener listener) {
        storage().eventBroker().registerListener(this, listener, null);
    }

    @Override
    public KUniverse<A> setEventBroker(KEventBroker eventBroker) {
        storage().setEventBroker(eventBroker);
        eventBroker.setMetaModel(metaModel());
        return this;
    }

    @Override
    public KUniverse<A> setDataBase(KDataBase dataBase) {
        storage().setDataBase(dataBase);
        return this;
    }


    @Override
    public void setOperation(MetaOperation metaOperation, KOperation operation) {
        storage().operationManager().registerOperation(metaOperation, operation);
    }
}
