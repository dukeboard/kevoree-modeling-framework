package org.kevoree.modeling.api.events

import org.kevoree.modeling.api.util.ActionType
import org.kevoree.modeling.api.util.ElementAttributeType

class ModelEvent(val sourcePath: String?, val etype: ActionType, val elementAttributeType: ElementAttributeType, val elementAttributeName: String, val value: Any?, val previous_value: Any?) {
/*
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
*/
    fun toString(): String {
        return "ModelEvent[src:$sourcePath, type:$etype, elementAttributeType:$elementAttributeType, elementAttributeName:$elementAttributeName, value:$value, previousValue:$previous_value]";
    }

}
