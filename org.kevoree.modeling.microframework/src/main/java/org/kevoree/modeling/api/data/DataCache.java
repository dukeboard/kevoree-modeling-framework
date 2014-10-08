package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.KObject;

public interface DataCache {

    public void put(String key, KObject value, int indexSize);

    public KObject get(String key);

    public Object getPayload(String key, int index);

    public void putPayload(String key, int index, Object payload);

}