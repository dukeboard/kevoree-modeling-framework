package org.kevoree.modeling.api.events

import org.kevoree.modeling.api.util.ActionType
import org.kevoree.modeling.api.util.ElementAttributeType

class ModelEvent(val internal_sourcePath: String?, val internal_etype: ActionType, val internal_elementAttributeType: ElementAttributeType, val internal_elementAttributeName: String, val internal_value: Any?,val internal_previous_value: Any?) {

    fun getSourcePath(): String? {
        return internal_sourcePath;
    }

    fun getType(): ActionType {
        return internal_etype;
    }

    fun getElementAttributeType(): ElementAttributeType {
        return internal_elementAttributeType;
    }

    fun getElementAttributeName(): String {
        return internal_elementAttributeName;
    }

    fun getValue(): Any? {
        return internal_value;
    }

    fun getPreviousValue(): Any? {
        return internal_previous_value;
    }

    fun toString(): String {
        return "ModelEvent[src:" + getSourcePath() + ", type:" + getType() + ", elementAttributeType:" + getElementAttributeType() + ", elementAttributeName:" + getElementAttributeName() + ", value:" + getValue() + "]";
    }

}
