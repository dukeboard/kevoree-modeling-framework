package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.KObject;

public interface DataCache {

    public void put(String dimension, long time,String path, KObject value, int indexSize);

    public KObject get(String dimension, long time,String path);

    public Object getPayload(String dimension, long time, String key, int index);

    public void putPayload(String dimension, long time, String path, int index, Object payload);

}