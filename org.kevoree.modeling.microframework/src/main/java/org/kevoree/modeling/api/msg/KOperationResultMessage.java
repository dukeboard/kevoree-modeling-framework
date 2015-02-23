package org.kevoree.modeling.api.msg;

/**
 * Created by duke on 23/02/15.
 */
public class KOperationResultMessage implements KMessage {

    public Long listenerID;

    public String result;

    @Override
    public String json() {
        return null;
    }
}
