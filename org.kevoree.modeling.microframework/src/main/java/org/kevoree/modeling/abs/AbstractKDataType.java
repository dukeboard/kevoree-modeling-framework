package org.kevoree.modeling.abs;

import org.kevoree.modeling.KType;
import org.kevoree.modeling.format.json.JsonString;
import org.kevoree.modeling.meta.PrimitiveTypes;

public class AbstractKDataType implements KType {

    final private String _name;

    final private boolean _isEnum;

    public AbstractKDataType(String p_name, boolean p_isEnum) {
        this._name = p_name;
        this._isEnum = p_isEnum;
    }

    @Override
    public String name() {
        return _name;
    }

    @Override
    public boolean isEnum() {
        return _isEnum;
    }

    @Override
    public String save(Object src) {
        if (src != null && this != PrimitiveTypes.TRANSIENT) {
            if (this == PrimitiveTypes.STRING) {
                return JsonString.encode(src.toString());
            } else {
                return src.toString();
            }
        }
        return null;
    }

    @Override
    public Object load(String payload) {
        if (this == PrimitiveTypes.TRANSIENT) {
            return null;
        }
        if (this == PrimitiveTypes.STRING) {
            return JsonString.unescape(payload);
        }
        if (this == PrimitiveTypes.LONG) {
            return Long.parseLong(payload);
        }
        if (this == PrimitiveTypes.INT) {
            return Integer.parseInt(payload);
        }
        if (this == PrimitiveTypes.BOOL) {
            return Boolean.parseBoolean(payload);
        }
        if (this == PrimitiveTypes.SHORT) {
            return Short.parseShort(payload);
        }
        if (this == PrimitiveTypes.DOUBLE) {
            return Double.parseDouble(payload);
        }
        if (this == PrimitiveTypes.FLOAT) {
            return Float.parseFloat(payload);
        }
        return null;
    }
}
