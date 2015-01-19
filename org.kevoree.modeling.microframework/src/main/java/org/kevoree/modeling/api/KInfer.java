package org.kevoree.modeling.api;

/**
 * Created by duke on 09/12/14.
 */
public interface KInfer extends KObject {

    public void learn(Object[] inputs, Object[] results, Callback<Throwable> callback);

    public void infer(Object[] inputs, Callback<Object[]> callback);
    
}
