package org.kevoree.modeling.api.infer;

import org.kevoree.modeling.api.Callback;

/**
 * Created by duke on 19/01/15.
 */
public interface KInferRanking {

    public void propose(Callback<Integer> callback);

    public void learn(Callback<Throwable> callback);

    public void setTrainingQuery(String query);

    public void setExtrapolationQuery(String query);

}
