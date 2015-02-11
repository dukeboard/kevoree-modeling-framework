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
public class PolynomialOfflineKInfer extends AbstractKObjectInfer {

    public int maxDegree =20;

    public double getToleratedErr() {
        return toleratedErr;
    }

    public void setToleratedErr(double toleratedErr) {
        this.toleratedErr = toleratedErr;
    }

    public int getMaxDegree() {
        return maxDegree;
    }

    public void setMaxDegree(int maxDegree) {
        this.maxDegree = maxDegree;
    }

    public double toleratedErr=0.01;



    public PolynomialOfflineKInfer(KView p_view, long p_uuid, TimeTree p_timeTree, MetaClass p_metaClass) {
        super(p_view, p_uuid, p_timeTree, p_metaClass);
    }


    private double calculate (long time,  double[] weights, long timeOrigin, long unit) {
       double t= ((double)(time-timeOrigin))/unit;
       return calculate(weights,t);
    }

    private double calculate(double[] weights, double t) {
        double result=0;
        double power=1;
        for(int j=0;j<weights.length;j++){
            result+= weights[j]*power;
            power=power*t;
        }
        return result;
    }




    @Override
    public void train(Object[][] trainingSet, Object[] expectedResultSet, Callback<Throwable> callback) {
        DoubleArrayKInferState currentState = (DoubleArrayKInferState) modifyState();
        double[] weights=currentState.getWeights();

        int featuresize=trainingSet[0].length;

        if(weights==null){
        }

        long[] times=new long[trainingSet.length];
        double[] results = new double[expectedResultSet.length];

        for(int i=0;i<trainingSet.length;i++){
            times[i] = (Long) trainingSet[i][0];
            results[i]=(double) expectedResultSet[i];
        }



    }

    @Override
    public Object infer(Object[] features) {
        DoubleArrayKInferState currentState = (DoubleArrayKInferState) readOnlyState();


        return 0;


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