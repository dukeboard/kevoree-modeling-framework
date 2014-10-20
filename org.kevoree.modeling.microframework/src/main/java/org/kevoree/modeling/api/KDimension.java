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

    public void save(Callback<Throwable> callback);

    public void saveUnload(Callback<Throwable> callback);

    public void delete(Callback<Throwable> callback);

    public void discard(Callback<Throwable> callback);

    public A time(Long timePoint);

    public TimeTree globalTimeTree();

    public TimeTree timeTree(String path);

    public C universe();

}
