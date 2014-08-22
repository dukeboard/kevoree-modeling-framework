package org.kevoree.modeling.api.events

import org.kevoree.modeling.api.util.ActionType
import org.kevoree.modeling.api.util.ElementAttributeType
import org.kevoree.modeling.api.KMFContainer
import org.kevoree.modeling.api.time.TimeAwareKMFContainer

class ModelEvent(val etype: ActionType, val elementAttributeType: ElementAttributeType, val elementAttributeName: String, val value: Any?, val previous_value: Any?, val source: KMFContainer?, val previousPath: String?) {

    override fun toString(): String {
        if (source is TimeAwareKMFContainer<*>) {
            return "ModelEvent[src:[${source.now}]${source.path()}, type:$etype, elementAttributeType:$elementAttributeType, elementAttributeName:$elementAttributeName, value:$value, previousValue:$previous_value]";
        } else {
            return "ModelEvent[src:${source?.path()}, type:$etype, elementAttributeType:$elementAttributeType, elementAttributeName:$elementAttributeName, value:$value, previousValue:$previous_value]";
        }
    }

}
