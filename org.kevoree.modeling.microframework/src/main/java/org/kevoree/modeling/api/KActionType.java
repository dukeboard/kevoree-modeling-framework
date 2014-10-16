package org.kevoree.modeling.api;

/**
 * Created by duke on 10/2/14.
 */
public enum KActionType {

    SET("SET"),
    ADD("ADD"),
    REMOVE("DEL");

    private String code = "";

    KActionType(String code) {
        this.code = code;
    }

    public String toString() {
        return code;
    }

}
