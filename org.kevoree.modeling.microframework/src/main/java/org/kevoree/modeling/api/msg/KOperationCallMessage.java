package org.kevoree.modeling.api.msg;

import org.kevoree.modeling.api.data.cache.KContentKey;

/**
 * Created by duke on 23/02/15.
 */
public class KOperationCallMessage implements KMessage {

    public Long id;

    public KContentKey key;

    public String[] params;

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
            buffer.append(",\"key\":\"");
            buffer.append(key.toString());
            buffer.append("\"\n");
        }
        if (params != null) {
            buffer.append(",\"values\":[");
            for (int i = 0; i < params.length; i++) {
                if (i != 0) {
                    buffer.append(",");
                }
                buffer.append("\"");
                buffer.append(params[i]);
                buffer.append("\"");
            }
            buffer.append("]\n");
        }
        buffer.append("}\n");
        return buffer.toString();
    }

    @Override
    public int type() {
        return KMessageLoader.OPERATION_CALL_TYPE;
    }
}
