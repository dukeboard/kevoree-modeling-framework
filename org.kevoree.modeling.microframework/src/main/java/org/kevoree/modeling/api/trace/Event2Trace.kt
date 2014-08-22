package org.kevoree.modeling.api.trace

import java.util.ArrayList
import org.kevoree.modeling.api.compare.ModelCompare
import org.kevoree.modeling.api.events.ModelEvent
import org.kevoree.modeling.api.KMFContainer
import org.kevoree.modeling.api.util.ElementAttributeType
import org.kevoree.modeling.api.util.ActionType

/**
 * Created by duke on 25/07/13.
 */

class Event2Trace(val compare: ModelCompare) {

    public fun convert(event: ModelEvent): TraceSequence {
        val result = ArrayList<ModelTrace>()
        when (event.etype) {
            ActionType.REMOVE -> {
                result.add(ModelRemoveTrace(event.previousPath!!, event.elementAttributeName, event.previous_value.toString()));
            }
            ActionType.REMOVE_ALL -> {
                result.add(ModelRemoveAllTrace(event.previousPath!!, event.elementAttributeName));
            }
            ActionType.ADD -> {
                val casted = event.value as KMFContainer
                val traces = compare.inter(casted, casted)
                result.add(ModelAddTrace(event.previousPath!!, event.elementAttributeName, casted.path(), casted.metaClassName()));
                result.addAll(traces.traces)
            }
            ActionType.ADD_ALL -> {
                val casted = event.value as KMFContainer
                for (elem in casted as Iterable<*>) {
                    val elemCasted = elem as KMFContainer
                    val traces = compare.inter(elemCasted, elemCasted)
                    result.add(ModelAddTrace(event.previousPath!!, event.elementAttributeName, elemCasted.path(), elemCasted.metaClassName()));
                    result.addAll(traces.traces)
                }
            }
            ActionType.SET -> {
                if (event.elementAttributeType == ElementAttributeType.ATTRIBUTE) {
                    result.add(ModelSetTrace(event.previousPath!!, event.elementAttributeName, null, org.kevoree.modeling.api.util.AttConverter.convFlatAtt(event.value), null));
                } else {
                    result.add(ModelSetTrace(event.previousPath!!, event.elementAttributeName, (event.value as? KMFContainer)?.path(), null, null));
                }
            }
            ActionType.RENEW_INDEX -> {
            }
            else -> {
                throw Exception("Can't convert event : " + event);
            }
        }
        return TraceSequence(compare.factory).populate(result);
    }

    public fun inverse(event: ModelEvent): TraceSequence {
        val result = ArrayList<ModelTrace>()
        when (event.etype) {
            ActionType.REMOVE -> {
                result.add(ModelAddTrace(event.previousPath!!, event.elementAttributeName, (event.value as KMFContainer).path(), (event.value as KMFContainer).metaClassName()));
            }
            ActionType.REMOVE_ALL -> {
                val casted = event.value as KMFContainer
                for (elem in casted as Iterable<*>) {
                    val elemCasted = elem as KMFContainer
                    val traces = compare.inter(elemCasted, elemCasted)
                    result.add(ModelAddTrace(event.previousPath!!, event.elementAttributeName, elemCasted.path(), elemCasted.metaClassName()));
                    result.addAll(traces.traces)
                }
            }
            ActionType.ADD -> {
                val casted = event.value as KMFContainer
                val traces = compare.inter(casted, casted)
                result.add(ModelRemoveTrace(event.previousPath!!, event.elementAttributeName, casted.path()));
                result.addAll(traces.traces)
            }
            ActionType.ADD_ALL -> {
                val casted = event.value as KMFContainer
                for (elem in casted as Iterable<*>) {
                    val elemCasted = elem as KMFContainer
                    val traces = compare.inter(elemCasted, elemCasted)
                    result.add(ModelRemoveTrace(event.previousPath!!, event.elementAttributeName, elemCasted.path()));
                    result.addAll(traces.traces)
                }
            }
            ActionType.SET -> {
                if (event.elementAttributeType == ElementAttributeType.ATTRIBUTE) {
                    result.add(ModelSetTrace(event.previousPath!!, event.elementAttributeName, null, org.kevoree.modeling.api.util.AttConverter.convFlatAtt(event.previous_value), null));
                } else {
                    result.add(ModelSetTrace(event.previousPath!!, event.elementAttributeName, (event.previous_value as? KMFContainer)?.path(), null, null));
                }
            }
            ActionType.RENEW_INDEX -> {
            }
            else -> {
                throw Exception("Can't convert event : " + event);
            }
        }
        return TraceSequence(compare.factory).populate(result);
    }


}