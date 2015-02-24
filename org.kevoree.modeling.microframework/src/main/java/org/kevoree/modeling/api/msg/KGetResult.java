package org.kevoree.modeling.api.msg;

import org.kevoree.modeling.api.json.JsonString;

/**
 * Created by duke on 24/02/15.
 */
public class KGetResult implements KMessage {

    public Long id;

    public String[] values;

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
        if (values != null) {
            buffer.append(",");
            buffer.append("\"values\":[");
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
        buffer.append("}\n");
        return buffer.toString();
    }

    @Override
    public int type() {
        return KMessageLoader.GET_RES_TYPE;
    }
}
