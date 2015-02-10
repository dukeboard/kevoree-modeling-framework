package org.kevoree.modeling.api.infer;

import org.kevoree.modeling.api.KInferState;

/**
 * Created by duke on 10/02/15.
 */
public class AverageKInferState extends KInferState {

    private boolean _isDirty = false;

    private double sum = 0;

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

    private int nb = 0;

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
        AverageKInferState cloned = new AverageKInferState();
        cloned.setNb(getNb());
        cloned.setSum(getSum());
        return cloned;
    }
}
