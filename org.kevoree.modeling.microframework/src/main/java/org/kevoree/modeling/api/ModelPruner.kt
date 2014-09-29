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

public class ModelPruner(val factory: KFactory) {

    public fun prune(elems: List<KObject>): TraceSequence {
        val traces = ArrayList<ModelTrace>()
        val tempMap = HashMap<String, KObject>()
        val parentMap = HashMap<String, KObject>()
        for (elem in elems) {
            internal_prune(elem, traces, tempMap, parentMap)
        }
        for (toLinkKey in tempMap.keySet()) {
            val toLink = tempMap.get(toLinkKey)!!
            traces.addAll(toLink.toTraces(false, true))
        }
        return TraceSequence(factory).populate(traces)
    }

    private fun internal_prune(elem: KObject, traces: MutableList<ModelTrace>, cache: MutableMap<String, KObject>, parentMap: MutableMap<String, KObject>) {
        //collect parent which as not be added already
        val parents: MutableList<KObject> = ArrayList<KObject>()
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
            override fun visit(elem: KObject, refNameInParent: String, parent: KObject) {
                if (cache.get(elem.path()) == null) {
                    //break potential loop
                    internal_prune(elem, traces, cache, parentMap)
                }
            }
        })
    }


}