package org.kevoree.test

import org.kevoree.container.KMFContainer
import java.util.HashMap
import org.kevoree.trace.ModelTrace
import java.util.ArrayList
import org.kevoree.container.KMFContainerImpl
import org.kevoree.trace.ModelAddTrace

/**
 * Created by duke on 26/07/13.
 */

public class ModelComparator {

    public fun diff(origin: KMFContainer, target: KMFContainer) : List<ModelTrace> {
        return internal_diff(origin,target,false);
    }

    public fun inter(origin: KMFContainer, target: KMFContainer) : List<ModelTrace> {
        return internal_diff(origin,target,true);
    }

    private fun internal_diff(origin: KMFContainer, target: KMFContainer, inter : Boolean) : List<ModelTrace> {
        val traces = ArrayList<ModelTrace>()
        val objectsMap = HashMap<String, KMFContainerImpl>()

        /* TODO do somthing with the root container, att check */
        for(child in origin.containedAllElements()){
            val childPath = child.path();
            if(childPath != null){
                objectsMap.put(child.path()!!, child as KMFContainerImpl);
            } else {
                System.err.println("Null child path "+child);
            }
        }
        for(child in target.containedAllElements()){
            val childPath = child.path();
            if(childPath != null){
                if(objectsMap.containsKey(childPath)){
                    if(inter){
                        traces.add(ModelAddTrace(child.eContainer()!!.path()!!,child.getRefInParent()!!,child.path(),child.metaClassName()))
                    }
                    traces.addAll(objectsMap.get(childPath)!!.generateDiffTraces(child,inter))
                    objectsMap.remove(childPath) //drop from to process elements
                } else {
                    if(!inter){
                        traces.add(ModelAddTrace(child.eContainer()!!.path()!!,child.getRefInParent()!!,child.path(),child.metaClassName()))
                        traces.addAll((child as KMFContainerImpl).generateDiffTraces(null,inter))
                    }
                }
            } else {
                System.err.println("Null child path "+child);
            }
        }
        if(!inter){ //if diff
               for(diffChild in objectsMap.values()){
                   traces.add(ModelAddTrace(diffChild.eContainer()!!.path()!!,diffChild.getRefInParent()!!,(diffChild as KMFContainer).path(),(diffChild as KMFContainer).metaClassName()))
                   traces.addAll((diffChild as KMFContainerImpl).generateDiffTraces(null,inter))
               }
        }
        return traces;
    }
   /*
    public fun inter(origin: KMFContainer, target: KMFContainer) {

    }
    */

}
