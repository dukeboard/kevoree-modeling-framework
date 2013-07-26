package org.kevoree.test

import org.kevoree.container.KMFContainer
import java.util.HashMap
import org.kevoree.trace.ModelTrace
import java.util.ArrayList

/**
 * Created by duke on 26/07/13.
 */

public class ModelComparator {

    private fun internal_diff(origin: KMFContainer, target: KMFContainer, inter : Boolean) : List<ModelTrace> {
        val traces = ArrayList<ModelTrace>()
        val objectsMap = HashMap<String, KMFContainer>()

        /* TODO do somthing with the root container, att check */
        for(child in origin.containedAllElements()){
            val childPath = child.path();
            if(childPath != null){
                objectsMap.put(child.path()!!, child);
            } else {
                System.err.println("Null child path "+child);
            }
        }
        for(child in target.containedAllElements()){
            val childPath = child.path();
            if(childPath != null){
                if(objectsMap.containsKey(childPath)){
                    if(inter){

                    } else {

                    }
                } else {
                    if(inter){

                    } else {

                    }
                }

                objectsMap.put(child.path()!!, child);
            } else {
                System.err.println("Null child path "+child);
            }
        }
        return traces;
    }
   /*
    public fun inter(origin: KMFContainer, target: KMFContainer) {

    }
    */

}
