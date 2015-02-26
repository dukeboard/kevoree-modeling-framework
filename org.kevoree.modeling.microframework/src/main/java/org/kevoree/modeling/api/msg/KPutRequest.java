package org.kevoree.modeling.api.msg;

import org.kevoree.modeling.api.data.cdn.KContentPutRequest;
import org.kevoree.modeling.api.json.JsonString;

/**
 * Created by duke on 24/02/15.
 */
public class KPutRequest implements KMessage {

    public KContentPutRequest request;

    public Long id;

    @Override
    public String json() {
        StringBuilder buffer = new StringBuilder();
        KMessageHelper.printJsonStart(buffer);
        KMessageHelper.printType(buffer,type());
        KMessageHelper.printElem(id, KMessageLoader.ID_NAME, buffer);
        if (request != null) {
            buffer.append(",\"");
            buffer.append(KMessageLoader.KEYS_NAME).append("\":[");
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
            buffer.append(KMessageLoader.VALUES_NAME).append("\":[");
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
        KMessageHelper.printJsonEnd(buffer);
        return buffer.toString();
    }

    @Override
    public int type() {
        return KMessageLoader.PUT_REQ_TYPE;
    }
}
