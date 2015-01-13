package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.KMetaType;
import org.kevoree.modeling.api.meta.PrimitiveMetaTypes;

/**
 * Created by duke on 12/01/15.
 */
public class AbstractKDataType implements KMetaType {

    private String _name;

    private boolean _isEnum = false;

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
        if (src != null) {
            return src.toString();
        }
        return "";
    }

    @Override
    public Object load(String payload) {
        if (this == PrimitiveMetaTypes.STRING) {
            return payload;
        }
        if (this == PrimitiveMetaTypes.LONG) {
            return Long.parseLong(payload);
        }
        if (this == PrimitiveMetaTypes.INT) {
            return Integer.parseInt(payload);
        }
        if (this == PrimitiveMetaTypes.BOOL) {
            return payload.equals("true");
        }
        if (this == PrimitiveMetaTypes.SHORT) {
            return Short.parseShort(payload);
        }
        if (this == PrimitiveMetaTypes.DOUBLE) {
            return Double.parseDouble(payload);
        }
        if (this == PrimitiveMetaTypes.FLOAT) {
            return Float.parseFloat(payload);
        }
        return null;
    }
}
