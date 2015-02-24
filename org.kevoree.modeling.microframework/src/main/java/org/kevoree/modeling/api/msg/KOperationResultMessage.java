package org.kevoree.modeling.api.msg;

/**
 * Created by duke on 23/02/15.
 */
public class KOperationResultMessage implements KMessage {

    public Long id;

    public String result;

    @Override
    public String json() {
        StringBuilder buffer = new StringBuilder();
        buffer.append("{\n\"type\":\"");
        buffer.append(type());
        if (id != null) {
            buffer.append("\",\n");
            buffer.append("\"id\":\"");
            buffer.append(id.toString());
            buffer.append("\"\n");
        }
        if (result != null) {
            buffer.append("\",\n");
            buffer.append("\"result\":\"");
            buffer.append(result);
            buffer.append("\"\n");
        }
        buffer.append("}\n");
        return buffer.toString();
    }

    @Override
    public int type() {
        return KMessage.OPERATION_RESULT_TYPE;
    }
}
