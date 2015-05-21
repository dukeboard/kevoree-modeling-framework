package org.kevoree.modeling.api;

public interface KModelVisitor {

    KVisitResult visit(KObject elem);

}