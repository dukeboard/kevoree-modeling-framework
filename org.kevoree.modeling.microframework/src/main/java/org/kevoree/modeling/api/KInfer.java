package org.kevoree.modeling.api;

import org.kevoree.modeling.api.meta.Meta;

/**
 * Created by duke on 09/12/14.
 */
public interface KInfer extends KObject {

    public Meta type();

    public KObject[] trainingSet();

    public void train(KObject[] trainingSet, Callback<Throwable> callback);

    public void learn();

    public Object infer(KObject origin);

}
