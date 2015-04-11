package org.kevoree.modeling.api.meta;

public interface MetaReference extends Meta {

    boolean contained();

    boolean single();

    MetaClass attributeType();

    MetaReference opposite();

    MetaClass origin();

}
