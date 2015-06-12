package org.kevoree.modeling.memory.struct.map;

import org.kevoree.modeling.memory.KMemoryElement;

public interface KLongLongMap extends KMemoryElement {

    boolean contains(long key);

    long get(long key);

    void put(long key, long value);

    void each(KLongLongMapCallBack callback);

    int size();

    void clear();
}
