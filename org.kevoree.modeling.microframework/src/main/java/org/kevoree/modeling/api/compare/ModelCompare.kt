package org.kevoree.modeling.api.compare

import java.util.HashMap
import java.util.ArrayList
import org.kevoree.modeling.api.KMFContainer
import org.kevoree.modeling.api.trace.TraceSequence
import org.kevoree.modeling.api.trace.ModelTrace
import org.kevoree.modeling.api.trace.*;

/**
 * Created by duke on 26/07/13.
 */

trait ModelCompare {

    fun createSequence(): TraceSequence

    public fun diff(origin: KMFContainer, target: KMFContainer): TraceSequence {
        return createSequence().populate(internal_diff(origin, target, false, false));
    }

    public fun merge(origin: KMFContainer, target: KMFContainer): TraceSequence {
        return createSequence().populate(internal_diff(origin, target, false, true));
    }

    public fun inter(origin: KMFContainer, target: KMFContainer): TraceSequence {
        return createSequence().populate(internal_diff(origin, target, true, false));
    }

    private fun internal_diff(origin: KMFContainer, target: KMFContainer, inter: Boolean, merge: Boolean): List<ModelTrace> {
        val traces = ArrayList<ModelTrace>()
        val tracesRef = ArrayList<ModelTrace>()
        val objectsMap = HashMap <String, org.kevoree.modeling.api.KMFContainer>()
        traces.addAll(origin.createTraces(target, inter,merge, false,true))
        tracesRef.addAll(origin.createTraces(target, inter,merge, true,false))


        val visitor = object : org.kevoree.modeling.api.util.ModelVisitor(){
            override public fun visit(elem: org.kevoree.modeling.api.KMFContainer, refNameInParent: String, parent: org.kevoree.modeling.api.KMFContainer) {
                val childPath = elem.path();
                if(childPath != null){
                    objectsMap.put(childPath, elem);
                } else {
                    throw Exception("Null child path " + elem);
                }
            }
        }
        origin.visit(visitor, true, true, false)

        val visitor2 = object : org.kevoree.modeling.api.util.ModelVisitor(){
            override public fun visit(elem: org.kevoree.modeling.api.KMFContainer, refNameInParent: String, parent: org.kevoree.modeling.api.KMFContainer) {
                val childPath = elem.path();
                if(childPath != null){
                    if(objectsMap.containsKey(childPath)){
                        if(inter){
                            traces.add(ModelAddTrace(parent.path()!!, refNameInParent, elem.path(), elem.metaClassName()))
                        }
                        traces.addAll(objectsMap.get(childPath)!!.createTraces(elem, inter,merge, false,true))
                        tracesRef.addAll(objectsMap.get(childPath)!!.createTraces(elem, inter,merge, true,false))
                        objectsMap.remove(childPath) //drop from to process elements
                    } else {
                        if(!inter){
                            traces.add(ModelAddTrace(parent.path()!!, refNameInParent, elem.path(), elem.metaClassName()))
                            traces.addAll(elem.createTraces(elem, true,merge, false,true))
                            tracesRef.addAll(elem.createTraces(elem, true,merge, true,false))
                        }
                    }
                } else {
                    throw Exception("Null child path " + elem);
                }
            }
        }
        target.visit(visitor2, true, true, false)

        if(!inter){
            //if diff
            if(!merge){
                for(diffChild in objectsMap.values()){
                    val src = (if(diffChild.eContainer() != null){diffChild.eContainer()!!.path()!!}else{"null"})
                    val refNameInParent = (if(diffChild.getRefInParent() != null){diffChild.getRefInParent()!!}else{"null"})
                    traces.add(ModelRemoveTrace(src, refNameInParent, (diffChild as KMFContainer).path()!!))
                }
            }
        }
        traces.addAll(tracesRef);
        return traces;
    }

}
