package org.kevoree.modeling.api.time.blob

import org.kevoree.modeling.api.time.TimeWalker
import org.kevoree.modeling.api.time.TimeComparator

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
        if(versionTree.root != null) {
            internalWalkerAsc(versionTree.root!!, walker : TimeWalker)
        }
    }

    fun walkDesc(walker : TimeWalker) {
        if(versionTree.root != null) {
            internalWalkerDesc(versionTree.root!!, walker : TimeWalker)
        }
    }


    private fun internalWalkerAsc(currentNode : Node, walker : TimeWalker) {
        if (currentNode.left != null) {
            internalWalkerAsc(currentNode.left!!, walker)
        }
        walker.walk(currentNode.key)
        if (currentNode.right != null) {
            internalWalkerAsc(currentNode.right!!, walker)
        }

    }

    private fun internalWalkerDesc(currentNode : Node, walker : TimeWalker) {
        if (currentNode.right != null) {
            internalWalkerDesc(currentNode.right!!,walker)
        }
        walker.walk(currentNode.key)
        if (currentNode.left != null) {
            internalWalkerDesc(currentNode.left!!, walker)
        }
    }

    fun walkRangeAsc(walker : TimeWalker, from : TimePoint?, to : TimePoint?) {
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

        while(startNode != null && !internalRangeWalkerAsc(startNode!!, walker, to, true)) {
            startNode = startNode!!.parent;
        }
    }

    fun walkRangeDesc(walker : TimeWalker, from : TimePoint?, to : TimePoint?) {
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
        while(startNode != null && !internalRangeWalkerDesc(startNode!!, walker, to, true)) {
           if(startNode!!.parent == null) {
               startNode = null;
           } else {
               if(startNode == startNode!!.parent!!.left) {
                   startNode = startNode!!.parent
               } else {
                   do{
                       var fromRight : Boolean = (startNode == startNode!!.parent!!.right)
                       startNode = startNode!!.parent
                   } while(fromRight && startNode!!.parent != null)
                   if(startNode!!.parent == null) {
                       startNode = null
                   }

               }
           }


        }
    }

    private fun internalRangeWalkerAsc(currentNode : Node, walker : TimeWalker, to : TimePoint? = null, first : Boolean = false) : Boolean {

        if (!first && currentNode.left != null) {
            if(internalRangeWalkerAsc(currentNode.left!!, walker, to)) {
                return true;
            }
        }
        walker.walk(currentNode.key)
        if(to != null && currentNode.key.compareTo(to) != -1) {
            return true;
        }
        if (currentNode.right != null) {
            return internalRangeWalkerAsc(currentNode.right!!, walker, to)
        }
        return false;
    }

    private fun internalRangeWalkerDesc(currentNode : Node, walker : TimeWalker, to : TimePoint? = null, first : Boolean = false) : Boolean {
        if (!first && currentNode.right != null) {
            if(internalRangeWalkerDesc(currentNode.right!!, walker)){
                return true;
            }
        }
        walker.walk(currentNode.key)
        if(to != null && currentNode.key.compareTo(to) != 1) {
            return true;
        }
        if (currentNode.left != null) {
            return internalRangeWalkerDesc(currentNode.left!!, walker)
        }
        return false;
    }

}
