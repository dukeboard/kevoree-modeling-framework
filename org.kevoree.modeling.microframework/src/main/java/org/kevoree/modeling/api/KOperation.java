package org.kevoree.modeling.api;

/**
 * Created by gregory.nain on 27/11/14.
 */
public interface KOperation {

    void on(KObject source, Object[] params, Callback<Object> result);

}
