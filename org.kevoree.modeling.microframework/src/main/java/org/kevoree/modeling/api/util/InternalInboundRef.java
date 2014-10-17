package org.kevoree.modeling.api.util;

/**
 * Created by duke on 10/17/14.
 */
public class InternalInboundRef {

    private long kid;

    private int refId;

    public InternalInboundRef(long kid, int refId) {
        this.kid = kid;
        this.refId = refId;
    }

    public long getKID() {
        return kid;
    }

    public int getRefIndex() {
        return refId;
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof InternalInboundRef)) {
            return false;
        } else {
            return kid == ((InternalInboundRef) obj).kid && refId == ((InternalInboundRef) obj).refId;
        }
    }
}
