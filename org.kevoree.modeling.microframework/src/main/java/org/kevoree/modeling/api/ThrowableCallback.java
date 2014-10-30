package org.kevoree.modeling.api;

/**
 * Created by duke on 10/2/14.
 */
public interface ThrowableCallback<A> {

    public void on(A a, Throwable error);

}
