package org.kevoree.modeling.api.time

import org.kevoree.modeling.api.KMFContainer
import org.kevoree.modeling.api.persistence.KMFContainerProxy
import org.kevoree.modeling.api.time.blob.EntityMeta

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 11/11/2013
 * Time: 16:01
 */

public trait TimeAwareKMFContainer : KMFContainerProxy {

    var meta: EntityMeta?

    var now: TimePoint?

    fun shift(timePoint: TimePoint): TimeAwareKMFContainer? {
        if (originFactory != null && originFactory is TimeAwareKMFFactory) {
            return (originFactory as TimeAwareKMFFactory).createFrom(this, timePoint) as? TimeAwareKMFContainer
        }
        return null
    }

    fun previous(): KMFContainer? {
        if (meta!!.previous != null && originFactory is TimeAwareKMFFactory) {
            return (originFactory as TimeAwareKMFFactory).lookupFromTime(path()!!, meta!!.previous!!)
        } else {
            return null
        }
    }

    fun next(): KMFContainer? {
        if (meta!!.next != null && originFactory is TimeAwareKMFFactory) {
            return (originFactory as TimeAwareKMFFactory).lookupFromTime(path()!!, meta!!.next!!)
        } else {
            return null
        }
    }

}