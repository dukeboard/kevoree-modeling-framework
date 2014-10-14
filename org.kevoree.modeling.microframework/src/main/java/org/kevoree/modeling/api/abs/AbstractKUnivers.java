package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KUnivers;
import org.kevoree.modeling.api.data.DataCache;
import org.kevoree.modeling.api.data.DataStore;
import org.kevoree.modeling.api.data.DefaultMemoryCache;
import org.kevoree.modeling.api.events.ModelElementListener;

import java.util.HashMap;

/**
 * Created by duke on 10/10/14.
 */
public abstract class AbstractKUnivers<A extends KDimension> implements KUnivers<A> {

    private HashMap<String, A> dimensions = new HashMap<String, A>();

    private DataStore dataStore;

    private final DataCache dataCache = new DefaultMemoryCache();

    protected AbstractKUnivers(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @Override
    public DataStore dataStore() {
        return dataStore;
    }

    @Override
    public DataCache dataCache() {
        return dataCache;
    }

    @Override
    public A create() {
        return null;
    }

    @Override
    public A get(String key) {
        return (A) dimensions.get(key);
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
