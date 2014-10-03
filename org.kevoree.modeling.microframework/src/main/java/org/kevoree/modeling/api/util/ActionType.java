package org.kevoree.modeling.api.util;

/**
 * Created by duke on 10/2/14.
 */
public enum ActionType {

    SET("S"),
    ADD("a"),
    REMOVE("r"),
    ADD_ALL("A"),
    REMOVE_ALL("R"),
    RENEW_INDEX("I"),
    CONTROL("C");

    private String code = "";

    ActionType(String code) {
        this.code = code;
    }

    public String toString() {
        return code;
    }

}
