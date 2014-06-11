package org.kevoree.modeling.api.time

import org.kevoree.modeling.api.KMFContainer
import org.kevoree.modeling.api.persistence.PersistenceKMFFactory
import org.kevoree.modeling.api.trace.TraceSequence
import org.kevoree.modeling.api.time.blob.EntityMeta
import org.kevoree.modeling.api.time.blob.TimeMeta

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 11/11/2013
 * Time: 16:35
 */

trait TimeAwareKMFFactory : PersistenceKMFFactory {

    var relativeTime: TimePoint?
    var queryMap: MutableMap<String, TimePoint>


    override fun persist(elem: KMFContainer) {

        //TODO add check if object is modify since last load
        //TODO SAVE NEW HASHMAP EXTERNAL RELATIONSHIPS

        val casted = elem as TimeAwareKMFContainer
        if (datastore != null) {
            val traces = elem.toTraces(true, true)
            val traceSeq = compare.createSequence()
            traceSeq.populate(traces)
            val currentPath = elem.path()!!
            datastore!!.put(TimeSegment.RAW.name(), "${elem.now.toString()}/$currentPath", traceSeq.exportToString())   //TODO check for related elements
            casted.meta!!.lastestPersisted = elem.now
            datastore!!.put(TimeSegment.ENTITYMETA.name(), "${elem.now.toString()}/$currentPath", casted.meta.toString())
            val timeMetaPayLoad = datastore!!.get(TimeSegment.TIMEMETA.name(), currentPath)
            val timeMeta = TimeMeta()
            if (timeMetaPayLoad != null) {
                timeMeta.load(timeMetaPayLoad)
            }
            timeMeta.versionTree.insert(elem.now!!, "")
            datastore!!.put(TimeSegment.TIMEMETA.name(), currentPath, timeMeta.toString())
        }
    }

    /*
    fun fillMeta(elem: TimeAwareKMFContainer, currentNow: TimePoint?, currentPath: String) {
        if (elem.meta == null) {
            elem.meta = EntityMeta()
            elem.meta.metatype = elem.metaClassName()
        }

        //manage latest
        var currentLatestString = datastore!!.get(TimeSegment.LATEST.name(), currentPath)
        var currentLatest: TimePoint? = null;
        if (currentLatestString != null) {
            currentLatest = TimePoint.create(currentLatestString!!)
        }
        //update next and previous
        //most simple case > latest
        if (currentLatest == null || currentLatest!!.compareTo(currentNow!!) < 0) {
            datastore!!.put(TimeSegment.LATEST.name(), currentPath, currentNow.toString())
            if (currentLatest != null) {
                elem.meta.previous = TimePoint.create("$currentNow/$currentPath")
                elem.meta.next = TimePoint.create("$currentNow/$currentPath")
            }
        } else {

            throw Exception("Unmanaged yet, insert back in time not supported !")
            /*
            var previousGlobal = datastore!!.get(TimeSegment.ORIGIN.name(), currentNow.toString())
            if (previousGlobal == null) {
                //TODO redo this shit !
                //costly, to optimize !!!
                var immediatePreviousVersion = lookupImmediatePreviousVersionOf(currentNow!!, currentPath)
                var immediatePreviousVersionString = immediatePreviousVersion.toString()
                var previousPrevious = datastore!!.get(TimeSegment.PREVIOUS.name(), "$immediatePreviousVersionString/$currentPath")
                if (previousPrevious != null) {
                    datastore!!.put(TimeSegment.PREVIOUS.name(), "$currentNow/$currentPath", previousPrevious.toString())
                    datastore!!.put(TimeSegment.NEXT.name(), "$previousPrevious/$currentPath", currentNow.toString())
                }
                datastore!!.put(TimeSegment.PREVIOUS.name(), "$immediatePreviousVersionString/$currentPath", currentNow.toString())
                datastore!!.put(TimeSegment.NEXT.name(), "$currentNow/$currentPath", immediatePreviousVersionString.toString())
            }  */
        }
    } */

    fun removeVersion(t: TimePoint) {
        //TODO

    }

    override fun remove(elem: KMFContainer) {
        //TODO
        val casted = elem as TimeAwareKMFContainer
        if (datastore != null) {
            datastore!!.remove(TimeSegment.RAW.name(), "${casted.now.toString()}/${elem.path()}");
            datastore!!.remove(TimeSegment.ENTITYMETA.name(), "${casted.now.toString()}/${elem.path()}");
        }
    }

    fun lookupFromTime(path: String, time: TimePoint): KMFContainer? {
        return internal_lookupFrom(path, null, time)
    }

    override fun lookupFrom(path: String, origin: KMFContainer?): KMFContainer? {
        return internal_lookupFrom(path, origin, null)
    }

    fun closestTime(path: String, time: TimePoint?): TimePoint? {
        val timeMetaPayLoad = datastore!!.get(TimeSegment.TIMEMETA.name(), path)
        if (timeMetaPayLoad == null || timeMetaPayLoad == "" || time == null) {
            return null
        }
        //TODO put in cached
        val blob = TimeMeta()
        blob.load(timeMetaPayLoad)
        val result = blob.versionTree.lowerOrEqual(time)
        if (result != null) {
            return result.key
        }
        return null
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

    fun internal_lookupFrom(path: String, origin: KMFContainer?, time: TimePoint?): KMFContainer? {
        var path2 = path
        if (path2 == "/") {
            path2 = ""
        }
        if (path2.startsWith("/")) {
            path2 = path2.substring(1)
        }
        var currentTime: TimePoint? = null
        if (time == null && relativeTime == null) {
            currentTime = lastestTime(path2)
        } else {
            if (time != null) {
                currentTime = closestTime(path2, time)
            } else {
                if (relativeTime != null) {
                    currentTime = closestTime(path2, relativeTime)
                }
            }
        }
        val composedKey = "$currentTime/$path2"
        if (elem_cache.containsKey(composedKey)) {
            //TODO check if update
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
                elem.now = currentTime!!  //must before OriginPath
                elem.setOriginPath(path2)
                return elem
            } else {
                throw Exception("Empty Type Name for " + path2);
            }
        }
        return null
    }

    override fun getTraces(origin: KMFContainer): TraceSequence? {
        val currentPath = origin.path()!!
        var sequence = compare.createSequence()
        val castedOrigin = origin as TimeAwareKMFContainer
        var traces = datastore?.get(TimeSegment.RAW.name(), "${castedOrigin.meta!!.lastestPersisted}/$currentPath")
        if (traces != null) {
            sequence.populateFromString(traces!!)
            return sequence
        }
        return null
    }

    override fun create(metaClassName: String): org.kevoree.modeling.api.KMFContainer? {
        return internal_create(metaClassName, null, relativeTime, null)
    }

    fun createFrom(from: org.kevoree.modeling.api.KMFContainer?, to: TimePoint): org.kevoree.modeling.api.KMFContainer? {
        if (from == null || from !is TimeAwareKMFContainer) {
            return null
        } else {
            return internal_create(from.metaClassName(), from.now, to, from.path())
        }
    }


    private fun internal_create(metaClassName: String, from: TimePoint?, pto: TimePoint?, pPath: String?): org.kevoree.modeling.api.KMFContainer? {
        val timePayload = ""
        var createdObj: TimeAwareKMFContainer? = null

        if (pPath != null && from != null) {
            //fix potential root path
            var fromPath: String = pPath
            if (fromPath == "/") {
                fromPath = ""
            }
            //load BTree structure
            val timeMetaPayLoad = datastore!!.get(TimeSegment.TIMEMETA.name(), fromPath)
            val timeMeta = TimeMeta()
            if (timeMetaPayLoad != null) {
                timeMeta.load(timeMetaPayLoad)
            }
            var to: TimePoint? = pto
            if (to == null) {
                to = timeMeta.versionTree.max()!!.key
            }
            if (timeMeta.versionTree.lookup(to!!) != null) {
                throw Exception("Object already exist with path " + fromPath + " and timepoint " + to + ", please delete it before")
            }
            timeMeta.versionTree.insert(to!!, timePayload)

            val previousPayload = datastore?.get(TimeSegment.ENTITYMETA.name(), "$from/$fromPath")
            var previous: EntityMeta?
            if (previousPayload != null) {
                previous = EntityMeta()
                previous!!.load(previousPayload)
            } else {
                throw Exception("Object are not existing with path " + fromPath + " and timepoint " + from + ", please use create method instead to create root")
            }
            createdObj = obj_create(metaClassName) as TimeAwareKMFContainer
            createdObj!!.isResolved = false
            createdObj!!.now = to
            createdObj!!.setOriginPath(fromPath)
            createdObj!!.meta = EntityMeta()
            createdObj!!.meta!!.metatype = metaClassName
            createdObj!!.meta!!.lastestPersisted = from
            if (previous != null) {
                createdObj!!.meta!!.previous = from
                previous!!.next = to
                datastore!!.put(TimeSegment.ENTITYMETA.name(), "${from}/${fromPath}", previous.toString())
            }
            datastore!!.put(TimeSegment.ENTITYMETA.name(), "${createdObj!!.now}/${createdObj!!.path()}", createdObj!!.meta.toString())
            datastore!!.put(TimeSegment.TIMEMETA.name(), fromPath, timeMeta.toString())
            //TODO, add right side version number
        } else {
            createdObj = obj_create(metaClassName) as TimeAwareKMFContainer
            createdObj!!.isResolved = true
            createdObj!!.now = pto
            createdObj!!.meta = EntityMeta()
            createdObj!!.meta!!.metatype = metaClassName
        }
        return createdObj
    }

    fun obj_create(metaClassName: String): org.kevoree.modeling.api.KMFContainer?


}
