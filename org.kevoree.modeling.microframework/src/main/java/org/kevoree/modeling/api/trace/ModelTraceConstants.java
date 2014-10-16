package org.kevoree.modeling.api.trace;

/**
 * Created by duke on 10/3/14.
 */
public enum ModelTraceConstants {

    traceType("type"),
    src("src"),
    meta("meta"),
    previouspath("prev"),
    typename("class"),
    objpath("orig"),
    content("val"),
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
