package org.kevoree.modeling.api.time

import org.kevoree.modeling.api.KMFContainer
import org.kevoree.modeling.api.persistence.KMFContainerProxy

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 11/11/2013
 * Time: 16:01
 */

public trait TimeAwareKMFContainer : KMFContainerProxy {

    var previousTimePoint: TimePoint?

    fun shiftOffset(offset: Long): TimeAwareKMFContainer? {
        if (now != null) {
            return shift(now!!.shift(offset))
        }
        return null
    }

    fun shift(timePoint: TimePoint): TimeAwareKMFContainer? {
        if (originFactory != null) {
            /* here we rely on the lazy load helped by the path concept, to ensure match in case of existing timepoint for this object path */
            var newObject = originFactory!!.create(metaClassName()) as TimeAwareKMFContainer
            newObject.isResolved = false
            newObject.setOriginPath(path()!!)
            newObject.now = timePoint
            newObject.previousTimePoint = now
            return newObject
        }
        return null
    }

    var now: TimePoint?

    fun previous(): KMFContainer? {
        val previousTimePoint = (originFactory as TimeAwareKMFFactory).previous(now!!, path()!!)
        if (previousTimePoint != null) {
            return shift(previousTimePoint)
        }
        return null
    }

    fun next(): KMFContainer? {
        val nextTimePoint = (originFactory as TimeAwareKMFFactory).next(now!!, path()!!)
        if (nextTimePoint != null) {
            return shift(nextTimePoint)
        }
        return null
    }

}