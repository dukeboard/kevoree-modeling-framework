package org.kevoree.modeling.api.persistence

import org.kevoree.modeling.api.KMFFactory
import org.kevoree.modeling.api.KMFContainer
import org.kevoree.modeling.api.trace.TraceSequence
import org.kevoree.modeling.api.compare.ModelCompare
import java.util.HashMap
import org.kevoree.modeling.api.events.ModelElementListener
import org.kevoree.modeling.api.events.ModelEvent
import org.kevoree.modeling.api.util.InboundRefAware
import org.kevoree.modeling.api.time.TimeSegment
import org.kevoree.modeling.api.time.blob.MetaHelper
import java.util.ArrayList

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/11/2013
 * Time: 11:05
 */

trait PersistenceKMFFactory : KMFFactory, ModelElementListener {

    var datastore: DataStore?

    var compare: ModelCompare

    fun remove(elem: KMFContainer) {
        if (datastore != null) {
            datastore!!.remove(TimeSegment.RAW.name(), elem.path());
            datastore!!.remove("type", elem.path());
        }
        elem_cache.remove(elem.path())
        modified_elements.remove(elem.hashCode().toString())
    }

    val elem_cache: HashMap<String, KMFContainer>

    val elementsToBeRemoved: MutableSet<String>

    val modified_elements: HashMap<String, KMFContainer>

    fun notify(elem: KMFContainer) {
        modified_elements.put(elem.hashCode().toString(), elem)
    }

    fun cleanUnusedPaths(path: String) {
        if (datastore != null) {
            datastore!!.remove(TimeSegment.RAW.name(), path);
            datastore!!.remove("type", path);
        }
        elem_cache.remove(path)
    }

    protected fun persist(elem: KMFContainer) {

        val elemPath = elem.path()
        if (elemPath == "") {
            throw Exception("Internal error, empty path found during persist method " + elem)
        }

        if (!elemPath.startsWith("/")) {
            throw Exception("Cannot persist, because the path of the element do not refer to a root: " + elemPath + " -> " + elem)
        }

        if (datastore != null) {
            val traces = elem.toTraces(true, true)
            val traceSeq = compare.createSequence()
            traceSeq.populate(traces)
            datastore!!.put(TimeSegment.RAW.name(), elemPath, traceSeq.exportToString())

            val castedInBounds = elem as InboundRefAware
            val saved = MetaHelper.serialize(castedInBounds.internal_inboundReferences)
            datastore!!.put(TimeSegment.RAW.name(), "${elemPath}#", saved)

            datastore!!.put("type", elemPath, elem.metaClassName())
            if (elem is KMFContainerProxy) {
                elem.originFactory = this
            }
        }
    }

    fun commit() {
        val keys = modified_elements.keySet().toList()
        for (elem in keys) {
            val resolved = modified_elements.get(elem)
            if (resolved != null) {
                if (resolved.path() == "") {
                    if (!resolved.isDeleted()) {
                        resolved.delete()
                    } else {
                        modified_elements.remove(elem)
                    }
                }
            }
        }
        for (elem in modified_elements.values()) {
            persist(elem)
            elementsToBeRemoved.remove(elem.path())
        }
        for (e in elementsToBeRemoved) {
            cleanUnusedPaths(e)
        }
        datastore?.sync()
        clearCache()
    }

    fun rollback() {
        //TODO
        clearCache()
    }

    protected fun clearCache() {
        for (elem in elem_cache.values()) {
            elem.removeModelElementListener(this)
        }
        elem_cache.clear()
        modified_elements.clear()
        elementsToBeRemoved.clear()
    }

    override fun elementChanged(evt: ModelEvent) {
        modified_elements.put(evt.source!!.hashCode().toString(), evt.source)
    }

    protected fun monitor(elem: KMFContainer) {
        elem.addModelElementListener(this)
    }

    fun lookup(path: String): KMFContainer? {
        if (path == "") {
            return null
        }
        if (elem_cache.containsKey(path)) {
            return elem_cache.get(path)
        }
        if (datastore != null) {
            val typeName = datastore!!.get("type", path)
            if (typeName != null) {
                val elem = create(typeName) as KMFContainerProxy
                elem_cache.put(path, elem)
                elem.isResolved = false
                elem.setOriginPath(path)
                monitor(elem)
                return elem
            }
        }
        return null
    }

    /* potential optimisation, only load att or reference */
    fun getTraces(origin: KMFContainer): TraceSequence? {
        var sequence = compare.createSequence()
        val traces = datastore?.get(TimeSegment.RAW.name(), origin.path())
        if (traces != null) {
            sequence.populateFromString(traces)
            return sequence
        }
        return null
    }

    fun loadInbounds(elem: KMFContainer) {
        val castedInBounds = elem as InboundRefAware
        val payload = datastore!!.get(TimeSegment.RAW.name(), "${elem.path()}#")
        if (payload != null) {
            castedInBounds.internal_inboundReferences = MetaHelper.unserialize(payload, this)
        }
    }

    override fun select(query: String): List<KMFContainer> {
        val localRoot = lookup("/")
        if (localRoot != null) {
            return localRoot.select(query)
        } else {
            return ArrayList<KMFContainer>()
        }
    }


}
