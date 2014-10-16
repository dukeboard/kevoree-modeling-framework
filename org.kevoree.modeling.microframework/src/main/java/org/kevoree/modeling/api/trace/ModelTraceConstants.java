package org.kevoree.modeling.api.trace;

/**
 * Created by duke on 10/3/14.
 */
public enum ModelTraceConstants {

    traceType("t"),
    src("s"),
    meta("m"),
    previouspath("p"),
    typename("n"),
    objpath("o"),
    content("c"),
    openJSON("{"),
    closeJSON("}"),
    bb("\""),
    coma(","),
    dp(":");

    private String code = "";

    ModelTraceConstants(String code) {
        this.code = code;
    }

    public String toString() {
        return code;
    }

}
