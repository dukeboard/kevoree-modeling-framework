package org.kevoree.modeling.api.msg;

import org.kevoree.modeling.api.data.cache.KContentKey;

/**
 * Created by duke on 23/02/15.
 */
public class KEventMessage implements KMessage {

    public KContentKey key;

    public int[] meta;

    @Override
    public String json() {
        StringBuilder buffer = new StringBuilder();
        buffer.append("{\n\"type\":\"");
        buffer.append(type());
        buffer.append("\"\n");
        if (key != null) {
            buffer.append(",");
            buffer.append("\"key\":\"");
            buffer.append(key.toString());
            buffer.append("\"\n");
        }
        if (meta != null) {
            buffer.append(",");
            buffer.append("\"values\":[");
            for (int i = 0; i < meta.length; i++) {
                if (i != 0) {
                    buffer.append(",");
                }
                buffer.append("\"");
                buffer.append(meta[i]);
                buffer.append("\"");
            }
            buffer.append("]\n");
        }
        buffer.append("}\n");
        return buffer.toString();
    }

    @Override
    public int type() {
        return KMessage.EVENT_TYPE;
    }
}
