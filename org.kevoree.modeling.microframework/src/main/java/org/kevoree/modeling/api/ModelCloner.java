package org.kevoree.modeling.api;

/**
 * Created by duke on 9/30/14.
 */

public interface ModelCloner<A extends KObject> {

    public void clone(A o, Callback<A> callback);

}