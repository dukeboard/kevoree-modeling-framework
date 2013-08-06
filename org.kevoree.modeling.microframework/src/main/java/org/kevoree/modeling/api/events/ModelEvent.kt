package org.kevoree.modeling.api.events

class ModelEvent(val internal_sourcePath: String?, val internal_etype: Int, val internal_elementAttributeType: Int, val internal_elementAttributeName: String, val internal_value: Any?) {
                      /*
    private val PsourcePath: String?
    private val Petype: Int
    private val PelementAttributeType: Int
    private val PelementAttributeName: String
    private val Pvalue: Any?
                    */
    /*
    {
        _sourcePath = internal_sourcePath
        _etype = internal_etype
        _elementAttributeType = internal_elementAttributeType
        _elementAttributeName = internal_elementAttributeName
        _value = internal_value
    }        */

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
