package org.kevoree.modeling.api.time.blob

import org.kevoree.modeling.api.time.TimeWalker
import org.kevoree.modeling.api.time.TimeTree

/**
 * Created by duke on 6/4/14.
 */

/*
 *  key : path
  * */

class TimeMeta() : TimeTree {

    override fun first(): Long? {
        return versionTree.first()?.key
    }
    override fun last(): Long? {
        return versionTree.last()?.key
    }
    override fun next(from: Long): Long? {
        return versionTree.next(from)?.key
    }
    override fun previous(from: Long): Long? {
        return versionTree.previous(from)?.key
    }

    override fun walk(walker: TimeWalker) {
        return walkAsc(walker)
    }

    class object {
        final val GO_DOWN_LEFT: Short = 0;
        final val GO_DOWN_RIGHT: Short = 1;
        final val PROCESS_PREFIX: Short = 2;
        final val PROCESS_INFIX: Short = 3;
        final val PROCESS_POSTFIX: Short = 4;
    }

    var dirty: Boolean = true;

    var versionTree: RBTree = RBTree()

    override fun toString(): String {
        return versionTree.serialize()
    }

    fun load(payload: String) {
        versionTree.unserialize(payload)
        dirty = false;
    }

    override fun walkAsc(walker: TimeWalker) {
        var elem = versionTree.first()
        while (elem != null) {
            walker.walk(elem!!.key)
            elem = elem!!.next()
        }
    }

    override fun walkDesc(walker: TimeWalker) {
        var elem = versionTree.last()
        while (elem != null) {
            walker.walk(elem!!.key)
            elem = elem!!.previous()
        }
    }


    override fun walkRangeAsc(walker: TimeWalker, from: Long, to: Long) {
        var from2 = from
        var to2 = to
        if (from > to) {
            from2 = to
            to2 = from
        }
        var elem: Node?
        elem = versionTree.previousOrEqual(from2)
        while (elem != null) {
            walker.walk(elem!!.key)
            elem = elem!!.next()
            if (elem != null) {
                if (elem!!.key >= to2) {
                    return
                }
            }

        }
    }

    override fun walkRangeDesc(walker: TimeWalker, from: Long, to: Long) {
        var from2 = from
        var to2 = to
        if (from > to) {
            from2 = to
            to2 = from
        }
        var elem: Node?
        elem = versionTree.previousOrEqual(to2)
        while (elem != null) {
            walker.walk(elem!!.key)
            elem = elem!!.previous()
            if (elem != null) {
                if (elem!!.key <= from2) {
                    walker.walk(elem!!.key)
                    return
                }
            }

        }
    }

}
