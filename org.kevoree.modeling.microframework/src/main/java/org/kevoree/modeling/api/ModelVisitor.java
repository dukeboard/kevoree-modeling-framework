package org.kevoree.modeling.api;

public interface ModelVisitor {

    public VisitResult visit(KObject elem);

}