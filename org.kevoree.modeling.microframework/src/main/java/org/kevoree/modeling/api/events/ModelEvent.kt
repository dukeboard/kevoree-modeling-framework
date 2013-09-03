package org.kevoree.modeling.api.events

class ModelEvent(val internal_sourcePath: String?, val internal_etype: Int, val internal_elementAttributeType: Int, val internal_elementAttributeName: String, val internal_value: Any?) {

    fun getSourcePath(): String? {
        return internal_sourcePath;
    }

    fun getType(): Int {
        return internal_etype;
    }

    fun getElementAttributeType(): Int {
        return internal_elementAttributeType;
    }

    fun getElementAttributeName(): String {
        return internal_elementAttributeName;
    }

    fun getValue(): Any? {
        return internal_value;
    }

    fun toString(): String {
        return "ModelEvent[src:" + getSourcePath() + ", type:" + getType() + ", elementAttributeType:" + getElementAttributeType() + ", elementAttributeName:" + getElementAttributeName() + ", value:" + getValue() + "]";
    }

}
