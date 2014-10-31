package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KUniverse;
import org.kevoree.modeling.api.data.DefaultKStore;
import org.kevoree.modeling.api.data.KDataBase;
import org.kevoree.modeling.api.data.KStore;
import org.kevoree.modeling.api.ModelListener;

/**
 * Created by duke on 10/10/14.
 */
public abstract class AbstractKUniverse<A extends KDimension> implements KUniverse<A> {

    private final KStore _storage;

    protected AbstractKUniverse(KDataBase kDataBase) {
        _storage = new DefaultKStore(kDataBase);
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
                callback.on(newDimension);
            }
        });
    }

    protected abstract A internal_create(long key);

    @Override
    public void dimension(long key, final Callback<A> callback) {
        A existingDimension = (A) _storage.getDimension(key);
        if (existingDimension != null) {
            callback.on(existingDimension);
        } else {
            final A newDimension = internal_create(key);
            storage().initDimension(newDimension, new Callback<Throwable>() {
                @Override
                public void on(Throwable throwable) {
                    callback.on(newDimension); //TODO manage error
                }
            });
        }
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
    public void listen(ModelListener listener, Long from, Long to, String path) {

    }

    @Override
    public void disable(ModelListener listener) {

    }

    @Override
    public void stream(String query, Callback<KObject> callback) {

    }

    public void listen(ModelListener listener) {
        storage().registerListener(this, listener);
    }

}
