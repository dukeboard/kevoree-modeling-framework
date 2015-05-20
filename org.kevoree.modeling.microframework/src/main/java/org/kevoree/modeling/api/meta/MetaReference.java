package org.kevoree.modeling.api.meta;

public interface MetaReference extends Meta {

    boolean contained();

    boolean single();

    MetaClass type();

    MetaReference opposite();

    MetaClass origin();

}
