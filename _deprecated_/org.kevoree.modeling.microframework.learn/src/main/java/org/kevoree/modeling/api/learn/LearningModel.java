package org.kevoree.modeling.api.learn;

/**
 * Created by duke on 8/25/14.
 */
public interface LearningModel {

    public double getLastValue();

    public void setLastValue(double newVal);

    public boolean feed(double value, long time);

    public double evaluate(long time);

    public byte[] save();

    public void load(byte[] payload);

}
