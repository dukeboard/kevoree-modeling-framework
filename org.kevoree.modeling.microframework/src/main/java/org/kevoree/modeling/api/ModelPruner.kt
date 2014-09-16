package org.kevoree.modeling.api

import org.kevoree.modeling.api.trace.TraceSequence
import java.util.ArrayList
import org.kevoree.modeling.api.trace.ModelTrace
import java.util.HashMap
import org.kevoree.modeling.api.util.ModelVisitor
import org.kevoree.modeling.api.trace.ModelAddTrace

/**
 * Created by duke on 8/27/14.
 *
 * special note for AngevinSacAVin :-)
 *
 */

public class ModelPruner(val factory: KMFFactory) {

    public fun prune(elems: List<KMFContainer>): TraceSequence {
        val traces = ArrayList<ModelTrace>()
        val tempMap = HashMap<String, KMFContainer>()
        val parentMap = HashMap<String, KMFContainer>()
        for (elem in elems) {
            internal_prune(elem, traces, tempMap, parentMap)
        }
        for(toLinkKey in tempMap.keySet()){
            val toLink = tempMap.get(toLinkKey)!!
            traces.addAll(toLink.toTraces(false,true))
        }
        return TraceSequence(factory).populate(traces)
    }

    private fun internal_prune(elem: KMFContainer, traces: MutableList<ModelTrace>, cache: MutableMap<String, KMFContainer>, parentMap: MutableMap<String, KMFContainer>) {
        //collect parent which as not be added already
        val parents: MutableList<KMFContainer> = ArrayList<KMFContainer>()
        var currentParent = elem.eContainer()
        while (currentParent != null && parentMap.get(currentParent!!.path()) == null && cache.get(currentParent!!.path()) == null) {
            parents.add(currentParent!!)
            currentParent = currentParent!!.eContainer()
        }
        //Reverse the list (Top to Bottom, add only attributes from parents)
        for (parent in parents.reverse()) {
            if (parent.eContainer() != null) {
                traces.add(ModelAddTrace(parent.eContainer()!!.path(), parent.getRefInParent()!!, parent.path(), parent.metaClassName()))
            }
            traces.addAll(parent.toTraces(true, false))
            parentMap.put(parent.path(), parent)
        }
        //Add attributes and references of pruned object
        if (cache.get(elem.path()) == null && parentMap.get(elem.path()) == null) {
            if (elem.eContainer() != null) {
                traces.add(ModelAddTrace(elem.eContainer()!!.path(), elem.getRefInParent()!!, elem.path(), elem.metaClassName()))
            }
            traces.addAll(elem.toTraces(true, false))
        }
        //We register this element as reachable
        cache.put(elem.path(), elem)
        //We continue to all reachable elements, potentially here we can exclude references
        elem.visitReferences(object : ModelVisitor() {
            override fun visit(elem: KMFContainer, refNameInParent: String, parent: KMFContainer) {
                if (cache.get(elem.path()) == null) {
                    //break potential loop
                    internal_prune(elem, traces, cache, parentMap)
                }
            }
        })
    }


}