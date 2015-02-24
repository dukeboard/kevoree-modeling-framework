package org.kevoree.modeling.api.msg;

import org.kevoree.modeling.api.data.cdn.KContentPutRequest;

/**
 * Created by duke on 24/02/15.
 */
public class KPutRequest implements KMessage {

    public KContentPutRequest request;

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
        if (request != null) {
            buffer.append(",\"keys\":[");
            for (int i = 0; i < request.size(); i++) {
                if (i != 0) {
                    buffer.append(",");
                }
                buffer.append("\"");
                buffer.append(request.getKey(i));
                buffer.append("\"");
            }
            buffer.append("]\n");
            buffer.append(",\"values\":[");
            for (int i = 0; i < request.size(); i++) {
                if (i != 0) {
                    buffer.append(",");
                }
                buffer.append("\"");
                buffer.append(request.getContent(i));
                buffer.append("\"");
            }
            buffer.append("]\n");
        }
        buffer.append("}\n");
        return buffer.toString();
    }

    @Override
    public int type() {
        return KMessageLoader.PUT_TYPE;
    }
}
