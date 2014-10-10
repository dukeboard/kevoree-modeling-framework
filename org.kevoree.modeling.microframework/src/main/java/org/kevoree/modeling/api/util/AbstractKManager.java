package org.kevoree.modeling.api.util;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KManager;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.events.ModelElementListener;

/**
 * Created by duke on 10/10/14.
 */
public abstract class AbstractKManager implements KManager {
    @Override
    public KDimension create() {
        return null;
    }

    @Override
    public KDimension get(String key) {
        return null;
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
