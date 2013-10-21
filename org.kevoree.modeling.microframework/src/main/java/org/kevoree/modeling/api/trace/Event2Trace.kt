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
        when(event.getType()) {
            ActionType.REMOVE -> {
                result.add(ModelRemoveTrace(event.getSourcePath()!!, event.getElementAttributeName(), (event.getValue() as KMFContainer).path()!!));
            }
            ActionType.REMOVE_ALL -> {
                result.add(ModelRemoveAllTrace(event.getSourcePath()!!, event.getElementAttributeName()));
            }
            ActionType.ADD -> {
                val casted = event.getValue() as KMFContainer
                val traces = compare.inter(casted, casted)
                result.add(ModelAddTrace(event.getSourcePath()!!, event.getElementAttributeName(), casted.path(), casted.metaClassName()));
                result.addAll(traces.traces)
            }
            ActionType.ADD_ALL -> {
                val casted = event.getValue() as KMFContainer
                for(elem in casted as Iterable<*>){
                    val elemCasted = elem as KMFContainer
                    val traces = compare.inter(elemCasted, elemCasted)
                    result.add(ModelAddTrace(event.getSourcePath()!!, event.getElementAttributeName(), elemCasted.path(), elemCasted.metaClassName()));
                    result.addAll(traces.traces)
                }
            }
            ActionType.SET -> {
                if(event.getElementAttributeType() == ElementAttributeType.ATTRIBUTE){
                    result.add(ModelSetTrace(event.getSourcePath()!!, event.getElementAttributeName(), null, event.getValue().toString(), null));
                } else {
                    result.add(ModelSetTrace(event.getSourcePath()!!, event.getElementAttributeName(), (event.getValue() as KMFContainer).path(), null, null));
                }
            }
            ActionType.RENEW_INDEX -> {
            }
            else -> {
                throw Exception("Can't convert event : " + event);
            }
        }
        return compare.createSequence().populate(result);
    }

    public fun inverse(event: ModelEvent): TraceSequence {
        val result = ArrayList<ModelTrace>()
        when(event.getType()) {
            ActionType.REMOVE -> {
                result.add(ModelAddTrace(event.getSourcePath()!!, event.getElementAttributeName(), (event.getValue() as KMFContainer).path()!!, (event.getValue() as KMFContainer).metaClassName()));
            }
            ActionType.REMOVE_ALL -> {
                val casted = event.getValue() as KMFContainer
                for(elem in casted as Iterable<*>){
                    val elemCasted = elem as KMFContainer
                    val traces = compare.inter(elemCasted, elemCasted)
                    result.add(ModelAddTrace(event.getSourcePath()!!, event.getElementAttributeName(), elemCasted.path(), elemCasted.metaClassName()));
                    result.addAll(traces.traces)
                }
            }
            ActionType.ADD -> {
                val casted = event.getValue() as KMFContainer
                val traces = compare.inter(casted, casted)
                result.add(ModelRemoveTrace(event.getSourcePath()!!, event.getElementAttributeName(), casted.path()!!));
                result.addAll(traces.traces)
            }
            ActionType.ADD_ALL -> {
                val casted = event.getValue() as KMFContainer
                for(elem in casted as Iterable<*>){
                    val elemCasted = elem as KMFContainer
                    val traces = compare.inter(elemCasted, elemCasted)
                    result.add(ModelRemoveTrace(event.getSourcePath()!!, event.getElementAttributeName(), elemCasted.path()!!));
                    result.addAll(traces.traces)
                }
            }
            ActionType.SET -> {
                if(event.getElementAttributeType() == ElementAttributeType.ATTRIBUTE){
                    result.add(ModelSetTrace(event.getSourcePath()!!, event.getElementAttributeName(), null, event.getPreviousValue().toString(), null));
                } else {
                    result.add(ModelSetTrace(event.getSourcePath()!!, event.getElementAttributeName(), (event.getPreviousValue() as KMFContainer).path(), null, null));
                }
            }
            ActionType.RENEW_INDEX -> {
            }
            else -> {
                throw Exception("Can't convert event : " + event);
            }
        }
        return compare.createSequence().populate(result);
    }


}