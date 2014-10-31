package org.kevoree.modeling.api;

import org.kevoree.modeling.api.meta.MetaReference;

/**
 * Created by duke on 10/17/14.
 */
public class InboundReference {

    private MetaReference reference;

    private KObject object;

    public InboundReference(MetaReference reference, KObject object) {
        this.reference = reference;
        this.object = object;
    }

    public MetaReference getReference() {
        return reference;
    }

    public KObject getObject() {
        return object;
    }
}
