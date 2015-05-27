package org.kevoree.modeling.api.meta;

public interface MetaReference extends Meta {

    boolean hidden();

    boolean single();

    MetaClass type();

    MetaReference opposite();

    MetaClass origin();

}
