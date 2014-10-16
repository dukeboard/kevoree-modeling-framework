package org.kevoree.modeling.api.trace.unresolved;

import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;

/**
 * Created by duke on 10/16/14.
 */
public class UnresolvedMetaAttribute implements MetaAttribute {

    private String metaName;

    public UnresolvedMetaAttribute(String metaName) {
        this.metaName = metaName;
    }

    @Override
    public boolean learned() {
        return false;
    }

    @Override
    public boolean key() {
        return false;
    }

    @Override
    public MetaClass origin() {
        return null;
    }

    @Override
    public String metaName() {
        return metaName;
    }

    @Override
    public int index() {
        return -1;
    }
}
