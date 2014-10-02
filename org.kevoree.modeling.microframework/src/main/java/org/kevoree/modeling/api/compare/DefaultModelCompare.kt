package org.kevoree.modeling.api.compare

import org.kevoree.modeling.api.KFactory
import org.kevoree.modeling.api.ModelCompare
import org.kevoree.modeling.api.KObject
import org.kevoree.modeling.api.trace.TraceSequence
import org.kevoree.modeling.api.Callback

/**
 * Created by duke on 26/07/13.
 */

public class DefaultModelCompare(val factory: KFactory) : ModelCompare {

    override fun merge(origin: KObject<Any?>, target: KObject<Any?>, callback: Callback<TraceSequence>) {
        throw UnsupportedOperationException()
    }
    override fun inter(origin: KObject<Any?>, target: KObject<Any?>, callback: Callback<TraceSequence>) {
        throw UnsupportedOperationException()
    }

    override fun diff(origin: KObject<Any?>, target: KObject<Any?>, callback: Callback<TraceSequence>) {
        throw UnsupportedOperationException()
    }

    /*

    public fun diff(origin: KObject, target: KObject): TraceSequence {
        return TraceSequence(factory).populate(internal_diff(origin, target, false, false));
    }

    public fun merge(origin: KObject, target: KObject): TraceSequence {
        return TraceSequence(factory).populate(internal_diff(origin, target, false, true));
    }

    public fun inter(origin: KObject, target: KObject): TraceSequence {
        return TraceSequence(factory).populate(internal_diff(origin, target, true, false));
    }

    private fun internal_diff(origin: KObject, target: KObject, inter: Boolean, merge: Boolean): List<ModelTrace> {
        val traces = ArrayList<ModelTrace>()
        val tracesRef = ArrayList<ModelTrace>()
        val objectsMap = HashMap <String, org.kevoree.modeling.api.KObject>()
        traces.addAll(origin.createTraces(target, inter, merge, false, true))
        tracesRef.addAll(origin.createTraces(target, inter, merge, true, false))


        val visitor = object : org.kevoree.modeling.api.ModelVisitor() {
            override public fun visit(elem: org.kevoree.modeling.api.KObject, refNameInParent: String, parent: org.kevoree.modeling.api.KObject) {
                val childPath = elem.path();
                if (childPath != null) {
                    objectsMap.put(childPath, elem);
                } else {
                    throw Exception("Null child path " + elem);
                }
            }
        }
        origin.visit(visitor, true, true, false)

        val visitor2 = object : org.kevoree.modeling.api.ModelVisitor() {
            override public fun visit(elem: org.kevoree.modeling.api.KObject, refNameInParent: String, parent: org.kevoree.modeling.api.KObject) {
                val childPath = elem.path();
                if (objectsMap.containsKey(childPath)) {
                    if (inter) {
                        traces.add(ModelAddTrace(parent.path(), refNameInParent, elem.path(), elem.metaClassName()))
                    }
                    traces.addAll(objectsMap.get(childPath)!!.createTraces(elem, inter, merge, false, true))
                    tracesRef.addAll(objectsMap.get(childPath)!!.createTraces(elem, inter, merge, true, false))
                    objectsMap.remove(childPath) //drop from to process elements
                } else {
                    if (!inter) {
                        traces.add(ModelAddTrace(parent.path(), refNameInParent, elem.path(), elem.metaClassName()))
                        traces.addAll(elem.createTraces(elem, true, merge, false, true))
                        tracesRef.addAll(elem.createTraces(elem, true, merge, true, false))
                    }
                }
            }
        }
        target.visit(visitor2, true, true, false)
        traces.addAll(tracesRef); //references should be deleted before, deletion of elements
        if (!inter) {
            //if diff
            if (!merge) {
                for (diffChildKey in objectsMap.keySet()) {
                    val diffChild = objectsMap.get(diffChildKey)!!
                    val src = (if (diffChild.eContainer() != null) {
                        diffChild.eContainer()!!.path()
                    } else {
                        "null"
                    })
                    val refNameInParent = (if (diffChild.getRefInParent() != null) {
                        diffChild.getRefInParent()!!
                    } else {
                        "null"
                    })
                    traces.add(ModelRemoveTrace(src, refNameInParent, (diffChild as KObject).path()))
                }
            }
        }
        return traces;
    }

    */

}
