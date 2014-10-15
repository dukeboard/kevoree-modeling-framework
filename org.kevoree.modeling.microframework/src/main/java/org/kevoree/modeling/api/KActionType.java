package org.kevoree.modeling.api;

/**
 * Created by duke on 10/2/14.
 */
public enum KActionType {

    SET("S"),
    ADD("A"),
    REMOVE("R"),
    RENEW_INDEX("I"),
    CONTROL("C");

    private String code = "";

    KActionType(String code) {
        this.code = code;
    }

    public String toString() {
        return code;
    }

}
