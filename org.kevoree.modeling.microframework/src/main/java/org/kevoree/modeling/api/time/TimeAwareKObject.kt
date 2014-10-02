package org.kevoree.modeling.api.time

import org.kevoree.modeling.api.persistence.KObjectProxy
import org.kevoree.modeling.api.time.blob.EntityMeta
import org.kevoree.modeling.api.TimeTransaction
import org.kevoree.modeling.api.time.blob.TimeMeta
import org.kevoree.modeling.api.time.blob.STATE
import org.kevoree.modeling.api.TimedKObject

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 11/11/2013
 * Time: 16:01
 */

public trait TimeAwareKObject<A> : KObjectProxy, TimedKObject<A> {

    var meta: EntityMeta?

    internal fun getOriginTransaction(): TimeTransaction {
        return ((originFactory as TimeAwareKFactory).originTransaction) as TimeTransaction
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
        if (originFactory != null && originFactory is TimeAwareKFactory) {
            return (originFactory as TimeAwareKFactory).floor(path(), tp)
        } else {
            return null
        }
    }

    fun ceil(p: String): Long? {
        val tp = java.lang.Long.parseLong(p)
        if (originFactory != null && originFactory is TimeAwareKFactory) {
            return (originFactory as TimeAwareKFactory).ceil(path(), tp)
        } else {
            return null
        }
    }*/

    override fun timeTree(): TimeTree {
        return (originFactory as TimeAwareKFactory).getTimeTree(path())
    }

}