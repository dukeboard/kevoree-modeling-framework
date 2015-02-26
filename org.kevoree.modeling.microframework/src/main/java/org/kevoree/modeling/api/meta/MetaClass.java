package org.kevoree.modeling.api.meta;

/**
 * Created by duke on 10/9/14.
 */
public interface MetaClass extends Meta {

    public Meta[] metaElements();

    public Meta meta(int index);

    public MetaAttribute[] metaAttributes();

    public MetaReference[] metaReferences();

    public Meta metaByName(String name);


}
