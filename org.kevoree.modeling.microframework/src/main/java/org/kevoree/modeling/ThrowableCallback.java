package org.kevoree.modeling;

public interface ThrowableCallback<A> {

    void on(A a, Throwable error);

}
