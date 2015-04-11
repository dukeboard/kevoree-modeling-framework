package org.kevoree.modeling.api;

public interface KType {

    String name();

    boolean isEnum();

    String save(Object src);

    Object load(String payload);

}
