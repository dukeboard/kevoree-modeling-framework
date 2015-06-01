package org.kevoree.modeling.meta;

public interface MetaClass extends Meta {

    Meta[] metaElements();

    Meta meta(int index);

    MetaAttribute[] metaAttributes();

    MetaReference[] metaReferences();

    Meta metaByName(String name);

    MetaAttribute attribute(String name);

    MetaReference reference(String name);

    MetaOperation operation(String name);

}
