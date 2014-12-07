package org.kevoree.modeling.api.meta;

/**
 * Created by duke on 07/12/14.
 */
public interface MetaModel extends Meta {

    public MetaClass[] metaClasses();

    public MetaClass metaClass(String name);

}
