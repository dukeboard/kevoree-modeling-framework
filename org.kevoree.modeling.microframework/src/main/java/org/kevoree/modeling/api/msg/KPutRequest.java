package org.kevoree.modeling.api.msg;

import org.kevoree.modeling.api.data.cdn.KContentPutRequest;

/**
 * Created by duke on 24/02/15.
 */
public class KPutRequest implements KMessage {

    public KContentPutRequest request;

    @Override
    public String json() {
        return null;
    }

    @Override
    public int type() {
        return 0;
    }
}
