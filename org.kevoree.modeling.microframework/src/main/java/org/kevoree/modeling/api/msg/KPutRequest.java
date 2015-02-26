package org.kevoree.modeling.api.msg;

import org.kevoree.modeling.api.data.cdn.KContentPutRequest;
import org.kevoree.modeling.api.json.JsonString;

/**
 * Created by duke on 24/02/15.
 */
public class KPutRequest extends KMessage {

    public KContentPutRequest request;

    public Long id;

    @Override
    public String json() {
        StringBuilder buffer = new StringBuilder();
        printJsonStart(buffer);
        printType(buffer);
        printElem(id, ID_NAME, buffer);
        if (request != null) {
            buffer.append(",\"");
            buffer.append(KEYS_NAME).append("\":[");
            for (int i = 0; i < request.size(); i++) {
                if (i != 0) {
                    buffer.append(",");
                }
                buffer.append("\"");
                buffer.append(request.getKey(i));
                buffer.append("\"");
            }
            buffer.append("]\n");
            buffer.append(",\"");
            buffer.append(VALUES_NAME).append("\":[");
            for (int i = 0; i < request.size(); i++) {
                if (i != 0) {
                    buffer.append(",");
                }
                buffer.append("\"");
                buffer.append(JsonString.encode(request.getContent(i)));
                buffer.append("\"");
            }
            buffer.append("]\n");
        }
        printJsonEnd(buffer);
        return buffer.toString();
    }

    @Override
    public int type() {
        return KMessageLoader.PUT_REQ_TYPE;
    }
}
