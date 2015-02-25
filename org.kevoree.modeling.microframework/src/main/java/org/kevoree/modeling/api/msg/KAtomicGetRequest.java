package org.kevoree.modeling.api.msg;

import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.cdn.AtomicOperation;

/**
 * Created by duke on 24/02/15.
 */
public class KAtomicGetRequest implements KMessage {

    public Long id;

    public KContentKey key;

    public AtomicOperation operation;

    @Override
    public String json() {
        StringBuilder buffer = new StringBuilder();
        buffer.append("{\n\"type\":\"");
        buffer.append(type());
        buffer.append("\"\n");
        if (id != null) {
            buffer.append(",");
            buffer.append("\"id\":\"");
            buffer.append(id.toString());
            buffer.append("\"\n");
        }
        if (key != null) {
            buffer.append(",");
            buffer.append("\"key\":\"");
            buffer.append(key.toString());
            buffer.append("\"\n");

        }
        if (operation != null) {
            buffer.append(",");
            buffer.append("\"operation\":\"");
            buffer.append(operation.operationKey());
            buffer.append("\"\n");
        }
        buffer.append("}\n");
        return buffer.toString();
    }

    @Override
    public int type() {
        return KMessageLoader.GET_REQ_TYPE;
    }
}
