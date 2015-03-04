package org.kevoree.modeling.api.map;

/**
 * Created by duke on 04/03/15.
 */
public interface LongLongHashMapCallBack<V> {

    public void on(long key, long value);

}
