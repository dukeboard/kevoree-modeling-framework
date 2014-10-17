package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KUniverse;
import org.kevoree.modeling.api.data.DefaultKStore;
import org.kevoree.modeling.api.data.KDataBase;
import org.kevoree.modeling.api.data.KStore;
import org.kevoree.modeling.api.events.ModelElementListener;

/**
 * Created by duke on 10/10/14.
 */
public abstract class AbstractKUniverse<A extends KDimension> implements KUniverse<A> {

    private final KStore storage;

    protected AbstractKUniverse(KDataBase kDataBase) {
        storage = new DefaultKStore(kDataBase);
        //TODO load previous existing and open dimensions
    }

    @Override
    public KStore storage() {
        return storage;
    }

    @Override
    public synchronized A create() {
        long nextKey = storage.nextDimensionKey();
        A newDimension = internal_create(nextKey);
        storage().initDimension(newDimension);
        return newDimension;
    }

    protected abstract A internal_create(long key);

    @Override
    public A get(long key) {
        return (A) storage.getDimension(key);
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
    public void listen(ModelElementListener listener, Long from, Long to, String path) {

    }

    @Override
    public void disable(ModelElementListener listener) {

    }

    @Override
    public void stream(String query, Callback<KObject> callback) {

    }

}
