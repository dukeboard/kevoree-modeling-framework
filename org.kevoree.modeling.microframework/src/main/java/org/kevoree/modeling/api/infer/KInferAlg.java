package org.kevoree.modeling.api.infer;

import org.kevoree.modeling.api.Callback;

/**
 * Created by duke on 20/01/15.
 */
public interface KInferAlg {

    public void learn(Object[] inputs, Object[] results, Callback<Throwable> callback);

    public void infer(Object[] inputs, Callback<Object[]> callback);

    public String save();

    public void load(String payload);

    public boolean isDirty();

}
