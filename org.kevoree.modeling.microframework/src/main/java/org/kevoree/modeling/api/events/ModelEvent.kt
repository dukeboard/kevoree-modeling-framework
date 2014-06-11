package org.kevoree.modeling.api.events

import org.kevoree.modeling.api.util.ActionType
import org.kevoree.modeling.api.util.ElementAttributeType
import org.kevoree.modeling.api.KMFContainer

class ModelEvent(val sourcePath: String?, val etype: ActionType, val elementAttributeType: ElementAttributeType, val elementAttributeName: String, val value: Any?, val previous_value: Any?, val source : KMFContainer?) {

    override fun toString(): String {
        return "ModelEvent[src:$sourcePath, type:$etype, elementAttributeType:$elementAttributeType, elementAttributeName:$elementAttributeName, value:$value, previousValue:$previous_value]";
    }

}
