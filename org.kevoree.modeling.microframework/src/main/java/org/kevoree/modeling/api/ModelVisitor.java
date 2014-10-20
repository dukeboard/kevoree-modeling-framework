package org.kevoree.modeling.api;

public interface ModelVisitor {

    public enum VisitResult {
        CONTINUE, SKIP, STOP;
    }

    public VisitResult visit(KObject elem);

}