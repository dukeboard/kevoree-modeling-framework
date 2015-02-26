package org.kevoree.modeling.api.msg;

/**
 * Created by duke on 24/02/15.
 */
public class KAtomicGetResult extends KMessage {

    public Long id;

    public String value;

    @Override
    public String json() {
        StringBuilder buffer = new StringBuilder();
        printJsonStart(buffer);
        printType(buffer);
        printElem(id, ID_NAME, buffer);
        printElem(value, VALUE_NAME, buffer);
        printJsonEnd(buffer);
        return buffer.toString();
    }

    @Override
    public int type() {
        return KMessageLoader.GET_REQ_TYPE;
    }
}
