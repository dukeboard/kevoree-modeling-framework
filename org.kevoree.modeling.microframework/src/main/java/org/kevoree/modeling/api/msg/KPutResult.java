package org.kevoree.modeling.api.msg;

/**
 * Created by duke on 24/02/15.
 */
public class KPutResult extends KMessage {

    public Long id;

    @Override
    public String json() {
        StringBuilder buffer = new StringBuilder();
        printJsonStart(buffer);
        printType(buffer);
        printElem(id, ID_NAME, buffer);
        printJsonEnd(buffer);
        return buffer.toString();
    }

    @Override
    public int type() {
        return KMessageLoader.PUT_RES_TYPE;
    }
}
