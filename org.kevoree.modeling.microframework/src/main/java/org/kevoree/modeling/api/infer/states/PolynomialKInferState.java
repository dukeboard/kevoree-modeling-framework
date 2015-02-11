package org.kevoree.modeling.api.infer.states;

import org.kevoree.modeling.api.KInferState;
import org.kevoree.modeling.api.time.rbtree.LongRBTree;

/**
 * Created by assaad on 10/02/15.
 */
public class PolynomialKInferState extends KInferState {
    private boolean _isDirty = false;

    public long getTimeOrigin() {
        return timeOrigin;
    }

    public void setTimeOrigin(long timeOrigin) {
        this.timeOrigin = timeOrigin;
    }

    public boolean is_isDirty() {
        return _isDirty;
    }

    public long getUnit() {
        return unit;
    }

    public void setUnit(long unit) {
        this.unit = unit;
    }

    private long timeOrigin;
    private long unit;
    private double[] weights;



    @Override
    public String save() {
        String s="";
        StringBuilder sb=new StringBuilder();
        sb.append(timeOrigin+"/");
        sb.append(unit+"/");
        if(weights!=null) {
            for (int i = 0; i < weights.length; i++) {
                sb.append(weights[i]+"/");
            }
            s=sb.toString();
        }

        return s;
    }

    @Override
    public void load(String payload) {
        try {
            String[] previousState = payload.split("/");
            if(previousState.length>0) {
                timeOrigin = Long.parseLong(previousState[0]);
                unit=Long.parseLong(previousState[1]);
                weights = new double[previousState.length];
                for (int i = 2; i < previousState.length; i++) {
                    weights[i] = Double.parseDouble(previousState[i]);
                }
            }

        } catch (Exception e) {
        }
        _isDirty = false;
    }

    @Override
    public boolean isDirty() {
        return _isDirty;
    }

    public void set_isDirty(boolean value){
        _isDirty=value;
    }


    @Override
    public KInferState cloneState() {
        PolynomialKInferState cloned = new PolynomialKInferState();
        double[] clonearray=new double[weights.length];
        for(int i=0; i<weights.length;i++){
            clonearray[i]=weights[i];
        }
        cloned.setWeights(clonearray);
        return cloned;
    }

    public double[] getWeights() {
        return weights;
    }

    public void setWeights(double[] weights) {
        this.weights = weights;
        _isDirty=true;
    }
}
