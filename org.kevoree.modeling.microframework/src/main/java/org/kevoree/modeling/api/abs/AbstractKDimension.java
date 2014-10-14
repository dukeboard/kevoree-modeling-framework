package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KUnivers;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.api.time.impl.DefaultTimeTree;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * Created by duke on 10/10/14.
 */
public abstract class AbstractKDimension<A extends KView, B extends KDimension, C extends KUnivers> implements KDimension<A, B, C> {

    private KUnivers univers;

    private String key;

    protected AbstractKDimension(KUnivers univers, String key) {
        this.univers = univers;
        this.key = key;
    }

    @Override
    public String key() {
        return key;
    }

    @Override
    public C univers() {
        return (C) univers;
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

    private TimeTree globalTimeTree = new DefaultTimeTree(); //TODO

    @Override
    public TimeTree globalTimeTree() {
        return globalTimeTree;
    }

    @Override
    public TimeTree timeTree(String path) {
        return null;
    }

    @Override
    public void parent(Callback<B> callback) {

    }

    @Override
    public void children(Callback<Set<B>> callback) {

    }

    @Override
    public void fork(Callback<B> callback) {

    }

    private Map<Long, A> timesCache = new HashMap<Long, A>();

    @Override
    public synchronized A time(Long timePoint) {
        if (timesCache.containsKey(timePoint)) {
            return timesCache.get(timePoint);
        } else {
            A newCreatedTime = internal_create(timePoint);
            timesCache.put(timePoint,newCreatedTime);
            return newCreatedTime;
        }
    }

    protected abstract A internal_create(Long timePoint);

}
