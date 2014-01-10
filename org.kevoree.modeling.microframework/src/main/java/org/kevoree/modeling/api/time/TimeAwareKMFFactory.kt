package org.kevoree.modeling.api.time

import org.kevoree.modeling.api.KMFContainer
import org.kevoree.modeling.api.persistence.PersistenceKMFFactory
import org.kevoree.modeling.api.persistence.KMFContainerProxy
import org.kevoree.modeling.api.trace.TraceSequence
import java.util.Date

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 11/11/2013
 * Time: 16:35
 */

trait TimeAwareKMFFactory : PersistenceKMFFactory {

    fun previous(currentNow: TimePoint, path: String): TimePoint? {
        var currentNowString = currentNow.toString()
        var previousPrevious = datastore!!.get(TimeSegment.PREVIOUS.name(), "$currentNowString/$path")
        if (previousPrevious != null) {
            return TimePoint.create(previousPrevious!!)
        }
        return null
    }

    fun next(currentNow: TimePoint, path: String): TimePoint? {
        var currentNowString = currentNow.toString()
        var previousPrevious = datastore!!.get(TimeSegment.NEXT.name(), "$currentNowString/$path")
        if (previousPrevious != null) {
            return TimePoint.create(previousPrevious!!)
        }
        return null
    }

    fun shiftElem(path: String, relativeNow: TimePoint) {
        //TODO
    }
    fun shiftQuery(query: String, relativeNow: TimePoint) {
        //TODO
    }

    var relativeTime: TimePoint
    var queryMap: MutableMap<String, TimePoint>
    var relativityStrategy: RelativeTimeStrategy

    fun setPrevious(p: TimePoint) {
        datastore!!.put(TimeSegment.ORIGIN.name(), relativeTime.toString(), p.toString())
    }

    override fun persist(elem: KMFContainer) {
        if (datastore != null) {
            val traces = elem.toTraces(true, true)
            val traceSeq = compare.createSequence()
            traceSeq.populate(traces)
            var currentNow = (elem as? TimeAwareKMFContainer)?.now
            if (currentNow == null) {
                currentNow = relativeTime
            }
            val currentPath = elem.path()!!
            datastore!!.put(TimeSegment.RAW.name(), "$currentNow/$currentPath", traceSeq.exportToString())

            //manage latest
            var currentLatestString = datastore!!.get(TimeSegment.LATEST.name(), currentPath)
            var currentLatest: TimePoint? = null;
            if (currentLatestString != null) {
                currentLatest = TimePoint.create(currentLatestString!!)
            }
            val previousType = datastore!!.get(TimeSegment.TYPE.name(), elem.path()!!)
            if (previousType == null) {
                datastore!!.put(TimeSegment.TYPE.name(), elem.path()!!, elem.metaClassName())
            } else {
                if (previousType != elem.metaClassName()) {
                    throw Exception("Unconsitant typing : previous was : " + previousType + " , can persist " + elem.metaClassName())
                }
            }
            //update next and previous
            //most simple case > latest
            if (currentLatest == null || currentLatest!!.compareTo(currentNow!!) < 0) {
                datastore!!.put(TimeSegment.LATEST.name(), currentPath, currentNow.toString())
                if (currentLatest != null) {
                    datastore!!.put(TimeSegment.PREVIOUS.name(), "$currentNow/$currentPath", currentLatest.toString())
                    datastore!!.put(TimeSegment.NEXT.name(), "$currentLatest/$currentPath", currentNow.toString())
                }
            } else {
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
            }

        }
    }

    //TODO optimize for ABSOLUTE / CLONE CASE
    fun lookupImmediatePreviousVersionOf(currentNow: TimePoint, path: String): TimePoint? {
        var currentLatest = datastore!!.get(TimeSegment.LATEST.name(), path)
        var result: TimePoint? = null
        if (currentLatest != null) {
            result = TimePoint.create(currentLatest!!)
        }
        var currentLatestPreviousString = datastore!!.get(TimeSegment.PREVIOUS.name(), "${currentLatest.toString()}/$path")
        while (currentLatestPreviousString != null && TimePoint.create(currentLatestPreviousString!!).compareTo(currentNow) > 0) {
            result = TimePoint.create(currentLatestPreviousString!!);
            currentLatestPreviousString = datastore!!.get(TimeSegment.PREVIOUS.name(), "${currentLatestPreviousString.toString()}/$path")
        }
        return result
    }

    fun removeVersion(t: TimePoint) {
        //TODO

    }

    override fun remove(elem: KMFContainer) {
        if (datastore != null) {
            datastore!!.remove(TimeSegment.RAW.name(), elem.path()!!);
            datastore!!.remove(TimeSegment.TYPE.name(), elem.path()!!);
            datastore!!.remove(TimeSegment.LATEST.name(), elem.path()!!);
        }
    }

    fun lookupFromTime(path: String, time: TimePoint): KMFContainer? {
        return internal_lookupFrom(path, null, time)
    }

    override fun lookupFrom(path: String, origin: KMFContainer?): KMFContainer? {
        return internal_lookupFrom(path, origin, null)
    }

    fun internal_lookupFrom(path: String, origin: KMFContainer?, time: TimePoint?): KMFContainer? {
        var path2 = path
        if (path2 == "/") {
            path2 = ""
        }
        if (path2.startsWith("/")) {
            path2 = path2.substring(1)
        }
        var currentTime: TimePoint? = (origin as? TimeAwareKMFContainer)?.now
        if (time != null) {
            currentTime = time
        }
        when(relativityStrategy) {
            RelativeTimeStrategy.ABSOLUTE -> {
                currentTime = relativeTime
            }
            RelativeTimeStrategy.LATEST -> {
                currentTime = TimePoint.create(datastore!!.get(TimeSegment.LATEST.name(), path2)!!)
            }
            RelativeTimeStrategy.RELATIVE -> {
                if (currentTime == null) {
                    currentTime = relativeTime
                }
                //check if version for current time exist
                var existingVersion = datastore!!.get(TimeSegment.RAW.name(), "$currentTime/$path")
                if (existingVersion == null) {
                    currentTime = lookupImmediatePreviousVersionOf(currentTime!!, path);
                }
            }
            else -> {
            }
        }
        if (currentTime == null) {
            //try last
            currentTime = TimePoint.create(datastore!!.get(TimeSegment.LATEST.name(), path2)!!)
        }

        val composedKey = currentTime!!.toString() + path2
        if (elem_cache.containsKey(composedKey)) {
            return elem_cache.get(composedKey)
        }
        if (datastore != null) {
            val typeName = datastore!!.get(TimeSegment.TYPE.name(), path2)
            if (typeName != null) {
                val elem = create(typeName) as TimeAwareKMFContainer
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
        val currentNow = (origin as? TimeAwareKMFContainer)!!.now
        val currentPath = origin.path()!!
        var sequence = compare.createSequence()
        var traces = datastore?.get(TimeSegment.RAW.name(), "$currentNow/$currentPath")
        if (traces != null) {
            sequence.populateFromString(traces!!)
            return sequence
        }
        //try with previous timepoint
        val previousTimePoint = (origin as? TimeAwareKMFContainer)!!.previousTimePoint
        if (previousTimePoint != null) {
            traces = datastore?.get(TimeSegment.RAW.name(), "$previousTimePoint/$currentPath")
            if (traces != null) {
                sequence.populateFromString(traces!!)
                return sequence
            }
        }

        //try with previous version of the current version
        return resolvePreviousGetTrace(origin, relativeTime.toString(), sequence)
    }

    private fun resolvePreviousGetTrace(origin: KMFContainer, current: String, sequence: TraceSequence): TraceSequence? {

        var previous = datastore?.get(TimeSegment.ORIGIN.name(), current.toString())
        if (previous == null) {
            return null;
        }
        val currentPath = origin.path()!!
        var composedKey = "$previous/$currentPath"
        var traces = datastore?.get(TimeSegment.RAW.name(), composedKey)
        if (traces != null) {
            sequence.populateFromString(traces!!)
            return sequence
        } else {
            return resolvePreviousGetTrace(origin, previous!!, sequence)
        }
    }


}
