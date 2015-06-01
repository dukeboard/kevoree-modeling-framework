package org.kevoree.modeling.meta;

public interface MetaReference extends Meta {

    boolean visible();

    boolean single();

    MetaClass type();

    MetaReference opposite();

    MetaClass origin();

}
