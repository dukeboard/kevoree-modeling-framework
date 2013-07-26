package org.kevoree.test.trace

//TODO more generic import
import org.kevoree.events.ModelEvent
import org.kevoree.events.ModelEvent.EventType
import org.kevoree.container.KMFContainer
import org.kevoree.trace.ModelTrace
import org.kevoree.trace.ModelRemoveTrace
import org.kevoree.trace.ModelRemoveAllTrace
import org.kevoree.trace.ModelAddTrace
import org.kevoree.trace.ModelSetTrace

/**
 * Created by duke on 25/07/13.
 */

public class Model2Trace {

    public fun convert(event: ModelEvent): ModelTrace? {

        if(event.getType().equals(EventType.remove) && event.getValue() is KMFContainer){
            return ModelRemoveTrace(event.getSourcePath()!!, event.getElementAttributeName()!!, (event.getValue() as KMFContainer).path()!!)
        }
        if(event.getType().equals(EventType.removeAll)){
            return ModelRemoveAllTrace(event.getSourcePath()!!, event.getElementAttributeName()!!)
        }
        if(event.getType().equals(EventType.add) && event.getValue() is KMFContainer){
            val casted = event.getValue() as KMFContainer
            return ModelAddTrace(event.getSourcePath()!!, event.getElementAttributeName()!!, casted.path(), casted.metaClassName())
        }
        if(event.getType().equals(EventType.set) && event.getValue() is KMFContainer){
            return ModelSetTrace(event.getSourcePath()!!, event.getElementAttributeName()!!, (event.getValue() as KMFContainer).path(), "")
        }
        if(event.getType().equals(EventType.set)){
            //TODO better serialization
            return ModelSetTrace(event.getSourcePath()!!, event.getElementAttributeName()!!, null, event.getValue().toString())
        }
        System.err.println("Can't convert event : " + event);
        return null;
    }

}