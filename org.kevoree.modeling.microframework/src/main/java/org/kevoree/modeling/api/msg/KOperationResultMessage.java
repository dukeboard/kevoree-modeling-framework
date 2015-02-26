package org.kevoree.modeling.api.msg;

/**
 * Created by duke on 23/02/15.
 */
public class KOperationResultMessage extends KMessage {

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
        return KMessageLoader.OPERATION_RESULT_TYPE;
    }
}
