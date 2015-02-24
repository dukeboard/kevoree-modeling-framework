package org.kevoree.modeling.api.msg;

/**
 * Created by duke on 24/02/15.
 */
public class KPutResult implements KMessage {

    public Long id;

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
        buffer.append("}\n");
        return buffer.toString();
    }

    @Override
    public int type() {
        return KMessageLoader.PUT_RES_TYPE;
    }
}
