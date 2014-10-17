package org.kevoree.modeling.api;

import org.kevoree.modeling.api.time.TimeTree;

import java.util.Set;

/**
 * Created by duke on 9/30/14.
 */

public interface KDimension<A extends KView, B extends KDimension, C extends KUniverse> {

    public long key();

    public void parent(Callback<B> callback);

    public void children(Callback<Set<B>> callback);

    public void fork(Callback<B> callback);

    public void save(Callback<Boolean> callback);

    public void delete(Callback<Boolean> callback);

    public void unload(Callback<Boolean> callback);

    public A time(Long timePoint);

    public TimeTree globalTimeTree();

    public TimeTree timeTree(String path);

    public C universe();

}
