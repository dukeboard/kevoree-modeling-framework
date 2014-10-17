package org.kevoree.modeling.api.trace.unresolved;

import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaReference;

/**
 * Created by duke on 10/16/14.
 */
public class UnresolvedMetaReference implements MetaReference {

    public UnresolvedMetaReference(String metaName) {
        this.metaName = metaName;
    }

    private String metaName;

    @Override
    public boolean contained() {
        return false;
    }

    @Override
    public boolean single() {
        return false;
    }

    @Override
    public MetaClass metaType() {
        return null;
    }

    @Override
    public MetaReference opposite() {
        return null;
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