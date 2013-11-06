package org.kevoree.modeling.api.persistence

import org.kevoree.modeling.api.KMFFactory
import org.kevoree.modeling.api.KMFContainer
import org.kevoree.modeling.api.trace.TraceSequence
import org.kevoree.modeling.api.compare.ModelCompare
import org.kevoree.modeling.api.trace.ModelSetTrace
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

    fun lookupFrom(basePath: String, relationInParent: String, key: String): KMFContainer? {
        return lookup("$basePath/$relationInParent[$key]")
    }

    val elem_cache: HashMap<String, KMFContainer>

    fun clearCache() {
        elem_cache.clear()
    }

    fun lookup(path: String): KMFContainer? {
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
            val typeName = datastore!!.get("type",path2)
            if(typeName != null){
                val elem = create(typeName) as KMFContainerProxy
                elem_cache.put(path2, elem)
                elem.originFactory = this
                elem.isResolved = false
                elem.setOriginPath(path2)
                return elem
            } else {
                System.out.println("Empty Type Name for " + path2);
            }
        }
        return null
    }

    /* potential optimisation, only load att or reference */
    fun getTraces(path: String): TraceSequence? {
        var sequence = compare.createSequence()
        val traces = datastore?.get("trace",path)
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
            val traces = elem.toTraces(true,true)
            val traceSeq = compare.createSequence()
            traceSeq.populate(traces)
            datastore!!.put("trace",elem.path()!!, traceSeq.exportToString())
            datastore!!.put("type",elem.path()!!, elem.metaClassName())
            if(elem is KMFContainerProxy){
                elem.originFactory = this
            }
        }
    }

    fun persist(batch: Batch) {
        for(b in batch.elements){
            persist(b)
        }
    }

    fun createBatch(): Batch {
        return Batch()
    }


}
