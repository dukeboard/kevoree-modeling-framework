package org.kevoree.test.trace

import org.kevoree.events.ModelEvent
import org.kevoree.container.KMFContainer
import org.kevoree.trace.ModelTrace
import org.kevoree.trace.ModelRemoveTrace
import org.kevoree.trace.ModelRemoveAllTrace
import org.kevoree.trace.ModelAddTrace
import org.kevoree.trace.ModelSetTrace
import org.kevoree.trace.ModelAddAllTrace
import java.util.ArrayList
import org.kevoree.util.ActionType
import org.kevoree.compare.ModelCompare
import org.kevoree.util.ElementAttributeType

//TODO more generic import
/**
 * Created by duke on 25/07/13.
 */

public class Event2Trace {

    val compare = ModelCompare()

    public fun convert(event: ModelEvent): List<ModelTrace> {
        val result = ArrayList<ModelTrace>()
        when(event.getType()){
            ActionType.REMOVE -> {
                result.add(ModelRemoveTrace(event.getSourcePath()!!, event.getElementAttributeName()!!, (event.getValue() as KMFContainer).path()!!));
            }
            ActionType.REMOVE -> {
                result.add(ModelRemoveAllTrace(event.getSourcePath()!!, event.getElementAttributeName()!!));
            }
            ActionType.ADD -> {
                val casted = event.getValue() as KMFContainer
                val traces = compare.inter(casted, casted)
                result.add(ModelAddTrace(event.getSourcePath()!!, event.getElementAttributeName()!!, casted.path(), casted.metaClassName()));
                result.addAll(traces)
            }
            ActionType.ADD_ALL -> {
                val casted = event.getValue() as KMFContainer
                val paths = ArrayList<String>()
                val types = ArrayList<String>()
                for(elem in casted as Iterable<Any>){
                    val elemCasted = elem as KMFContainer
                    paths.add(elemCasted.path()!!)
                    types.add(elemCasted.metaClassName())
                }
                result.add(ModelAddAllTrace(event.getSourcePath()!!, event.getElementAttributeName()!!, paths, types));
                throw Exception("Not Implemented Yet !!! must respect order")
                /*
                for(elem in casted as Iterable<Any>){
                    val elemCasted = elem as KMFContainer
                    paths.add(elemCasted.path()!!)
                    types.add(elemCasted.metaClassName())
                }  */
            }
            ActionType.SET -> {
                if(event.getElementAttributeType() == ElementAttributeType.ATTRIBUTE){
                    result.add(ModelSetTrace(event.getSourcePath()!!, event.getElementAttributeName()!!, null, event.getValue().toString(), null));
                } else {
                    result.add(ModelSetTrace(event.getSourcePath()!!, event.getElementAttributeName()!!, (event.getValue() as KMFContainer).path(), null,null));
                }
            }
            else -> {
                System.err.println("Can't convert event : " + event);
            }
        }
        return result;
    }

}