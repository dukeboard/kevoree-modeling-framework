package org.kevoree.modeling.memory.struct.map;

public interface KLongLongHashMap {

    long get(long key);

    void put(long key, long value);

    void each(KLongLongHashMapCallBack callback);

}
