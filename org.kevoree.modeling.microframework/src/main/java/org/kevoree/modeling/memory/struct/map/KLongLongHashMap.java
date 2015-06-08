package org.kevoree.modeling.memory.struct.map;

import org.kevoree.modeling.memory.KMemoryElement;

public interface KLongLongHashMap extends KMemoryElement {

    long get(long key);

    void put(long key, long value);

    void each(KLongLongHashMapCallBack callback);

    int size();

    void clear();
}
