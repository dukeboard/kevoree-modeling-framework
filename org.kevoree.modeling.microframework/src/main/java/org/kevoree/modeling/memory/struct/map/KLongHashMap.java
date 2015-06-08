package org.kevoree.modeling.memory.struct.map;

public interface KLongHashMap<V> {

    V get(long key);

    void put(long key, V value);

    void each(KLongHashMapCallBack<V> callback);

    int size();

    void clear();

}
