package org.kevoree.modeling.api.msg;

import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.cdn.AtomicOperation;

/**
 * Created by duke on 24/02/15.
 */
public class KAtomicGetRequest extends KMessage {

    public Long id;

    public KContentKey key;

    public AtomicOperation operation;

    @Override
    public String json() {
        StringBuilder buffer = new StringBuilder();
        printJsonStart(buffer);
        printType(buffer);
        printElem(id, ID_NAME, buffer);
        printElem(key, KEY_NAME, buffer);
        if (operation != null) {
            printElem(operation.operationKey(), OPERATION_NAME, buffer);
        }
        printJsonEnd(buffer);
        return buffer.toString();
    }

    @Override
    public int type() {
        return KMessageLoader.GET_REQ_TYPE;
    }
}
