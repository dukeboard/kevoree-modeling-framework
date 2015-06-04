package org.kevoree.modeling;

public interface KThrowableCallback<A> {

    void on(A a, Throwable error);

}
