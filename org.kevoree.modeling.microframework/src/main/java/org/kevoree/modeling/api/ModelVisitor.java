package org.kevoree.modeling.api;

public interface ModelVisitor {

    public enum Result {
        CONTINUE, SKIP, STOP;
    }

    public void visit(KObject elem, Callback<Result> visitor);

}