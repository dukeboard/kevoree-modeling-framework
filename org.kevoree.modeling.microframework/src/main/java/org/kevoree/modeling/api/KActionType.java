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

    private String _code = "";

    KActionType(String code) {
        this._code = code;
    }

    public String toString() {
        return _code;
    }

    public String code(){return _code;}

    public static KActionType parse(String s) {
        for(int i = 0; i < values().length; i++) {
            KActionType current = values()[i];
            if(current.code().equals(s)) {
                return current;
            }
        }
        return null;
    }

}
