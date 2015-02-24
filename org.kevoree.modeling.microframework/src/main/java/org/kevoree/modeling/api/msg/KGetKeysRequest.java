package org.kevoree.modeling.api.msg;

import org.kevoree.modeling.api.data.cache.KContentKey;

/**
 * Created by duke on 24/02/15.
 */
public class KGetKeysRequest implements KMessage {

    public Long id;

    public KContentKey[] keys;

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
        if (keys != null) {
            buffer.append(",");
            buffer.append("\"keys\":[");
            for (int i = 0; i < keys.length; i++) {
                if (i != 0) {
                    buffer.append(",");
                }
                buffer.append("\"");
                buffer.append(keys[i].toString());
                buffer.append("\"");
            }
            buffer.append("]\n");
        }
        buffer.append("}\n");
        return buffer.toString();
    }

    @Override
    public int type() {
        return KMessageLoader.GET_KEYS_TYPE;
    }
}
