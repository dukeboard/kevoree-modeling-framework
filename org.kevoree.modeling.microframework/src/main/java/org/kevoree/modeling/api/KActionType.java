package org.kevoree.modeling.api;

/**
 * Created by duke on 10/2/14.
 */
public enum KActionType {

    CALL("CALL"),
    SET("SET"),
    ADD("ADD"),
    REMOVE("DEL"),
    NEW("NEW");

    private String code = "";

    KActionType(String code) {
        this.code = code;
    }

    public String toString() {
        return code;
    }

    public static KActionType parse(String s) {
        for(int i = 0; i < values().length; i++) {
            KActionType current = values()[i];
            if(current.code.equals(s)) {
                return current;
            }
        }
        return null;
    }

}
