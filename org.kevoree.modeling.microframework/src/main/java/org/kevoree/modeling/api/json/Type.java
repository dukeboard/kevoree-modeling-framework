package org.kevoree.modeling.api.json;

/**
 * Created by duke on 10/3/14.
 */
public enum Type {

    VALUE(0),
    LEFT_BRACE(1),
    RIGHT_BRACE(2),
    LEFT_BRACKET(3),
    RIGHT_BRACKET(4),
    COMMA(5),
    COLON(6),
    EOF(42);

    private final int _value;

    private Type(int p_value) {
        this._value = p_value;
    }

}