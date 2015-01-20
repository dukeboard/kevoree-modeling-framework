package org.kevoree.modeling.api;

import org.kevoree.modeling.api.meta.MetaReference;

/**
 * Created by duke on 10/17/14.
 */
public class InboundReference {

    private MetaReference _reference;

    private long _source;

    public InboundReference(MetaReference p_reference, long p_source) {
        this._reference = p_reference;
        this._source = p_source;
    }

    public MetaReference getReference() {
        return _reference;
    }

    public long getSource() {
        return _source;
    }

}
