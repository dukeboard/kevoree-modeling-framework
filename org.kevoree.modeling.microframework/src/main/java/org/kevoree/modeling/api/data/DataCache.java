package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.time.TimeTree;

public interface DataCache {

    public void put(KDimension dimension, long time,String path, KObject value, int indexSize);

    public KObject get(KDimension dimension, long time,String path);

    public Object getPayload(KDimension dimension, long time, String key, int index);

    public void putPayload(KDimension dimension, long time, String path, int index, Object payload);

    public TimeTree getTimeTree(KDimension dimension, long time, String key);

    public TimeTree putTimeTree(KDimension dimension, long time, String key, TimeTree payload);

}