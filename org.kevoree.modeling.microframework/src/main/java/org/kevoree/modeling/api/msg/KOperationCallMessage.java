package org.kevoree.modeling.api.msg;

import org.kevoree.modeling.api.json.JsonString;

/**
 * Created by duke on 23/02/15.
 */
public class KOperationCallMessage extends KEventMessage {

    public long id;
    public int classIndex;
    public int opIndex;
    public String[] params;

    @Override
    public String json() {
        StringBuilder buffer = new StringBuilder();
        KMessageHelper.printJsonStart(buffer);
        KMessageHelper.printType(buffer, type());
        KMessageHelper.printElem(id, KMessageLoader.ID_NAME, buffer);
        KMessageHelper.printElem(key, KMessageLoader.KEY_NAME, buffer);
        buffer.append(",\"").append(KMessageLoader.CLASS_IDX_NAME).append("\":\"").append(classIndex).append("\"");
        buffer.append(",\"").append(KMessageLoader.OPERATION_NAME).append("\":\"").append(opIndex).append("\"");
        if (params != null) {
            buffer.append(",\"");
            buffer.append(KMessageLoader.PARAMETERS_NAME).append("\":[");
            for (int i = 0; i < params.length; i++) {
                if (i != 0) {
                    buffer.append(",");
                }
                buffer.append("\"");
                buffer.append(JsonString.encode(params[i]));
                buffer.append("\"");
            }
            buffer.append("]\n");
        }
        KMessageHelper.printJsonEnd(buffer);
        return buffer.toString();
    }

    @Override
    public int type() {
        return KMessageLoader.OPERATION_CALL_TYPE;
    }
}
