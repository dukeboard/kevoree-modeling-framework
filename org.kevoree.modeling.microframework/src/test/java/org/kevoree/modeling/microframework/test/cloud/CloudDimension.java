package org.kevoree.modeling.microframework.test.cloud;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KUnivers;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.abs.AbstractKDimension;
import org.kevoree.modeling.api.time.TimeTree;

import java.util.Set;

/**
 * Created by duke on 10/13/14.
 */
public class CloudDimension extends AbstractKDimension {

    protected CloudDimension(KUnivers manager, String key) {
        super(manager, key);
    }

    @Override
    public void parent(Callback<KDimension> callback) {

    }

    @Override
    public void children(Callback<Set<KDimension>> callback) {

    }

    @Override
    public void fork(Callback<KDimension> callback) {

    }

    @Override
    public void save(Callback<Boolean> callback) {

    }

    @Override
    public void delete(Callback<Boolean> callback) {

    }

    @Override
    public void unload(Callback<Boolean> callback) {

    }

    @Override
    public KView time(Long timePoint) {
        return null;
    }

    @Override
    public TimeTree globalTimeTree() {
        return null;
    }

    @Override
    public TimeTree timeTree(String path) {
        return null;
    }

}
