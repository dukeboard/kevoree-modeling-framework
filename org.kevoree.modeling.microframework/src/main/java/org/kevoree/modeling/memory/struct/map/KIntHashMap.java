package org.kevoree.modeling.memory.struct.map;

public interface KIntHashMap<V> {

    V get(int key);

    void put(int key, V value);

    void each(KLongHashMapCallBack<V> callback);

}
