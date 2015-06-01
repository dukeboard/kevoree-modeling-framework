package org.kevoree.modeling.meta;

public interface MetaModel extends Meta {

    MetaClass[] metaClasses();

    MetaClass metaClass(String name);

}
