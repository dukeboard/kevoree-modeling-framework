package org.kevoree.modeling;

public interface KOperation {

    void on(KObject source, Object[] params, Callback<Object> result);

}
