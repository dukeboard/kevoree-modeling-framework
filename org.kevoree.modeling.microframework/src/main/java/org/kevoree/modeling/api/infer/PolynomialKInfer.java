package org.kevoree.modeling.api.infer;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KInferState;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.abs.AbstractKObjectInfer;
import org.kevoree.modeling.api.infer.states.DoubleArrayKInferState;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.time.TimeTree;

/**
 * Created by assaad on 11/02/15.
 */
public class PolynomialKInfer extends AbstractKObjectInfer {





    public PolynomialKInfer(KView p_view, long p_uuid, TimeTree p_timeTree, MetaClass p_metaClass) {
        super(p_view, p_uuid, p_timeTree, p_metaClass);
    }

    private double calculate(double[] weights, double[] features) {
        double result=0;
        for(int i=0;i<features.length;i++){
            result+=weights[i]*features[i];
        }
        result+=weights[features.length];
        return result;
    }




    @Override
    public void train(Object[][] trainingSet, Object[] expectedResultSet, Callback<Throwable> callback) {
        DoubleArrayKInferState currentState = (DoubleArrayKInferState) modifyState();
        double[] weights=currentState.getWeights();

        int featuresize=trainingSet[0].length;

        if(weights==null){
            weights=new double[featuresize+1];
        }


    }

    @Override
    public Object infer(Object[] features) {
        DoubleArrayKInferState currentState = (DoubleArrayKInferState) readOnlyState();
        double[] weights=currentState.getWeights();
        double[] ft=new double[features.length];
        for(int i=0;i<features.length;i++){
            ft[i]=(double)features[i];
        }
        return calculate(weights,ft);


    }

    @Override
    public Object accuracy(Object[][] testSet, Object[] expectedResultSet) {
        return null;
    }

    @Override
    public void clear() {
        DoubleArrayKInferState currentState = (DoubleArrayKInferState) modifyState();
        currentState.setWeights(null);
    }

    @Override
    public KInferState createEmptyState() {
        return new DoubleArrayKInferState();
    }
}