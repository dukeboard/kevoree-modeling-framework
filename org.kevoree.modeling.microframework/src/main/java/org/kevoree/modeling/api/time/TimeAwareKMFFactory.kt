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

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 11/11/2013
 * Time: 16:35
 */

trait TimeAwareKMFFactory : PersistenceKMFFactory, TimeView {

    var relativeTime: TimePoint
    var entitiesCache: EntitiesMeta?
    var sharedCache: org.kevoree.modeling.api.time.blob.SharedCache

    override fun clear() {
        super<PersistenceKMFFactory>.clear()
        sharedCache.timeCache.clear()
        entitiesCache = null
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
        val entitiesMeta = getEntitiesMeta(relativeTime)
        if (entitiesMeta.isDirty) {
            datastore!!.put(TimeSegment.ENTITIES.name(), relativeTime.toString(), entitiesMeta.toString())
            entitiesMeta.isDirty = false;
        }
        val globalTime = getTimeTree(TimeSegmentConst.GLOBAL_TIMEMETA)
        if (globalTime.dirty) {
            datastore!!.put(TimeSegment.TIMEMETA.name(), TimeSegmentConst.GLOBAL_TIMEMETA, globalTime.toString())
            globalTime.dirty = false
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

        val casted = elem as TimeAwareKMFContainer
        if (datastore != null) {
            val traces = elem.toTraces(true, true)
            val traceSeq = TraceSequence(this)
            traceSeq.populate(traces)

            //add currentPath to currentTimePointMeta
            val entitiesMeta = getEntitiesMeta(relativeTime)
            entitiesMeta.list.put(currentPath, true)
            entitiesMeta.isDirty = true;

            val key = "${relativeTime.toString()}/$currentPath"
            datastore!!.put(TimeSegment.RAW.name(), key, traceSeq.exportToString())


            val castedInBounds = elem as InboundRefAware
            val saved = MetaHelper.serialize(castedInBounds.internal_inboundReferences)
            datastore!!.put(TimeSegment.RAW.name(), key + "#", saved)

            val timeTree = getTimeTree(currentPath)
            if (timeTree.versionTree.lookup(relativeTime) == null) {
                timeTree.versionTree.insert(relativeTime, "")
                datastore!!.put(TimeSegment.TIMEMETA.name(), currentPath, timeTree.toString())
                timeTree.dirty = false
            }

            casted.meta!!.latestPersisted = relativeTime
            datastore!!.put(TimeSegment.ENTITYMETA.name(), key, casted.meta.toString())

            //check global time
            val globalTime = getTimeTree(TimeSegmentConst.GLOBAL_TIMEMETA)
            if (globalTime.versionTree.lookup(relativeTime) == null) {
                globalTime.versionTree.insert(relativeTime, "");
                globalTime.dirty = true;
            }
        }
    }

    fun removeVersion(t: TimePoint, target: KMFContainer) {
        if (datastore != null) {
            val currentPath = target.path()
            val timeTree = getTimeTree(currentPath)
            timeTree.versionTree.delete(relativeTime)
            if (timeTree.versionTree.root == null) {
                throw Exception("Can't supress last version of element, use delete method instead !")
            }
            datastore!!.put(TimeSegment.TIMEMETA.name(), currentPath, timeTree.toString())
            val entitiesMeta = getEntitiesMeta(relativeTime)
            entitiesMeta.list.remove(currentPath)
            entitiesMeta.isDirty = true;
            datastore!!.put(TimeSegment.ENTITIES.name(), relativeTime.toString(), entitiesMeta.toString())
            val key = "${relativeTime.toString()}/$currentPath";
            datastore!!.remove(TimeSegment.RAW.name(), key);
            datastore!!.remove(TimeSegment.RAW.name(), key + "#");
            datastore!!.remove(TimeSegment.ENTITYMETA.name(), key)

            //TODO perhaps update global timeline
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

        val key = "${relativeTime.toString()}/${path}"
        if (datastore != null) {
            var currentPath = path

            //Insert this timeMeta into the global ordering of time of this object
            val timeMetaPayLoad = datastore!!.get(TimeSegment.TIMEMETA.name(), currentPath)
            val timeMeta = TimeMeta()
            if (timeMetaPayLoad != null) {
                timeMeta.load(timeMetaPayLoad)
            }
            timeMeta.versionTree.insert(relativeTime, TimeSegmentConst.DELETE_CODE)
            datastore!!.put(TimeSegment.TIMEMETA.name(), currentPath, timeMeta.toString())

            //drop entity meta at this time (useless not type, no futur creation)
            datastore!!.remove(TimeSegment.ENTITYMETA.name(), key);
            //drop raw
            //TODO , warning for global compare we need to save the delete trace !!!
            datastore!!.remove(TimeSegment.RAW.name(), key);
            //drop additional related raw
            datastore!!.remove(TimeSegment.RAW.name(), key + "#");
            //update elements updated at this time
            val entitiesMeta = getEntitiesMeta(relativeTime)
            entitiesMeta.list.put(currentPath, true)
            entitiesMeta.isDirty = true;
            datastore!!.put(TimeSegment.ENTITIES.name(), relativeTime.toString(), entitiesMeta.toString())
            //Create endpoint in the global ordering of time
            val globalTime = getTimeTree(TimeSegmentConst.GLOBAL_TIMEMETA)
            if (globalTime.versionTree.lookup(relativeTime) == null) {
                globalTime.versionTree.insert(relativeTime, "");
                globalTime.dirty = true
            }

            modified_elements.remove(elem.hashCode().toString())
            elem_cache.remove(currentPath)

        }
    }

    private fun getTimeTree(path: String): TimeMeta {
        val alreadyCached = sharedCache.timeCache.get(path);
        if (alreadyCached != null) {
            return alreadyCached;
        } else {
            val timeMetaPayLoad = datastore!!.get(TimeSegment.TIMEMETA.name(), path);
            val blob = TimeMeta();
            if (timeMetaPayLoad != null) {
                blob.load(timeMetaPayLoad);
            }
            sharedCache.timeCache.put(path, blob);
            return blob;
        }
    }

    private fun getEntitiesMeta(tp: TimePoint): EntitiesMeta {
        val time = tp.toString()
        if (entitiesCache != null) {
            return entitiesCache!!;
        } else {
            val payload = datastore!!.get(TimeSegment.ENTITIES.name(), time);
            val blob = EntitiesMeta();
            if (payload != null) {
                blob.load(payload);
            }
            entitiesCache = blob;
            return blob;
        }
    }

    public fun floor(path: String, tp: TimePoint?): TimePoint? {
        if (tp == null) {
            return null
        } else {
            return getTimeTree(path).versionTree.lowerUntil(tp, TimeSegmentConst.DELETE_CODE)?.key
        }
    }

    public fun ceil(path: String, tp: TimePoint?): TimePoint? {
        if (tp == null) {
            return null
        } else {
            return getTimeTree(path).versionTree.upperUntil(tp, TimeSegmentConst.DELETE_CODE)?.key
        }
    }

    public fun latest(path: String): TimePoint? {
        return getTimeTree(path).versionTree.relativeMax(relativeTime, TimeSegmentConst.DELETE_CODE)?.key
    }

    override public fun globalFloor(tp: TimePoint?): TimePoint? {
        if (tp == null) {
            return null
        } else {
            return getTimeTree(TimeSegmentConst.GLOBAL_TIMEMETA).versionTree.lower(tp)?.key
        }
    }

    override public fun globalCeil(tp: TimePoint?): TimePoint? {
        if (tp == null) {
            return null
        } else {
            return getTimeTree(TimeSegmentConst.GLOBAL_TIMEMETA).versionTree.upper(tp)?.key
        }
    }

    override public fun globalLatest(): TimePoint? {
        return getTimeTree(TimeSegmentConst.GLOBAL_TIMEMETA).versionTree.max()?.key
    }

    override fun lookup(path: String): KMFContainer? {
        val timeTree = getTimeTree(path)
        val askedTimeResult = timeTree.versionTree.lowerOrEqual(relativeTime)
        val askedTime = askedTimeResult?.key
        if (askedTime == null || askedTimeResult!!.value.equals(TimeSegmentConst.DELETE_CODE)) {
            return null;
        }
        val composedKey = "$askedTime/$path"
        if (elem_cache.containsKey(composedKey)) {
            return elem_cache.get(composedKey)
        }

        if (datastore != null) {
            //load the meta object
            val metaPayload = datastore!!.get(TimeSegment.ENTITYMETA.name(), composedKey)
            if (metaPayload == null) {
                return null
            }
            val meta = EntityMeta()
            meta.load(metaPayload)
            if (meta.metatype != null) {
                val elem = create(meta.metatype!!) as TimeAwareKMFContainer
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
        return null
    }

    override fun getTraces(origin: KMFContainer): TraceSequence? {
        val currentPath = origin.path()
        var sequence = TraceSequence(this)
        val castedOrigin = origin as TimeAwareKMFContainer
        if (castedOrigin.meta!!.latestPersisted == null) {
            return null
        }
        var traces = datastore?.get(TimeSegment.RAW.name(), "${castedOrigin.meta!!.latestPersisted}/$currentPath")
        if (traces != null) {
            sequence.populateFromString(traces!!)
            return sequence
        }
        return null
    }

    override fun now(): TimePoint {
        return relativeTime
    }

    override fun modified(): Set<String> {
        return getEntitiesMeta(relativeTime).list.keySet()
    }

    override fun loadInbounds(elem: KMFContainer) {
        val castedInBounds = elem as InboundRefAware
        val casted2 = elem as TimeAwareKMFContainer
        val payload = datastore!!.get(TimeSegment.RAW.name(), "${casted2.meta!!.latestPersisted}/${elem.path()}#")
        if (payload != null) {
            castedInBounds.internal_inboundReferences = MetaHelper.unserialize(payload, this)
        }
    }

    override fun delete() {
        for (path in getEntitiesMeta(relativeTime).list.keySet()) {
            val key = "${relativeTime.toString()}/${path}"
            //Insert this timeMeta into the global ordering of time of this object
            val timeMetaPayLoad = datastore!!.get(TimeSegment.TIMEMETA.name(), path)
            val timeMeta = TimeMeta()
            if (timeMetaPayLoad != null) {
                timeMeta.load(timeMetaPayLoad)
            }
            timeMeta.versionTree.delete(relativeTime)
            datastore!!.put(TimeSegment.TIMEMETA.name(), path, timeMeta.toString())
            //drop entity meta at this time (useless not type, no futur creation)
            datastore!!.remove(TimeSegment.ENTITYMETA.name(), key);
            //drop raw
            datastore!!.remove(TimeSegment.RAW.name(), key);
            //drop additional related raw
            datastore!!.remove(TimeSegment.RAW.name(), key + "#");
        }
        //drop every elements from this time
        datastore!!.remove(TimeSegment.ENTITIES.name(), relativeTime.toString());
        //Create endpoint in the global ordering of time
        val globalTime = getTimeTree(TimeSegmentConst.GLOBAL_TIMEMETA)
        if (globalTime.versionTree.lookup(relativeTime) == null) {
            globalTime.versionTree.insert(relativeTime, "");
            datastore!!.put(TimeSegment.TIMEMETA.name(), TimeSegmentConst.GLOBAL_TIMEMETA, globalTime.toString())
        }
        val entitiesMeta = getEntitiesMeta(relativeTime)
        entitiesMeta.list.clear()
        entitiesMeta.isDirty = true;
        datastore!!.put(TimeSegment.ENTITIES.name(), relativeTime.toString(), entitiesMeta.toString())
    }

    override fun diff(tp: TimePoint): TraceSequence {
        val sequence: TraceSequence = TraceSequence(this)
        val globalTime = getTimeTree(TimeSegmentConst.GLOBAL_TIMEMETA)
        var resolved1 = globalTime.versionTree.lowerOrEqual(relativeTime)?.value
        var resolved2 = globalTime.versionTree.lowerOrEqual(tp)?.value
        if (resolved1 == null || resolved2 == null) {
            return sequence
        } else {
            if (resolved1!!.compareTo(resolved2!!) > 1) {
                val temp = resolved1
                resolved1 = resolved2
                resolved2 = temp
            }
        }
        var currentTP = TimePoint.create(resolved1!!)
        while (!currentTP.equals(resolved2!!)) {

            val entities = getEntitiesMeta(currentTP)
            for (path in entities.list.keySet()) {
                val key = "${currentTP.toString()}/${path}"
                val raw = datastore!!.get(TimeSegment.RAW.name(), key);
                if (raw != null) {
                    sequence.populateFromString(raw)
                }
            }
            currentTP = TimePoint.create(globalTime.versionTree.upper(currentTP)?.value!!);
        }
        return sequence
    }

}
