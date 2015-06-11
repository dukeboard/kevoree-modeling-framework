package org.kevoree.modeling.memory.struct.map;

public interface KIntHashMap<V> {

    boolean contains(int key);

    V get(int key);

    void put(int key, V value);

    void each(KLongHashMapCallBack<V> callback);

}
