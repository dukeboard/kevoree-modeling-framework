package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.time.TimeTree;

import java.util.List;
import java.util.Set;

/**
 * Created by duke on 10/17/14.
 */
public interface KStore {

    void lookup(KDimension dimension, long time, long key, Callback<KObject> callback);

    void lookupAll(KDimension dimension, long time, Set<Long> key, Callback<List<KObject>> callback);

    KObject cacheLookup(KDimension dimension, long time, long key);

    List<KObject> cacheLookupAll(KDimension dimension, long time, Set<Long> path);

    Object[] raw(KDimension dimension, long time, long key);

    public void saveUnload(KDimension dimension);

    public void discard(KDimension dimension);

    public void delete(KDimension dimension);

    public TimeTree timeTree(KDimension dimension, long key);

    public void initKObject(KObject obj, KDimension currentDim, long currentNow);

    public void initDimension(KDimension dimension);

    long nextDimensionKey();

    long nextObjectKey();

    KDimension getDimension(long key);

}
