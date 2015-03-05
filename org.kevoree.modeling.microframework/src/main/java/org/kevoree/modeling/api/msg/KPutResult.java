package org.kevoree.modeling.api.msg;

/**
 * Created by duke on 24/02/15.
 */
public class KPutResult implements KMessage {

    public long id;

    @Override
    public String json() {
        StringBuilder buffer = new StringBuilder();
        KMessageHelper.printJsonStart(buffer);
        KMessageHelper.printType(buffer,type());
        KMessageHelper.printElem(id, KMessageLoader.ID_NAME, buffer);
        KMessageHelper.printJsonEnd(buffer);
        return buffer.toString();
    }

    @Override
    public int type() {
        return KMessageLoader.PUT_RES_TYPE;
    }
}
