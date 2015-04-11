package org.kevoree.modeling.api;

public interface ThrowableCallback<A> {

    void on(A a, Throwable error);

}
