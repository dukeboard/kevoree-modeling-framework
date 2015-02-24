package org.kevoree.modeling.api.msg;

/**
 * Created by duke on 23/02/15.
 */
public interface KMessage {

    public String json();

    public int type();

    public static final int EVENT_TYPE = 0;

    public static final int GET_KEYS_TYPE = 1;

    public static final int PUT_TYPE = 2;

    public static final int OPERATION_CALL_TYPE = 3;

    public static final int OPERATION_RESULT_TYPE = 4;

}
