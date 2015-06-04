package org.kevoree.modeling.memory.struct.map;

/**
 * Created by duke on 04/03/15.
 */
public interface KIntHashMapCallBack<V> {

    void on(int key, V value);

}
