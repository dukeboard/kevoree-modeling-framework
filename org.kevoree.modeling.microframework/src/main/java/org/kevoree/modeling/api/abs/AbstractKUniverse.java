package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KUniverse;
import org.kevoree.modeling.api.OperationCallback;
import org.kevoree.modeling.api.data.DefaultKStore;
import org.kevoree.modeling.api.data.KDataBase;
import org.kevoree.modeling.api.data.KStore;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.event.KEventBroker;
import org.kevoree.modeling.api.event.ListenerScope;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaOperation;

/**
 * Created by duke on 10/10/14.
 */
public abstract class AbstractKUniverse<A extends KDimension> implements KUniverse<A> {

    private final KStore _storage;

    protected AbstractKUniverse() {
        _storage = new DefaultKStore();
    }

    @Override
    public KStore storage() {
        return _storage;
    }

    @Override
    public void newDimension(final Callback<A> callback) {
        long nextKey = _storage.nextDimensionKey();
        final A newDimension = internal_create(nextKey);
        storage().initDimension(newDimension, new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                if (throwable != null) {
                    callback.on(newDimension);
                } else {
                    throwable.printStackTrace();
                    //TODO clean newCreatedDimension
                    callback.on(null);
                }
            }
        });
    }

    protected abstract A internal_create(long key);

    @Override
    public void dimension(long key, final Callback<A> callback) {
        final A newDimension = internal_create(key);
        storage().initDimension(newDimension, new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                if (throwable != null) {
                    throwable.printStackTrace();
                }
                callback.on(newDimension); //TODO manage error
            }
        });
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
    public void listen(ModelListener listener, ListenerScope scope) {
        storage().eventBroker().registerListener(this, listener, scope);
    }

    @Override
    public KUniverse<A> setEventBroker(KEventBroker eventBroker) {
        storage().setEventBroker(eventBroker);
        return this;
    }

    @Override
    public KUniverse<A> setDataBase(KDataBase dataBase) {
        storage().setDataBase(dataBase);
        return this;
    }


    @Override
    public void setOperation(MetaClass clazz, MetaOperation operation, OperationCallback callback) {
        storage().eventBroker().registerOperation(clazz, operation, callback);
    }
}
