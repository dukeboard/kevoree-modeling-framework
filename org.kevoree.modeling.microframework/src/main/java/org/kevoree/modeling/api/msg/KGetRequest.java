package org.kevoree.modeling.api.msg;

import org.kevoree.modeling.api.data.cache.KContentKey;

/**
 * Created by duke on 24/02/15.
 */
public class KGetRequest implements KMessage {

    public Long id;

    public KContentKey[] keys;

    @Override
    public String json() {
        StringBuilder buffer = new StringBuilder();
        KMessageHelper.printJsonStart(buffer);
        KMessageHelper.printType(buffer,type());
        KMessageHelper.printElem(id, KMessageLoader.ID_NAME, buffer);
        if (keys != null) {
            buffer.append(",");
            buffer.append("\"");
            buffer.append(KMessageLoader.KEYS_NAME).append("\":[");
            for (int i = 0; i < keys.length; i++) {
                if (i != 0) {
                    buffer.append(",");
                }
                buffer.append("\"");
                buffer.append(keys[i].toString());
                buffer.append("\"");
            }
            buffer.append("]\n");
        }
        KMessageHelper.printJsonEnd(buffer);
        return buffer.toString();
    }

    @Override
    public int type() {
        return KMessageLoader.GET_REQ_TYPE;
    }
}
