package org.kevoree.modeling.api;

/**
 * Created by duke on 10/02/15.
 */
public interface KInferState {

    public String save();

    public void load(String payload);

    public boolean isDirty();

    public KInferState cloneState();

}
