package org.kevoree.modeling.api;

/**
 * Created by duke on 09/12/14.
 * TODO consider some strategy to avoid the boxing
 */
public interface KInfer extends KObject {

    /**
     * @param expectedResultSet can be null in case of unsuperviseLearning
     * @param trainingSet       represent the training set, the first array represent the samples, the second array represent the features
     */
    public void train(Object[][] trainingSet, Object[] expectedResultSet, Callback<Throwable> callback);

    public Object infer(Object[] features);

    public Object accuracy(Object[][] testSet, Object[] expectedResultSet);

    public void clear();

}
