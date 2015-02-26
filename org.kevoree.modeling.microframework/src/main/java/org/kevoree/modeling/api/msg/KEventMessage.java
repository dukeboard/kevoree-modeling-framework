package org.kevoree.modeling.api.msg;

import org.kevoree.modeling.api.data.cache.KContentKey;

/**
 * Created by duke on 23/02/15.
 */
public class KEventMessage extends KMessage {

    public KContentKey key;

    public int[] meta;

    @Override
    public String json() {
        StringBuilder buffer = new StringBuilder();
        printJsonStart(buffer);
        printType(buffer);
        printElem(key, KEY_NAME, buffer);
        if (meta != null) {
            buffer.append(",");
            buffer.append("\"");
            buffer.append(VALUES_NAME).append("\":[");
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
        printJsonEnd(buffer);
        return buffer.toString();
    }

    @Override
    public int type() {
        return KMessageLoader.EVENT_TYPE;
    }
}
