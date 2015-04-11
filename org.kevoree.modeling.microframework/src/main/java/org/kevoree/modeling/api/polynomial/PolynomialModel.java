package org.kevoree.modeling.api.polynomial;

public interface PolynomialModel {

    double extrapolate(long time);

    boolean insert(long time, double value);

    long lastIndex();

    String save();

    void load(String payload);

    boolean isDirty();

}
