package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.KMetaType;

/**
 * Created by duke on 12/01/15.
 */
public abstract class AbstractKDataType implements KMetaType {

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

}
