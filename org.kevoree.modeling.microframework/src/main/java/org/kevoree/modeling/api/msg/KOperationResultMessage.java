package org.kevoree.modeling.api.msg;

/**
 * Created by duke on 23/02/15.
 */
public class KOperationResultMessage extends KEventMessage {

    public long id;
    public String value;

    @Override
    public String json() {
        StringBuilder buffer = new StringBuilder();
        KMessageHelper.printJsonStart(buffer);
        KMessageHelper.printType(buffer, type());
        KMessageHelper.printElem(id, KMessageLoader.ID_NAME, buffer);
        KMessageHelper.printElem(key, KMessageLoader.KEY_NAME, buffer);
        KMessageHelper.printElem(value, KMessageLoader.VALUE_NAME, buffer);
        KMessageHelper.printJsonEnd(buffer);
        return buffer.toString();
    }

    @Override
    public int type() {
        return KMessageLoader.OPERATION_RESULT_TYPE;
    }
}
