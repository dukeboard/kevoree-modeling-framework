package org.kevoree.modeling.api.time.blob

import org.kevoree.modeling.api.time.TimeWalker
import org.kevoree.modeling.api.time.TimePoint

/**
 * Created by duke on 6/4/14.
 */

/*
 *  key : path
  * */

class TimeMeta() {

    var dirty: Boolean = true;

    var versionTree: RBTree = RBTree()

    override fun toString(): String {
        return versionTree.serialize()
    }

    fun load(payload: String) {
        versionTree.unserialize(payload)
        dirty = false;
    }


    fun walkAsc(walker : TimeWalker) {
        walk(walker : TimeWalker, null, null, false)
    }

    fun walkDesc(walker : TimeWalker) {
        walk(walker : TimeWalker, null, null, false)
    }

    fun walkRangeAsc(walker : TimeWalker, from : TimePoint?, to : TimePoint?) {
        walk(walker : TimeWalker, from, to)
    }

    fun walkRangeDesc(walker : TimeWalker, from : TimePoint?, to : TimePoint?) {
        walk(walker : TimeWalker, from, to, false)
    }

    private fun internalWalkerAsc(currentNode : Node, walker : TimeWalker, limit : TimePoint? = null ) {
        if (currentNode.left != null) {
            internalWalkerAsc(currentNode.left!!, walker)
        }
        walker.walk(currentNode.key)
        if(limit == null || currentNode.key.compareTo(limit) < 0) {
            if (currentNode.right != null) {
                internalWalkerAsc(currentNode.right!!, walker)
            }
        }
    }

    private fun internalWalkerDesc(currentNode : Node, walker : TimeWalker, limit : TimePoint? = null ) {
        if (currentNode.right != null) {
            internalWalkerDesc(currentNode.right!!,walker)
        }
        walker.walk(currentNode.key)
        if(limit == null || currentNode.key.compareTo(limit) > 0) {
            if (currentNode.left != null) {
                internalWalkerDesc(currentNode.left!!, walker)
            }
        }
    }

    private fun walk(walker : TimeWalker, from : TimePoint? = null, to : TimePoint? = null, ascending : Boolean = true) {
        if(versionTree.root == null){
            return
        }

        var startNode : Node? = null
        if(from != null) {
            startNode = versionTree.lowerOrEqual(from)
            if(startNode == null) {
                startNode = versionTree.upper(from)
            }
            if(startNode == null) {
                return;
            }
        }

        if(ascending) {
            internalWalkerAsc(if(startNode==null){versionTree.root!!}else{startNode!!}, walker, to);
        } else {
            internalWalkerDesc(if(startNode==null){versionTree.root!!}else{startNode!!}, walker, to);
        }
    }



}
