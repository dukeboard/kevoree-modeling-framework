package org.kevoree.modeling.api.time

import org.kevoree.modeling.api.KMFContainer
import org.kevoree.modeling.api.persistence.PersistenceKMFFactory
import org.kevoree.modeling.api.trace.TraceSequence
import org.kevoree.modeling.api.time.blob.EntityMeta
import org.kevoree.modeling.api.time.blob.TimeMeta
import java.util.HashMap

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 11/11/2013
 * Time: 16:35
 */

trait TimeAwareKMFFactory<A> : PersistenceKMFFactory, TimeView<A> {

    var relativeTime: TimePoint
    var queryMap: MutableMap<String, TimePoint>
    var timeCache: HashMap<String, TimeMeta>

    override fun clearCache() {
        super<PersistenceKMFFactory>.clearCache()
        timeCache.clear()
    }

    override fun persist(elem: KMFContainer) {
        //TODO SAVE NEW HASHMAP EXTERNAL RELATIONS)HIPS
        val casted = elem as TimeAwareKMFContainer
        if (datastore != null) {
            val traces = elem.toTraces(true, true)
            val traceSeq = compare.createSequence()
            traceSeq.populate(traces)
            val currentPath = elem.path()!!
            val key = "${relativeTime.toString()}/$currentPath"
            datastore!!.put(TimeSegment.RAW.name(), key, traceSeq.exportToString())

            val timeTree = getTimeTree(elem.path()!!)
            timeTree.versionTree.insert(relativeTime, "")
            datastore!!.put(TimeSegment.TIMEMETA.name(), currentPath, timeTree.toString())

            casted.meta!!.lastestPersisted = relativeTime
            casted.meta!!.previous = timeTree.versionTree.lower(elem.now!!)?.key
            casted.meta!!.next = timeTree.versionTree.upper(elem.now!!)?.key

            datastore!!.put(TimeSegment.ENTITYMETA.name(), key, casted.meta.toString())

        }
    }

    fun removeVersion(t: TimePoint) {
        //TODO

    }

    override fun remove(elem: KMFContainer) {
        val key = "${relativeTime.toString()}/${elem.path()}"
        if (datastore != null) {
            var currentPath = elem.path()!!
            val timeMetaPayLoad = datastore!!.get(TimeSegment.TIMEMETA.name(), currentPath)
            val timeMeta = TimeMeta()
            if (timeMetaPayLoad != null) {
                timeMeta.load(timeMetaPayLoad)
            }
            timeMeta.versionTree.insert(relativeTime, "del")
            datastore!!.put(TimeSegment.TIMEMETA.name(), currentPath, timeMeta.toString())
            datastore!!.remove(TimeSegment.ENTITYMETA.name(), key);
            datastore!!.remove(TimeSegment.RAW.name(), key);
        }
    }

    private fun getTimeTree(path: String): TimeMeta {
        val alreadyCached = timeCache.get(path);
        if (alreadyCached != null) {
            return alreadyCached;
        } else {
            val timeMetaPayLoad = datastore!!.get(TimeSegment.TIMEMETA.name(), path);
            val blob = TimeMeta();
            if (timeMetaPayLoad != null) {
                blob.load(timeMetaPayLoad);
            }
            timeCache.put(path, blob);
            return blob;
        }
    }

    fun lastestTime(path: String): TimePoint? {
        val timeMetaPayLoad = datastore!!.get(TimeSegment.TIMEMETA.name(), path)
        if (timeMetaPayLoad == null || timeMetaPayLoad == "") {
            return null
        }
        //TODO put in cached
        val blob = TimeMeta()
        blob.load(timeMetaPayLoad)
        val result = blob.versionTree.max()
        if (result != null) {
            return result.key
        }
        return null
    }

    private fun cleanPath(path: String): String {
        var path2 = path
        if (path2 == "/") {
            path2 = ""
        }
        if (path2.startsWith("/")) {
            path2 = path2.substring(1)
        }
        return path2
    }

    override fun lookup(path: String): KMFContainer? {
        var path2 = cleanPath(path)
        val timeTree = getTimeTree(path2)
        val askedTime = timeTree.versionTree.lowerOrEqual(relativeTime)?.key
        if (askedTime == null) {
            return null;
        }
        val composedKey = "$askedTime/$path2"
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
                elem.setOriginPath(path2)
                monitor(elem)
                return elem
            } else {
                throw Exception("Empty Type Name for " + path);
            }
        }
        return null
    }

    override fun getTraces(origin: KMFContainer): TraceSequence? {
        val currentPath = origin.path()!!
        var sequence = compare.createSequence()
        val castedOrigin = origin as TimeAwareKMFContainer
        if (castedOrigin.meta!!.lastestPersisted == null) {
            return null
        }
        var traces = datastore?.get(TimeSegment.RAW.name(), "${castedOrigin.meta!!.lastestPersisted}/$currentPath")
        if (traces != null) {
            sequence.populateFromString(traces!!)
            return sequence
        }
        return null
    }

    override fun now(): TimePoint? {
        return relativeTime
    }

    override fun time(tps: String): TimeView<A> {
        return time(TimePoint.create(tps))
    }

}
