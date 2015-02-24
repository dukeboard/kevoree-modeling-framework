package org.kevoree.modeling.api.msg;

/**
 * Created by duke on 23/02/15.
 */
public class KEventMessage implements KMessage {

    public Long universeID;

    public Long timeID;

    public Long objID;

    public int[] meta;

    @Override
    public String json() {
        StringBuilder builder = new StringBuilder();
        //TODO
        return builder.toString();
    }

    @Override
    public int type() {

        return 0;
    }
}
