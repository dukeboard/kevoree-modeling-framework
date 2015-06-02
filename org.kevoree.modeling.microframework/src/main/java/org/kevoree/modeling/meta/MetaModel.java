package org.kevoree.modeling.meta;

public interface MetaModel extends Meta {

    MetaClass[] metaClasses();

    MetaClass metaClassByName(String name);

    MetaClass metaClass(int index);

}
