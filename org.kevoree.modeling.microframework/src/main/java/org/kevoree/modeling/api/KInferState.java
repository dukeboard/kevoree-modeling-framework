package org.kevoree.modeling.api;

/**
 * Created by duke on 10/02/15.
 */
public abstract class KInferState {

    public abstract String save();

    public abstract void load(String payload);

    public abstract boolean isDirty();

    public abstract KInferState cloneState();

}
