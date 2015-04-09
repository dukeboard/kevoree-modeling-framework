package org.kevoree.modeling.api;

public interface ModelVisitor {

    VisitResult visit(KObject elem);

}