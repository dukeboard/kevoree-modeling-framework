package org.kevoree.modeling.msg;

import org.kevoree.modeling.memory.KContentKey;
import org.kevoree.modeling.memory.cdn.AtomicOperation;

public class KAtomicGetRequest implements KMessage {

    public long id;

    public KContentKey key;

    public AtomicOperation operation;

    @Override
    public String json() {
        StringBuilder buffer = new StringBuilder();
        KMessageHelper.printJsonStart(buffer);
        KMessageHelper.printType(buffer, type());
        KMessageHelper.printElem(id, KMessageLoader.ID_NAME, buffer);
        KMessageHelper.printElem(key, KMessageLoader.KEY_NAME, buffer);
        if (operation != null) {
            KMessageHelper.printElem(operation.operationKey(), KMessageLoader.OPERATION_NAME, buffer);
        }
        KMessageHelper.printJsonEnd(buffer);
        return buffer.toString();
    }

    @Override
    public int type() {
        return KMessageLoader.ATOMIC_OPERATION_REQUEST_TYPE;
    }
}
