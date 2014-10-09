package org.kevoree.modeling.api.util;

import org.kevoree.modeling.api.Callback;

/**
 * Created by duke on 10/8/14.
 */
public interface CallBackChain<A> {

    public void on(A a,Callback<Throwable> next);

}
