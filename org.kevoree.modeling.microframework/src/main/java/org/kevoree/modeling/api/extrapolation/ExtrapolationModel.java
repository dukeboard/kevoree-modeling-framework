package org.kevoree.modeling.api.extrapolation;

/**
 * Created by duke on 11/24/14.
 */
public abstract class ExtrapolationModel {

    public abstract String save();

    public abstract void load(String payload);

    public abstract boolean isDirty();

}
