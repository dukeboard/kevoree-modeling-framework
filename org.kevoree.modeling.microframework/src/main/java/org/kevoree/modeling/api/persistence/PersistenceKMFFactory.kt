package org.kevoree.modeling.api.persistence

import org.kevoree.modeling.api.KMFFactory
import org.kevoree.modeling.api.KMFContainer
import org.kevoree.modeling.api.trace.TraceSequence
import org.kevoree.modeling.api.compare.ModelCompare
import java.util.HashMap

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/11/2013
 * Time: 11:05
 */

trait PersistenceKMFFactory : KMFFactory {

    var datastore: DataStore?

    var compare: ModelCompare

    fun remove(elem: KMFContainer) {
        if(datastore != null){
            datastore!!.remove("trace", elem.path()!!);
            datastore!!.remove("type", elem.path()!!);
        }
    }

    val elem_cache: HashMap<String, KMFContainer>

    fun clearCache() {
        elem_cache.clear()
    }

    fun lookup(path: String): KMFContainer? {
        return lookupFrom(path, null)
    }

    fun lookupFrom(path: String, origin: KMFContainer?): KMFContainer? {

        //TODO protect for unContains elems
        var path2 = path
        if(path2 == "/"){
            path2 = ""
        }
        if(path2.startsWith("/")){
            path2 = path2.substring(1)
        }
        if(elem_cache.containsKey(path2)){
            return elem_cache.get(path2)
        }
        if(datastore != null){
            val typeName = datastore!!.get("type", path2)
            if(typeName != null){
                val elem = create(typeName) as KMFContainerProxy
                elem_cache.put(path2, elem)
                elem.originFactory = this
                elem.isResolved = false
                elem.setOriginPath(path2)
                return elem
            } else {
                throw Exception("Empty Type Name for " + path2);
            }
        }
        return null
    }

    /* potential optimisation, only load att or reference */
    fun getTraces(origin : KMFContainer): TraceSequence? {
        var sequence = compare.createSequence()
        val traces = datastore?.get("trace", origin.path()!!)
        if(traces != null){
            sequence.populateFromString(traces)
            return sequence
        }
        return null
    }

    fun persist(elem: KMFContainer) {
        if(datastore != null){
            val traces = elem.toTraces(true, true)
            val traceSeq = compare.createSequence()
            traceSeq.populate(traces)
            datastore!!.put("trace", elem.path()!!, traceSeq.exportToString())
            datastore!!.put("type", elem.path()!!, elem.metaClassName())
            if(elem is KMFContainerProxy){
                elem.originFactory = this
            }
        }
    }

    fun persistBatch(batch: Batch) {
        for(b in batch.elements){
            persist(b)
        }
    }

    fun createBatch(): Batch {
        return Batch()
    }

    fun commit() {
        datastore?.sync()
    }

}
