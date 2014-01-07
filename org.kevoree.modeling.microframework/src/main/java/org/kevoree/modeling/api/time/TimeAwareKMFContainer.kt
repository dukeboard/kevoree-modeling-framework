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

    fun shift(timePoint: TimePoint): TimeAwareKMFContainer? {
        if (originFactory != null) {
            originFactory.l

        }


        now = timePoint
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