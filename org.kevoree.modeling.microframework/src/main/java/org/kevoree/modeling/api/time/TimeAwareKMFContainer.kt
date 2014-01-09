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
            newObject.originFactory = originFactory
            newObject.isResolved = false
            newObject.setOriginPath(path()!!)
            newObject.now = timePoint
            newObject.previousTimePoint = now
            return newObject
        }
        return null
    }

    fun deepShift(timePoint: TimePoint) {
        throw Exception("WTF exception!!!")
    }

    var now: TimePoint?

    fun previous(): KMFContainer {
        return this
    }

    fun next(): KMFContainer {
        return this
    }

}