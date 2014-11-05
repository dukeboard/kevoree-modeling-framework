package org.kevoree.modeling.api.json;

/**
 * Created by duke on 10/3/14.
 */
public class JsonToken2 {

    private Type _tokenType;
    private Object _value;

    public JsonToken2(Type p_tokenType, Object p_value) {
        this._tokenType = p_tokenType;
        this._value = p_value;
    }

    @Override
    public String toString() {
        String v;
        if (_value != null) {
            v = " (" + _value + ")";
        } else {
            v = "";
        }
        String result = _tokenType.toString() + v;
        return result;
    }


    public Type tokenType() {
        return _tokenType;
    }

    public Object value() {
        return _value;
    }
}