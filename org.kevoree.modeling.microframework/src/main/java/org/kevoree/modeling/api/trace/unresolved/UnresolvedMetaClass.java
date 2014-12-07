package org.kevoree.modeling.api.trace.unresolved;

import org.kevoree.modeling.api.meta.*;

/**
 * Created by duke on 10/16/14.
 */
public class UnresolvedMetaClass implements MetaClass {

    private String _metaName;

    public UnresolvedMetaClass(String p_metaName) {
        this._metaName = p_metaName;
    }

    @Override
    public String metaName() {
        return _metaName;
    }

    @Override
    public int index() {
        return -1;
    }

    @Override
    public MetaModel origin() {
        return null;
    }

    @Override
    public MetaAttribute[] metaAttributes() {
        return new MetaAttribute[0];
    }

    @Override
    public MetaReference[] metaReferences() {
        return new MetaReference[0];
    }

    @Override
    public MetaOperation[] metaOperations() {
        return new MetaOperation[0];
    }

    @Override
    public MetaAttribute metaAttribute(String name) {
        return null;
    }

    @Override
    public MetaReference metaReference(String name) {
        return null;
    }

    @Override
    public MetaOperation metaOperation(String name) {
        return null;
    }
}
