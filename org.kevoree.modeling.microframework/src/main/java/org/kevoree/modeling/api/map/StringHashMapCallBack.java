package org.kevoree.modeling.api.map;

/**
 * Created by duke on 04/03/15.
 */
public interface StringHashMapCallBack<V> {

    void on(String key, V value);

}
