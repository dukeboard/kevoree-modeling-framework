package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KUnivers;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.time.TimeTree;

import java.util.Set;

/**
 * Created by duke on 10/10/14.
 */
public abstract class AbstractKDimension<A extends KView, B extends KDimension, C extends KUnivers> implements KDimension<A, B,C> {

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

    @Override
    public TimeTree globalTimeTree() {
        return null;
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

    @Override
    public A time(Long timePoint) {
        return null;
    }

}
