package org.kevoree.modeling.api.msg;

/**
 * Created by duke on 24/02/15.
 */
public class KAtomicGetResult implements KMessage {

    public Long id;

    public String value;

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
        if (value != null) {
            buffer.append(",");
            buffer.append("\"value\":\"");
            buffer.append(value);
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
