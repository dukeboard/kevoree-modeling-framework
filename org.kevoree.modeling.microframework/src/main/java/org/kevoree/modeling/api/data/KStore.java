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

    public enum AccessMode {
        READ, WRITE;
    }

    Object[] raw(KObject origin, AccessMode accessMode);

    public void save(KDimension dimension, Callback<Throwable> callback);

    public void saveUnload(KDimension dimension, Callback<Throwable> callback);

    public void discard(KDimension dimension, Callback<Throwable> callback);

    public void delete(KDimension dimension, Callback<Throwable> callback);

    public void timeTree(KDimension dimension, long key, Callback<TimeTree> callback);

    public void timeTrees(KDimension dimension, long[] keys, Callback<TimeTree[]> callback);

    public void initKObject(KObject obj, KView originView);

    public void initDimension(KDimension dimension, Callback<Throwable> callback);

    long nextDimensionKey();

    long nextObjectKey();

    KDimension getDimension(long key);

    public void getRoot(KView originView, Callback<KObject> callback);

    public void setRoot(KObject newRoot);

}
