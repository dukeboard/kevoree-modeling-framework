package org.kevoree.modeling.api.traversal.selector;

/**
 * Created by duke on 10/24/14.
 */
public class KQueryParam {

    private String _name;
    private String _value;
    private boolean _negative;

    public KQueryParam(String p_name, String p_value, boolean p_negative) {
        this._name = p_name;
        this._value = p_value;
        this._negative = p_negative;
    }

    public String name() {
        return _name;
    }

    public String value() {
        return _value;
    }

    public boolean isNegative() {
        return _negative;
    }

}
