package org.kevoree.modeling.api.polynomial;

/**
 * Created by duke on 10/28/14.
 */
public abstract class PolynomialModel {

    public abstract double extrapolate(long time);

    public abstract boolean insert(long time, double value);

    public abstract long lastIndex();

    public abstract long indexBefore(long time);

    public abstract long[] timesAfter(long time);

    public abstract String save();

    public abstract void load(String payload);

    public abstract boolean isDirty();

}
