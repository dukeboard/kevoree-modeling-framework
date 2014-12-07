package org.kevoree.modeling.api.meta;

/**
 * Created by duke on 10/9/14.
 */
public interface MetaClass extends Meta {

    MetaModel origin();

    MetaAttribute[] metaAttributes();

    MetaReference[] metaReferences();

    MetaOperation[] metaOperations();

    public MetaAttribute metaAttribute(String name);

    public MetaReference metaReference(String name);

    public MetaOperation metaOperation(String name);

}
