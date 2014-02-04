package org.kevoree.modeling.api.events;

import org.kevoree.modeling.api.util.ElementAttributeType;
import org.kevoree.modeling.api.util.ActionType;

@:keep
class ModelEvent {

    public function new( sourcePath: String, etype: ActionType, elementAttributeType: ElementAttributeType, elementAttributeName: String, value: Dynamic,previous_value: Dynamic ) {
        this.internal_sourcePath = sourcePath;
        this.internal_etype = etype;
        this.internal_elementAttributeType = elementAttributeType;
        this.internal_elementAttributeName = elementAttributeName;
        this.internal_value = value;
        this.internal_previous_value = previous_value;
    }

    private var internal_sourcePath:String;

    private var internal_etype:ActionType;

    private var internal_elementAttributeType:ElementAttributeType;

    private var internal_elementAttributeName:Dynamic;

    private var internal_value:String;

    private var internal_previous_value:Dynamic;

    function getSourcePath():String {
        return internal_sourcePath;
    }

    function getType():ActionType {
        return internal_etype;
    }

    function getElementAttributeType():ElementAttributeType {
        return internal_elementAttributeType;
    }

    function getElementAttributeName():String {
        return internal_elementAttributeName;
    }

    function getValue():Dynamic {
        return internal_value;
    }

    function getPreviousValue():Dynamic {
        return internal_previous_value;
    }

    function toString():String {
        return "ModelEvent[src:" + getSourcePath() + ", type:" + getType() + ", elementAttributeType:" + getElementAttributeType() + ", elementAttributeName:" + getElementAttributeName() + ", value:" + getValue() + "]";
    }

}
