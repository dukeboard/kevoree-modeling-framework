package org.kevoree.modeling.api.time

import org.kevoree.modeling.api.KMFContainer
import org.kevoree.modeling.api.persistence.PersistenceKMFFactory
import org.kevoree.modeling.api.trace.TraceSequence
import org.kevoree.modeling.api.time.blob.EntityMeta
import org.kevoree.modeling.api.time.blob.TimeMeta
import java.util.HashMap
import org.kevoree.modeling.api.time.blob.EntitiesMeta
import java.util.ArrayList
import org.kevoree.modeling.api.util.InboundRefAware
import org.kevoree.modeling.api.time.blob.MetaHelper

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
    var entitiesCache: HashMap<String, EntitiesMeta>

    override fun clearCache() {
        super<PersistenceKMFFactory>.clearCache()
        timeCache.clear()
        entitiesCache.clear()
    }

    override fun persist(elem: KMFContainer) {
        val casted = elem as TimeAwareKMFContainer
        if (datastore != null) {
            val traces = elem.toTraces(true, true)
            val traceSeq = compare.createSequence()
            traceSeq.populate(traces)
            val currentPath = elem.path()!!

            //add currentPath to currentTimePointMeta
            val entitiesMeta = getEntitiesMeta(relativeTime)
            entitiesMeta.list.add(currentPath)
            datastore!!.put(TimeSegment.ENTITIES.name(), relativeTime.toString(), entitiesMeta.toString())

            val key = "${relativeTime.toString()}/$currentPath"
            datastore!!.put(TimeSegment.RAW.name(), key, traceSeq.exportToString())


            val castedInBounds = elem as InboundRefAware
            val saved = MetaHelper.serialize(castedInBounds.internal_inboundReferences)
            datastore!!.put(TimeSegment.RAW.name(), key+"#", saved)

            val timeTree = getTimeTree(elem.path()!!)
            timeTree.versionTree.insert(relativeTime, "")
            datastore!!.put(TimeSegment.TIMEMETA.name(), currentPath, timeTree.toString())

            casted.meta!!.lastestPersisted = relativeTime
            datastore!!.put(TimeSegment.ENTITYMETA.name(), key, casted.meta.toString())

            //check global time
            //TODO maybe use a global lock for this write
            val globalTime = getTimeTree(TimeSegmentConst.GLOBAL_TIMEMETA)
            if (globalTime.versionTree.lookup(relativeTime) == null) {
                globalTime.versionTree.insert(relativeTime, "");
                datastore!!.put(TimeSegment.TIMEMETA.name(), TimeSegmentConst.GLOBAL_TIMEMETA, globalTime.toString())
            }
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
            timeMeta.versionTree.insert(relativeTime, TimeSegmentConst.DELETE_CODE)

            datastore!!.put(TimeSegment.TIMEMETA.name(), currentPath, timeMeta.toString())
            datastore!!.remove(TimeSegment.ENTITYMETA.name(), key);
            datastore!!.remove(TimeSegment.RAW.name(), key);
            datastore!!.remove(TimeSegment.RAW.name(), key+"#");

            val entitiesMeta = getEntitiesMeta(relativeTime)
            entitiesMeta.list.remove(currentPath)
            datastore!!.put(TimeSegment.ENTITIES.name(), relativeTime.toString(), entitiesMeta.toString())

            val globalTime = getTimeTree(TimeSegmentConst.GLOBAL_TIMEMETA)
            if (globalTime.versionTree.lookup(relativeTime) == null) {
                globalTime.versionTree.insert(relativeTime, "");
                datastore!!.put(TimeSegment.TIMEMETA.name(), TimeSegmentConst.GLOBAL_TIMEMETA, globalTime.toString())
            }
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

    private fun getEntitiesMeta(tp: TimePoint): EntitiesMeta {
        val time = tp.toString()
        val alreadyCached = entitiesCache.get(time);
        if (alreadyCached != null) {
            return alreadyCached;
        } else {
            val payload = datastore!!.get(TimeSegment.ENTITIES.name(), time);
            val blob = EntitiesMeta();
            if (payload != null) {
                blob.load(payload);
            }
            entitiesCache.put(time, blob);
            return blob;
        }
    }

    public fun floor(path: String, tp: TimePoint?): TimePoint? {
        if (tp == null) {
            return null
        } else {
            return  getTimeTree(path).versionTree.lowerUntil(tp,TimeSegmentConst.DELETE_CODE)?.key
        }
    }

    public fun ceil(path: String, tp: TimePoint?): TimePoint? {
        if (tp == null) {
            return null
        } else {
            return  getTimeTree(path).versionTree.upperUntil(tp,TimeSegmentConst.DELETE_CODE)?.key
        }
    }

    public fun latest(path: String): TimePoint? {
        return  getTimeTree(path).versionTree.relativeMax(relativeTime,TimeSegmentConst.DELETE_CODE)?.key
    }

    override public fun globalFloor(tp: TimePoint?): TimePoint? {
        if (tp == null) {
            return null
        } else {
            return  getTimeTree(TimeSegmentConst.GLOBAL_TIMEMETA).versionTree.lower(tp)?.key
        }
    }

    override public fun globalCeil(tp: TimePoint?): TimePoint? {
        if (tp == null) {
            return null
        } else {
            return  getTimeTree(TimeSegmentConst.GLOBAL_TIMEMETA).versionTree.upper(tp)?.key
        }
    }

    override public fun globalLatest(): TimePoint? {
        return  getTimeTree(TimeSegmentConst.GLOBAL_TIMEMETA).versionTree.max()?.key
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
        val askedTimeResult = timeTree.versionTree.lowerOrEqual(relativeTime)
        val askedTime = askedTimeResult?.key
        if (askedTime == null || askedTimeResult!!.value.equals(TimeSegmentConst.DELETE_CODE)) {
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

    override fun entities(): List<KMFContainer> {
        val meta = getEntitiesMeta(relativeTime)
        val result = ArrayList<KMFContainer>()
        for (elem in meta.list) {
            val resolved = lookup(elem)
            if (resolved != null) {
                result.add(resolved)
            }
        }
        return result
    }

}
