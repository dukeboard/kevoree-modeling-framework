package org.kevoree.modeling.api.time

import org.kevoree.modeling.api.persistence.KMFContainerProxy
import org.kevoree.modeling.api.time.blob.EntityMeta
import org.kevoree.modeling.api.TimeTransaction
import org.kevoree.modeling.api.time.blob.TimeMeta
import org.kevoree.modeling.api.time.blob.STATE
import org.kevoree.modeling.api.TimedContainer

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 11/11/2013
 * Time: 16:01
 */

public trait TimeAwareKMFContainer<A> : KMFContainerProxy, TimedContainer<A> {

    var meta: EntityMeta?

    internal fun getOriginTransaction(): TimeTransaction {
        return ((originFactory as TimeAwareKMFFactory).originTransaction) as TimeTransaction
    }

    override fun previous(): A? {
        //TODO optimize with a cache of RBTree node, warning potential memory leak !
        val previousTime = timeTree().previous(now)
        if (previousTime != null) {
            return getOriginTransaction().time(previousTime).lookup(path()) as? A
        }
        return null
    }

    override fun next(): A? {
        //TODO optimize with a cache of RBTree node, warning potential memory leak !
        val previousTime = timeTree().next(now)
        if (previousTime != null) {
            return getOriginTransaction().time(previousTime).lookup(path()) as? A
        }
        return null
    }

    override fun last(): A? {
        //TODO optimize with a cache of RBTree node, warning potential memory leak !
        val previousTime = (timeTree() as TimeMeta).versionTree.lastWhileNot(now, STATE.DELETED)?.key
        if (previousTime != null) {
            return getOriginTransaction().time(previousTime).lookup(path()) as? A
        }
        return null
    }

    override fun first(): A? {
        //TODO optimize with a cache of RBTree node, warning potential memory leak !
        val previousTime = (timeTree() as TimeMeta).versionTree.firstWhileNot(now, STATE.DELETED)?.key
        if (previousTime != null) {
            return getOriginTransaction().time(previousTime).lookup(path()) as? A
        }
        return null
    }

    override fun jump(time: Long): A? {
        //TODO optimize with a cache of RBTree node, warning potential memory leak !
        val previousTime = timeTree().previous(time)
        if (previousTime != null) {
            return getOriginTransaction().time(previousTime).lookup(path()) as? A
        }
        return null
    }

    /*
    fun floor(p: String): Long? {
        val tp = java.lang.Long.parseLong(p)
        if (originFactory != null && originFactory is TimeAwareKMFFactory) {
            return (originFactory as TimeAwareKMFFactory).floor(path(), tp)
        } else {
            return null
        }
    }

    fun ceil(p: String): Long? {
        val tp = java.lang.Long.parseLong(p)
        if (originFactory != null && originFactory is TimeAwareKMFFactory) {
            return (originFactory as TimeAwareKMFFactory).ceil(path(), tp)
        } else {
            return null
        }
    }*/

    override fun timeTree(): TimeTree {
        return (originFactory as TimeAwareKMFFactory).getTimeTree(path())
    }

}