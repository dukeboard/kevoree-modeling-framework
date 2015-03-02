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
        KMessageHelper.printJsonStart(buffer);
        KMessageHelper.printType(buffer,type());
        KMessageHelper.printElem(id, KMessageLoader.ID_NAME, buffer);
        if (values != null) {
            buffer.append(",");
            buffer.append("\"");
            buffer.append(KMessageLoader.VALUES_NAME).append("\":[");
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
        KMessageHelper.printJsonEnd(buffer);
        return buffer.toString();
    }

    @Override
    public int type() {
        return KMessageLoader.GET_RES_TYPE;
    }
}