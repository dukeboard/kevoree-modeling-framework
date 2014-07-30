package org.kevoree.modeling.api.time.blob

import org.kevoree.modeling.api.time.TimeWalker

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

    fun walk(walker : TimeWalker) {
        walk(walker, false)
    }

    fun walk(walker : TimeWalker, descending : Boolean = false) {
        if(versionTree.root == null){
            return
        }
        if(descending) {
            internalWalkerDec(versionTree.root!!, walker);
        } else {
            internalWalkerAsc(versionTree.root!!, walker);
        }
    }

    private fun internalWalkerAsc(currentNode : Node, walker : TimeWalker) {
        if (currentNode.left != null) {
            internalWalkerAsc(currentNode.left!!, walker)
        }
        walker.walk(currentNode.key)
        if (currentNode.right != null) {
            internalWalkerAsc(currentNode.right!!,walker)
        }
    }

    private fun internalWalkerDec(currentNode : Node, walker : TimeWalker) {
        if (currentNode.right != null) {
            internalWalkerDec(currentNode.right!!,walker)
        }
        walker.walk(currentNode.key)
        if (currentNode.left != null) {
            internalWalkerDec(currentNode.left!!, walker)
        }
    }


}
