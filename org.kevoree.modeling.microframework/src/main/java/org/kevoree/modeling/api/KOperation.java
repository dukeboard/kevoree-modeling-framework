package org.kevoree.modeling.api;

public interface KOperation {

    void on(KObject source, Object[] params, Callback<Object> result);

}
