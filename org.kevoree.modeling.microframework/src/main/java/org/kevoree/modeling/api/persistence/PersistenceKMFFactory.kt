package org.kevoree.modeling.api.persistence

import org.kevoree.modeling.api.KMFFactory
import org.kevoree.modeling.api.KMFContainer
import org.kevoree.modeling.api.trace.TraceSequence
import org.kevoree.modeling.api.events.ModelElementListener
import org.kevoree.modeling.api.events.ModelEvent
import org.kevoree.modeling.api.util.InboundRefAware
import org.kevoree.modeling.api.time.TimeSegment
import org.kevoree.modeling.api.time.blob.MetaHelper
import java.util.ArrayList
import org.kevoree.modeling.api.Transaction

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/11/2013
 * Time: 11:05
 */

trait PersistenceKMFFactory : KMFFactory, ModelElementListener {

    val datastore: DataStore

    var dirty: Boolean

    val originTransaction: Transaction

    fun remove(elem: KMFContainer) {
        datastore.remove(TimeSegment.RAW.name(), elem.path());
        datastore.remove("type", elem.path());
        elem_cache.remove(elem.path())
        modified_elements.remove(elem.hashCode().toString() + elem.internalGetKey())
    }

    val elem_cache: MutableMap<String, KMFContainer>

    val elementsToBeRemoved: MutableSet<String>

    val modified_elements: MutableMap<String, KMFContainer>

    fun notify(elem: KMFContainer) {
        if (elem.internalGetKey() != null) {
            val key = elem.hashCode().toString() + elem.internalGetKey()
            if (modified_elements.get(key) == null) {
                modified_elements.put(key, elem)
            }
            if (elem.path().startsWith("/")) {
                elem_cache.put(elem.path(), elem)
            }
        }
        if (elem is KMFContainerProxy && !elem.isDirty) {
            elem.isDirty = true
        }
    }

    fun cleanUnusedPaths(path: String) {
        datastore.remove(TimeSegment.RAW.name(), path);
        datastore.remove("type", path);
        elem_cache.remove(path)
    }

    protected fun persist(elem: KMFContainer) {
        if (elem is KMFContainerProxy && !elem.isDirty) {
            return;
        }
        val elemPath = elem.path()
        if (elemPath == "") {
            throw Exception("Internal error, empty path found during persist method " + elem)
        }
        if (!elemPath.startsWith("/")) {
            throw Exception("Cannot persist, because the path of the element do not refer to a root: " + elemPath + " -> " + elem)
        }
        val traces = elem.toTraces(true, true)
        val traceSeq = TraceSequence(this)
        traceSeq.populate(traces)
        datastore.put(TimeSegment.RAW.name(), elemPath, traceSeq.exportToString())
        val castedInBounds = elem as InboundRefAware
        val saved = MetaHelper.serialize(castedInBounds.internal_inboundReferences)
        datastore.put(TimeSegment.RAW.name(), "${elemPath}#", saved)
        datastore.put("type", elemPath, elem.metaClassName())
        if (elem is KMFContainerProxy) {
            elem.originFactory = this
        }
    }

    fun endCommit() {
        datastore.commit()
    }

    fun commit() {
        if (!dirty) {
            return
        }
        val keys = modified_elements.keySet().toList()
        for (elem in keys) {
            val resolved = modified_elements.get(elem)
            if (resolved != null) {
                if (!resolved.path().startsWith("/")) {
                    if (!resolved.isDeleted()) {
                        resolved.delete()
                    }
                    modified_elements.remove(elem)
                }
            }
        }
        for (elemKey in modified_elements.keySet()) {
            val elem = modified_elements.get(elemKey)!!
            persist(elem)
            elementsToBeRemoved.remove(elem.path())
        }
        for (e in elementsToBeRemoved) {
            cleanUnusedPaths(e)
        }
    }

    fun clear() {
        for (elemKey in elem_cache.keySet()) {
            val elem = elem_cache.get(elemKey)!!
            elem.removeModelElementListener(this)
        }
        elem_cache.clear()
        modified_elements.clear()
        elementsToBeRemoved.clear()
    }

    override fun elementChanged(evt: ModelEvent) {
        (evt.source as KMFContainerProxy).isDirty = true
        notify(evt.source)
    }

    protected fun monitor(elem: KMFContainer) {
        if (!dirty) {
            dirty = true
        }
        elem.addModelElementListener(this)
    }

    override fun lookup(path: String): KMFContainer? {
        if (path == "") {
            return null
        }
        if (elem_cache.containsKey(path)) {
            return elem_cache.get(path)
        }
        val typeName = datastore.get("type", path)
        if (typeName != null) {
            val elem = create(typeName) as KMFContainerProxy
            elem_cache.put(path, elem)
            elem.isResolved = false
            elem.setOriginPath(path)
            monitor(elem)
            return elem
        }
        return null
    }

    /* potential optimisation, only load att or reference */
    fun getTraces(origin: KMFContainer): TraceSequence? {
        var sequence = TraceSequence(this)
        val traces = datastore.get(TimeSegment.RAW.name(), origin.path())
        if (traces != null) {
            sequence.populateFromString(traces)
            return sequence
        }
        return null
    }

    fun loadInbounds(elem: KMFContainer) {
        val castedInBounds = elem as InboundRefAware
        val payload = datastore.get(TimeSegment.RAW.name(), "${elem.path()}#")
        if (payload != null) {
            castedInBounds.internal_inboundReferences = MetaHelper.unserialize(payload, this)
        }
    }

    override fun select(query: String): List<KMFContainer> {
        val localRoot = lookup("/")
        if (localRoot != null && query == "/") {
            val result = ArrayList<KMFContainer>()
            result.add(localRoot)
            return result
        }
        if (localRoot != null) {
            return localRoot.select(query)
        } else {
            return ArrayList<KMFContainer>()
        }
    }


}
