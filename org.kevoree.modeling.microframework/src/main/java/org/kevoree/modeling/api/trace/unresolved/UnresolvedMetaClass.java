package org.kevoree.modeling.api.trace.unresolved;

import org.kevoree.modeling.api.meta.MetaClass;

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
}
