package org.kevoree.modeling.memory.struct.map;

public interface KStringHashMap<V> {

    V get(String key);

    void put(String key, V value);

    void each(KStringHashMapCallBack<V> callback);

    int size();

    void clear();

    boolean containsKey(String key);

}
