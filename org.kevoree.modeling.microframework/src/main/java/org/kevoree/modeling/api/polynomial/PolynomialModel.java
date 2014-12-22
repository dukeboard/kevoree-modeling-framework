package org.kevoree.modeling.api.polynomial;

/**
 * Created by duke on 10/28/14.
 */
public interface PolynomialModel {

    public double extrapolate(long time);

    public boolean insert(long time, double value);

    public long lastIndex();

    public String save();

    public void load(String payload);

    public boolean isDirty();

}
