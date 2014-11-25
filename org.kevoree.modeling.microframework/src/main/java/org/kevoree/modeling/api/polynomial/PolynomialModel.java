package org.kevoree.modeling.api.polynomial;

import org.kevoree.modeling.api.extrapolation.ExtrapolationModel;

/**
 * Created by duke on 10/28/14.
 */
public abstract class PolynomialModel extends ExtrapolationModel {

    public abstract double extrapolate(long time);

    public abstract boolean insert(long time, double value);

    public abstract long lastIndex();

    public abstract long indexBefore(long time);

    public abstract long[] timesAfter(long time);

}
