package org.kevoree.modeling.api.time

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

    fun previous(): TimePoint? {
        if (originFactory != null && originFactory is TimeAwareKMFFactory) {
            return (originFactory as TimeAwareKMFFactory).floor(path(), now)
        } else {
            return null
        }
    }

    fun next(): TimePoint? {
        if (originFactory != null && originFactory is TimeAwareKMFFactory) {
            return (originFactory as TimeAwareKMFFactory).ceil(path(), now)
        } else {
            return null
        }
    }

    fun latest(): TimePoint? {
        if (originFactory != null && originFactory is TimeAwareKMFFactory) {
            return (originFactory as TimeAwareKMFFactory).latest(path())
        } else {
            return null
        }
    }

    fun floor(p: String): TimePoint? {
        val tp = TimePoint.create(p)
        if (originFactory != null && originFactory is TimeAwareKMFFactory) {
            return (originFactory as TimeAwareKMFFactory).floor(path(), tp)
        } else {
            return null
        }
    }

    fun ceil(p: String): TimePoint? {
        val tp = TimePoint.create(p)
        if (originFactory != null && originFactory is TimeAwareKMFFactory) {
            return (originFactory as TimeAwareKMFFactory).ceil(path(), tp)
        } else {
            return null
        }
    }

}