package org.kevoree.modeling.api.msg;

import org.kevoree.modeling.api.json.JsonString;

/**
 * Created by duke on 24/02/15.
 */
public class KGetResult extends KMessage {

    public Long id;

    public String[] values;

    @Override
    public String json() {
        StringBuilder buffer = new StringBuilder();
        printJsonStart(buffer);
        printType(buffer);
        printElem(id, ID_NAME, buffer);
        if (values != null) {
            buffer.append(",");
            buffer.append("\"");
            buffer.append(VALUES_NAME).append("\":[");
            for (int i = 0; i < values.length; i++) {
                if (i != 0) {
                    buffer.append(",");
                }
                buffer.append("\"");
                buffer.append(JsonString.encode(values[i]));
                buffer.append("\"");
            }
            buffer.append("]\n");
        }
        printJsonEnd(buffer);
        return buffer.toString();
    }

    @Override
    public int type() {
        return KMessageLoader.GET_RES_TYPE;
    }
}
