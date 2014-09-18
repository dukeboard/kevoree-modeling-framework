package org.kevoree.modeling.api.time

import org.kevoree.modeling.api.KMFContainer
import org.kevoree.modeling.api.persistence.PersistenceKMFFactory
import org.kevoree.modeling.api.trace.TraceSequence
import org.kevoree.modeling.api.time.blob.EntityMeta
import org.kevoree.modeling.api.time.blob.TimeMeta
import org.kevoree.modeling.api.time.blob.EntitiesMeta
import org.kevoree.modeling.api.util.InboundRefAware
import org.kevoree.modeling.api.time.blob.MetaHelper
import org.kevoree.modeling.api.persistence.KMFContainerProxy
import org.kevoree.modeling.api.time.blob.STATE
import org.kevoree.modeling.api.Transaction

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 11/11/2013
 * Time: 16:35
 */

trait TimeAwareKMFFactory : PersistenceKMFFactory, TimeView {

    val relativeTime: Long
    val sharedCache: org.kevoree.modeling.api.time.blob.SharedCache
    var entitiesCache: EntitiesMeta?

    override var originTransaction: Transaction

    public fun getEntitiesMeta(): EntitiesMeta {
        if (entitiesCache != null) {
            return entitiesCache!!;
        } else {
            val payload = datastore.get(TimeSegment.ENTITIES.name(), relativeTime.toString());
            val blob = EntitiesMeta();
            if (payload != null) {
                blob.load(payload);
            }
            entitiesCache = blob;
            return blob;
        }
    }

    override fun endCommit() {
        val entitiesMeta = getEntitiesMeta()
        for (path in entitiesMeta.list.keySet()) {
            val timeTree = getTimeTree(path)
            if (timeTree.dirty) {
                datastore.put(TimeSegment.TIMEMETA.name(), path, timeTree.toString())
                timeTree.dirty = false
            }
        }
        if (entitiesMeta.isDirty) {
            datastore.put(TimeSegment.ENTITIES.name(), relativeTime.toString(), entitiesMeta.toString())
            entitiesMeta.isDirty = false;
        }
        val globalTime = getTimeTree(TimeSegmentConst.GLOBAL_TIMEMETA)
        if (globalTime.dirty) {
            datastore.put(TimeSegment.TIMEMETA.name(), TimeSegmentConst.GLOBAL_TIMEMETA, globalTime.toString())
            globalTime.dirty = false
        }
        for (e in elementsToBeRemoved) {
            cleanUnusedPaths(e)
        }
        elementsToBeRemoved.clear()
        datastore.commit()
    }

    override fun clear() {
        if (entitiesCache != null && entitiesCache!!.isDirty) {
            println("WARNING :: CLOSED TimeView in dirty mode ! " + relativeTime)
        }

        super<PersistenceKMFFactory>.clear()
        entitiesCache = null
    }

    override protected fun monitor(elem: KMFContainer) {
        if (!dirty) {
            dirty = true
            val globalTime = getTimeTree(TimeSegmentConst.GLOBAL_TIMEMETA)
            if (globalTime.versionTree.lookup(relativeTime) == null) {
                globalTime.versionTree.insert(relativeTime, STATE.EXISTS);
                globalTime.dirty = true;
            }
        }
        elem.addModelElementListener(this)
    }

    override fun commit() {
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
    }

    override fun persist(elem: KMFContainer) {
        if (elem is KMFContainerProxy && !elem.isDirty) {
            return;
        }
        val currentPath = elem.path()
        if (currentPath == "") {
            throw Exception("Internal error, empty path found during persist method " + elem)
        }
        if (!currentPath.startsWith("/")) {
            throw Exception("Cannot persist, because the path of the element do not refer to a root: " + currentPath + " -> " + elem)
        }

        val casted = elem as TimeAwareKMFContainer<*>
        val traces = elem.toTraces(true, true)
        val traceSeq = TraceSequence(this)
        //TODO Incremental save hier
        traceSeq.populate(traces)
        //Add currentPath to currentTimePointMeta
        val entitiesMeta = getEntitiesMeta()
        entitiesMeta.list.put(currentPath, true)
        entitiesMeta.isDirty = true;
        //Save RAW of element
        val key = "${relativeTime.toString()}/$currentPath"
        datastore.put(TimeSegment.RAW.name(), key, traceSeq.exportToString())
        //Save META object of element
        val castedInBounds = elem as InboundRefAware
        val saved = MetaHelper.serialize(castedInBounds.internal_inboundReferences)
        datastore.put(TimeSegment.RAW.name(), key + "#", saved)
        casted.meta!!.latestPersisted = relativeTime
        datastore.put(TimeSegment.ENTITYMETA.name(), key, casted.meta.toString())
        //Update the TimeTree and keep it in memeory until transactino close
        val timeTree = getTimeTree(currentPath)
        if (timeTree.versionTree.lookup(relativeTime) == null) {
            timeTree.versionTree.insert(relativeTime, STATE.EXISTS)
            timeTree.dirty = true
        }
    }

    override fun remove(elem: KMFContainer) {
        if (elem.isDeleted()) {
            return
        }
        val path = elem.path()
        if (path == "") {
            modified_elements.remove(elem)
            println("WARNING :: Can't process dangling element! type:" + elem.metaClassName() + ",id=" + elem.internalGetKey() + " ignored")
            return;
        }
        elem_cache.remove(path)
        val currentCachedTimeTree = getTimeTree(path)
        currentCachedTimeTree.versionTree.insert(relativeTime, STATE.DELETED)
        currentCachedTimeTree.dirty = true
        val entitiesMeta = getEntitiesMeta()
        entitiesMeta.list.put(path, true)
        entitiesMeta.isDirty = true;
        if (!dirty) {
            val globalTime = getTimeTree(TimeSegmentConst.GLOBAL_TIMEMETA)
            if (globalTime.versionTree.lookup(relativeTime) == null) {
                globalTime.versionTree.insert(relativeTime, STATE.EXISTS);
                globalTime.dirty = true
            }
        }
        modified_elements.remove(elem.hashCode().toString())
    }

    override fun cleanUnusedPaths(path: String) {
        val key = "${relativeTime.toString()}/${path}"
        datastore.remove(TimeSegment.ENTITYMETA.name(), key);
        datastore.remove(TimeSegment.RAW.name(), key);
        datastore.remove(TimeSegment.RAW.name(), key + "#");
    }

    fun getTimeTree(path: String): TimeMeta {
        val alreadyCached = sharedCache.timeCache.get(path);
        if (alreadyCached != null) {
            return alreadyCached;
        } else {
            val timeMetaPayLoad = datastore.get(TimeSegment.TIMEMETA.name(), path);
            val blob = TimeMeta();
            if (timeMetaPayLoad != null) {
                blob.load(timeMetaPayLoad);
            }
            sharedCache.timeCache.put(path, blob);
            return blob;
        }
    }

    override fun lookup(path: String): KMFContainer? {
        val timeTree = getTimeTree(path)
        val askedTimeResult = timeTree.versionTree.previousOrEqual(relativeTime)
        val askedTime = askedTimeResult?.key
        if (askedTime == null || askedTimeResult!!.value.equals(STATE.DELETED)) {
            return null;
        }
        val composedKey = "$askedTime/$path"
        //TODO check parent cache
        if (elem_cache.containsKey(composedKey)) {
            return elem_cache.get(composedKey)
        }
        //load the meta object
        val metaPayload = datastore.get(TimeSegment.ENTITYMETA.name(), composedKey)
        if (metaPayload == null) {
            return null
        }
        val meta = EntityMeta()
        meta.load(metaPayload)
        if (meta.metatype != null) {
            val elem = create(meta.metatype!!) as TimeAwareKMFContainer<*>
            elem.meta = meta
            elem_cache.put(composedKey, elem)
            elem.isResolved = false
            elem.now = askedTime  //must before OriginPath
            elem.setOriginPath(path)
            monitor(elem)
            return elem
        } else {
            throw Exception("Empty Type Name for " + path);
        }
    }

    override fun getTraces(origin: KMFContainer): TraceSequence? {
        val currentPath = origin.path()
        var sequence = TraceSequence(this)
        val castedOrigin = origin as TimeAwareKMFContainer<*>
        if (castedOrigin.meta!!.latestPersisted == null) {
            return null
        }
        var traces = datastore.get(TimeSegment.RAW.name(), "${castedOrigin.meta!!.latestPersisted}/$currentPath")
        if (traces != null) {
            sequence.populateFromString(traces!!)
            return sequence
        }
        return null
    }

    override fun now(): Long {
        return relativeTime
    }

    override fun modified(): Set<String> {
        return getEntitiesMeta().list.keySet()
    }

    override fun loadInbounds(elem: KMFContainer) {
        val castedInBounds = elem as InboundRefAware
        val casted2 = elem as TimeAwareKMFContainer<*>
        val payload = datastore.get(TimeSegment.RAW.name(), "${casted2.meta!!.latestPersisted}/${elem.path()}#")
        if (payload != null) {
            castedInBounds.internal_inboundReferences = MetaHelper.unserialize(payload, this)
        }
    }

    override fun delete() {
        for (path in getEntitiesMeta().list.keySet()) {
            val timeMeta = getTimeTree(path)
            timeMeta.versionTree.delete(relativeTime)
            timeMeta.dirty = true
            elementsToBeRemoved.add(path)
        }
        getEntitiesMeta().list.clear()
        getEntitiesMeta().isDirty = true
        //Create endpoint in the global ordering of time
        if (!dirty) {
            val globalTime = getTimeTree(TimeSegmentConst.GLOBAL_TIMEMETA)
            if (globalTime.versionTree.lookup(relativeTime) == null) {
                globalTime.versionTree.insert(relativeTime, STATE.EXISTS);
                globalTime.dirty = true;
            }
        }
        val entitiesMeta = getEntitiesMeta()
        entitiesMeta.list.clear()
        entitiesMeta.isDirty = true;
    }


    override fun diff(other: TimeView): TraceSequence {
        val casted = other as TimeAwareKMFFactory
        val sequence: TraceSequence = TraceSequence(this)
        val globalTime = getTimeTree(TimeSegmentConst.GLOBAL_TIMEMETA)
        var resolved1 = globalTime.versionTree.previousOrEqual(relativeTime)?.key
        var resolved2 = globalTime.versionTree.previousOrEqual(casted.relativeTime)?.key
        if (resolved1 == null || resolved2 == null) {
            return sequence
        } else {
            if (TimeComparator.compare(resolved1!!, resolved2!!) > 1) {
                val temp = resolved1
                resolved1 = resolved2
                resolved2 = temp
            }
        }
        var currentTP = resolved1!!
        while (!currentTP.equals(resolved2!!)) {
            val otherEntities = casted.getEntitiesMeta()
            for (path in otherEntities.list.keySet()) {
                val key = "${currentTP.toString()}/${path}"
                val raw = datastore.get(TimeSegment.RAW.name(), key);
                if (raw != null) {
                    sequence.populateFromString(raw)
                }
            }
            currentTP = globalTime.versionTree.next(currentTP)?.key!!;
        }
        return sequence
    }

}
