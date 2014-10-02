package org.kevoree.modeling.api;

public interface ModelAttributeVisitor {

    public void visit(String name, Object value);

}