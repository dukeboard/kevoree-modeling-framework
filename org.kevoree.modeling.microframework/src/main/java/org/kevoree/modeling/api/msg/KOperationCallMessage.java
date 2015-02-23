package org.kevoree.modeling.api.msg;

/**
 * Created by duke on 23/02/15.
 */
public class KOperationCallMessage implements KMessage {

    public Long universeID;

    public Long timeID;

    public Long objID;

    public String[] params;

    @Override
    public String json() {
        return null;
    }
}
