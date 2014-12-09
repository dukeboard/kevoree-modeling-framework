package org.kevoree.modeling.api;

/**
 * Created by duke on 09/12/14.
 */
public interface KInfer<A> extends KObject {

    public void infer(Callback<A> callback);

    public void learn(A param, Callback<Throwable> callback);

}
