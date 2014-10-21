package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.time.TimeTree;

import java.util.List;
import java.util.Set;

/**
 * Created by duke on 10/17/14.
 */
public interface KStore {

    void lookup(KView originView, long key, Callback<KObject> callback);

    void lookupAll(KView originView, Set<Long> key, Callback<List<KObject>> callback);

    Object[] raw(KObject origin, long key, boolean write);

    public void save(KDimension dimension, Callback<Throwable> callback);

    public void saveUnload(KDimension dimension, Callback<Throwable> callback);

    public void discard(KDimension dimension, Callback<Throwable> callback);

    public void delete(KDimension dimension, Callback<Throwable> callback);

    public TimeTree timeTree(KDimension dimension, long key);

    public void initKObject(KObject obj, KView originView);

    public void initDimension(KDimension dimension);

    long nextDimensionKey();

    long nextObjectKey();

    KDimension getDimension(long key);

}
