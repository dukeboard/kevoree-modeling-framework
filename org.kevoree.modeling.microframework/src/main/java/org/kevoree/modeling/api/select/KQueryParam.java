package org.kevoree.modeling.api.select;

/**
 * Created by duke on 10/24/14.
 */
public class KQueryParam {

    private String name;
    private String value;
    private boolean negative;

    protected KQueryParam(String name, String value, boolean negative) {
        this.name = name;
        this.value = value;
        this.negative = negative;
    }

    public String getName() {
        return name;
    }

    public String getValue() {
        return value;
    }

    public boolean isNegative() {
        return negative;
    }

}
