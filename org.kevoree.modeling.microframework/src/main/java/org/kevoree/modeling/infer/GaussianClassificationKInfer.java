package org.kevoree.modeling.infer;

import org.kevoree.modeling.Callback;
import org.kevoree.modeling.KInferState;
import org.kevoree.modeling.abs.AbstractKObjectInfer;
import org.kevoree.modeling.memory.KDataManager;
import org.kevoree.modeling.infer.states.GaussianArrayKInferState;
import org.kevoree.modeling.meta.MetaClass;

/**
 * Created by assaad on 13/02/15.
 */
public class GaussianClassificationKInfer extends AbstractKObjectInfer {


    public GaussianClassificationKInfer(long p_universe, long p_time, long p_uuid, MetaClass p_metaClass, KDataManager p_manager) {
        super(p_universe, p_time, p_uuid, p_metaClass, p_manager);
    }

    public double getAlpha() {
        return alpha;
    }

    public void setAlpha(double alpha) {
        this.alpha = alpha;
    }

    /**
     * @param alpha is the learning rate of the linear regression
     */
    private double alpha = 0.05;


    @Override
    public void train(Object[][] trainingSet, Object[] expectedResultSet, Callback<Throwable> callback) {
        GaussianArrayKInferState currentState = (GaussianArrayKInferState) modifyState();
        int featuresize = trainingSet[0].length;


        double[][] features = new double[trainingSet.length][];
        boolean[] results = new boolean[expectedResultSet.length];

        for (int i = 0; i < trainingSet.length; i++) {
            features[i] = new double[featuresize];
            for (int j = 0; j < featuresize; j++) {
                features[i][j] = (double) trainingSet[i][j];
            }
            results[i] = (boolean) expectedResultSet[i];
            currentState.train(features[i], results[i], alpha);
        }
    }

    @Override
    public Object infer(Object[] features) {
        GaussianArrayKInferState currentState = (GaussianArrayKInferState) readOnlyState();
        double[] ft = new double[features.length];
        for (int i = 0; i < features.length; i++) {
            ft[i] = (double) features[i];
        }
        return currentState.infer(ft);
    }

    @Override
    public Object accuracy(Object[][] testSet, Object[] expectedResultSet) {
        return null;
    }

    @Override
    public void clear() {

    }

    @Override
    public KInferState createEmptyState() {
        return null;
    }
}
