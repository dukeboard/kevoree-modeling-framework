package org.kevoree.modeling.api.polynomial;

import org.kevoree.modeling.api.extrapolation.ExtrapolationModel;

/**
 * Created by duke on 10/28/14.
 */
public interface PolynomialModel extends ExtrapolationModel {

    public double extrapolate(long time);

    public boolean insert(long time, double value);

    public long lastIndex();

    public long indexBefore(long time);

    public long[] timesAfter(long time);

}
