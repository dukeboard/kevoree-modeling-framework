package org.kevoree.modeling.api;

public abstract class KInferState {

    public abstract String save();

    public abstract void load(String payload);

    public abstract boolean isDirty();

    public abstract KInferState cloneState();

}
