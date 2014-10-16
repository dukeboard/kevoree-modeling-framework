package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.time.TimeTree;

public interface DataCache {

    public void put(KDimension dimension, long time, String path, KObject value);

    public KObject get(KDimension dimension, long time, String path);

    public Object getPayload(KDimension dimension, long time, String path, int index);

    public Object[] getAllPayload(KDimension dimension, long time, String path);

    public void putPayload(KDimension dimension, long time, String path, int index, Object payload);

    public void putAllPayload(KDimension dimension, long time, String path, Object[] payload);

    public TimeTree getTimeTree(KDimension dimension, String path);

    public void putTimeTree(KDimension dimension, String path, TimeTree payload);


}