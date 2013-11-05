package org.kevoree.modeling.api.persistence

import org.kevoree.modeling.api.KMFFactory
import org.kevoree.modeling.api.KMFContainer
import org.kevoree.modeling.api.trace.TraceSequence
import org.kevoree.modeling.api.compare.ModelCompare
import org.kevoree.modeling.api.trace.ModelSetTrace

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/11/2013
 * Time: 11:05
 */

trait PersistenceKMFFactory : KMFFactory {

    var datastore: DataStore?

    var compare: ModelCompare

    fun lookup(path: String): KMFContainer? {
        if(datastore != null){
            val typeName = datastore!!.get("type_" + path)
            if(typeName != null){
                val elem = create(typeName) as KMFContainerProxy
                elem.originFactory = this
                elem.setOriginPath(path)
                return elem
            }
        }
        return null
    }

    /* potential optimisation, only load att or reference */
    fun getTraces(path: String): TraceSequence? {
        var sequence = compare.createSequence()
        val traces = datastore?.get(path)
        if(traces != null){
            sequence.populateFromString(traces)
            return sequence
        }
        return null
    }

    fun instrumentElem(elem: KMFContainer) {
        //put listener
    }

    fun persist(elem: KMFContainer) {
        if(datastore != null){
            val traces = compare.inter(elem, elem)
            for(trace in traces.traces.toList()){
                if(trace !is ModelSetTrace){
                    traces.traces.remove(trace)
                }
            }
            datastore!!.put(elem.path()!!, traces.exportToString())
            datastore!!.put("type_" + elem.path()!!, elem.metaClassName())
            if(elem is KMFContainerProxy){
                elem.originFactory = this
            }
        }
    }

}
