package org.kevoree.modeling.api.json;

/**
 * Created by duke on 10/3/14.
 */
public class Token {
    private Type tokenType;
    private Object value;

    public Token(Type tokenType, Object value) {
        this.tokenType = tokenType;
        this.value = value;
    }

    @Override
    public String toString() {
        String v;
        if (value != null) {
            v = " (" + value + ")";
        } else {
            v = "";
        }
        String result = tokenType.toString() + v;
        return result;
    }


    public Type getTokenType() {
        return tokenType;
    }

    public Object getValue() {
        return value;
    }
}