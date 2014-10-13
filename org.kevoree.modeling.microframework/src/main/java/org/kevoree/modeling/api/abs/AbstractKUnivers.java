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
public abstract class AbstractKUnivers implements KUnivers {

    private HashMap<String, KDimension> dimensions = new HashMap<String, KDimension>();

    private DataStore dataStore;

    private final DataCache dataCache = new DefaultMemoryCache();

    protected AbstractKUnivers(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @Override
    public KDimension create() {
        return null;
    }

    @Override
    public KDimension get(String key) {
        return dimensions.get(key);
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
