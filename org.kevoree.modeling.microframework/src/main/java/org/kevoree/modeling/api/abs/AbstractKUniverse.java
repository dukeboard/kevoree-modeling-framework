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
    public void newDimension(Callback<A> callback) {
        long nextKey = storage.nextDimensionKey();
        A newDimension = internal_create(nextKey);
        storage().initDimension(newDimension);
        callback.on(newDimension);
    }

    protected abstract A internal_create(long key);

    @Override
    public void dimension(long key, Callback<A> callback) {
        A existingDimension = (A) storage.getDimension(key);
        if(existingDimension != null){
            callback.on(existingDimension);
        } else {
            A newDimension = internal_create(key);
            storage().initDimension(newDimension);
            callback.on(newDimension);
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
    public void listen(ModelElementListener listener, Long from, Long to, String path) {

    }

    @Override
    public void disable(ModelElementListener listener) {

    }

    @Override
    public void stream(String query, Callback<KObject> callback) {

    }

}
