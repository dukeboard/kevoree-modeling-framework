package org.kevoree.modeling.api.infer.states;

import org.kevoree.modeling.api.KInferState;

/**
 * Created by duke on 10/02/15.
 */
public class AnalyticKInferState extends KInferState {

    private boolean _isDirty = false;


    private double sum = 0;
    private int nb = 0;

    public double getMin() {
        return min;
    }

    public void setMin(double min) {
        _isDirty=true;
        this.min = min;
    }

    public boolean is_isDirty() {
        return _isDirty;
    }

    public void set_isDirty(boolean _isDirty) {
        this._isDirty = _isDirty;
    }

    public double getMax() {
        return max;
    }

    public void setMax(double max) {
        _isDirty=true;
        this.max = max;
    }

    private double min;
    private double max;

    public int getNb() {
        return nb;
    }

    public void setNb(int nb) {
        _isDirty = true;
        this.nb = nb;
    }

    public double getSum() {
        return sum;
    }

    public void setSum(double sum) {
        _isDirty = true;
        this.sum = sum;
    }



    @Override
    public String save() {
        return sum + "/" + nb;
    }

    @Override
    public void load(String payload) {
        try {
            String[] previousState = payload.split("/");
            sum = Double.parseDouble(previousState[0]);
            nb = Integer.parseInt(previousState[1]);
        } catch (Exception e) {
            sum = 0;
            nb = 0;
        }
        _isDirty = false;
    }

    @Override
    public boolean isDirty() {
        return _isDirty;
    }

    @Override
    public KInferState cloneState() {
        AnalyticKInferState cloned = new AnalyticKInferState();
        cloned.setNb(getNb());
        cloned.setSum(getSum());
        return cloned;
    }
}
