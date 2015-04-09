package org.kevoree.modeling.api.map;

/**
 * Created by duke on 04/03/15.
 */
public interface IntHashMapCallBack<V> {

    void on(int key, V value);

}
