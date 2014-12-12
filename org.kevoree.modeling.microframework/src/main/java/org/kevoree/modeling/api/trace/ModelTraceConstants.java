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
    sep("@"),
    coma(","),
    dp(":");

    private String _code = "";

    ModelTraceConstants(String p_code) {
        this._code = p_code;
    }

    public String toString() {
        return _code;
    }

}
