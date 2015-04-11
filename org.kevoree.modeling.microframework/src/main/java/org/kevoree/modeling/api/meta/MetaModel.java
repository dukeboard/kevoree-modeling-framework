package org.kevoree.modeling.api.meta;

public interface MetaModel extends Meta {

    MetaClass[] metaClasses();

    MetaClass metaClass(String name);

}
