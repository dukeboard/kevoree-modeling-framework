package org.kevoree.modeling.api.msg;

import org.kevoree.modeling.api.data.cache.KContentKey;

/**
 * Created by duke on 24/02/15.
 */
public class KGetRequest extends KMessage {

    public Long id;

    public KContentKey[] keys;

    @Override
    public String json() {
        StringBuilder buffer = new StringBuilder();
        printJsonStart(buffer);
        printType(buffer);
        printElem(id, ID_NAME, buffer);
        if (keys != null) {
            buffer.append(",");
            buffer.append("\"");
            buffer.append(KEYS_NAME).append("\":[");
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
        printJsonEnd(buffer);
        return buffer.toString();
    }

    @Override
    public int type() {
        return KMessageLoader.GET_REQ_TYPE;
    }
}
