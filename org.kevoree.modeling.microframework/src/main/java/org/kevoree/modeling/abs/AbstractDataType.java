package org.kevoree.modeling.abs;

import org.kevoree.modeling.KType;
import org.kevoree.modeling.format.json.JsonString;
import org.kevoree.modeling.meta.KPrimitiveTypes;

public class AbstractDataType implements KType {

    final private String _name;

    final private boolean _isEnum;

    public AbstractDataType(String p_name, boolean p_isEnum) {
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

    /*
    @Override
    public String save(Object src) {
        if (src != null && this != KPrimitiveTypes.TRANSIENT) {
            if (this == KPrimitiveTypes.STRING) {
                return JsonString.encode(src.toString());
            } else {
                return src.toString();
            }
        }
        return null;
    }

    @Override
    public Object load(String payload) {
        if (this == KPrimitiveTypes.TRANSIENT) {
            return null;
        }
        if (this == KPrimitiveTypes.STRING) {
            return JsonString.unescape(payload);
        }
        if (this == KPrimitiveTypes.LONG) {
            return Long.parseLong(payload);
        }
        if (this == KPrimitiveTypes.INT) {
            return Integer.parseInt(payload);
        }
        if (this == KPrimitiveTypes.BOOL) {
            return Boolean.parseBoolean(payload);
        }
        if (this == KPrimitiveTypes.SHORT) {
            return Short.parseShort(payload);
        }
        if (this == KPrimitiveTypes.DOUBLE) {
            return Double.parseDouble(payload);
        }
        if (this == KPrimitiveTypes.FLOAT) {
            return Float.parseFloat(payload);
        }
        return null;
    }*/

}
