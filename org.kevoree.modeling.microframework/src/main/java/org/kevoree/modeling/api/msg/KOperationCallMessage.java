package org.kevoree.modeling.api.msg;

import org.kevoree.modeling.api.data.cache.KContentKey;

/**
 * Created by duke on 23/02/15.
 */
public class KOperationCallMessage extends KMessage {

    public Long id;

    public KContentKey key;

    public String[] params;

    @Override
    public String json() {
        StringBuilder buffer = new StringBuilder();
        printJsonStart(buffer);
        printType(buffer);
        printElem(id, ID_NAME, buffer);
        printElem(key, KEY_NAME, buffer);
        if (params != null) {
            buffer.append(",\"");
            buffer.append(VALUES_NAME).append("\":[");
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
        printJsonEnd(buffer);
        return buffer.toString();
    }

    @Override
    public int type() {
        return KMessageLoader.OPERATION_CALL_TYPE;
    }
}
