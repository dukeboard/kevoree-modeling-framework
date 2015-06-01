package org.kevoree.modeling;

public interface KModelVisitor {

    KVisitResult visit(KObject elem);

}