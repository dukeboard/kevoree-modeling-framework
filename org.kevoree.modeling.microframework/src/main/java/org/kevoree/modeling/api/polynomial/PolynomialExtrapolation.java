package org.kevoree.modeling.api.polynomial;

/**
 * Created by duke on 10/28/14.
 */
public interface PolynomialExtrapolation {

    public String save();

    public void load(String payload);

    public double extrapolate(long time);

    public boolean insert(long time, double value);

}
