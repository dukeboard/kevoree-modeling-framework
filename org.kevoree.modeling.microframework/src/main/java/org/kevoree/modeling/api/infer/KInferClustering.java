package org.kevoree.modeling.api.infer;

import org.kevoree.modeling.api.Callback;

/**
 * Created by duke on 19/01/15.
 */
public interface KInferClustering {

    public void classify(Callback<Integer> callback);

    public void learn(Callback<Throwable> callback);

}
