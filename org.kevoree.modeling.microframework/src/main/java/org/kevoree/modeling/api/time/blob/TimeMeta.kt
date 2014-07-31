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
        //Deep Left first
        if (currentNode.left != null) {
            internalWalkerAsc(currentNode.left!!, walker)
        }
        //Infix walk
        walker.walk(currentNode.key)
        //Process Right
        if (currentNode.right != null) {
            internalWalkerAsc(currentNode.right!!, walker)
        }
    }

    private fun internalWalkerDesc(currentNode : Node, walker : TimeWalker) {
        //Deep right first
        if (currentNode.right != null) {
            internalWalkerDesc(currentNode.right!!,walker)
        }
        //Infix Walk
        walker.walk(currentNode.key)
        //Process Left
        if (currentNode.left != null) {
            internalWalkerDesc(currentNode.left!!, walker)
        }
    }

    fun walkRangeAsc(walker : TimeWalker, from : Long?, to : Long?) {
        //Looks for the closest version for the FROM, LowerOrEquals first
        var startNode : Node? = null
        if(from != null) {
            startNode = versionTree.lowerOrEqual(from)
            if(startNode == null) {
                startNode = versionTree.upper(from)
            }
            if(startNode == null) {
                // !! No version found !!
                return;
            }
        }

        //Processes while there is a parent and while the limit (to) has not been reached
        while(startNode != null && !internalRangeWalkerAsc(startNode!!, walker, to, true)) {
            if(startNode!!.parent == null) {
                startNode = null;
            } else {
                if(startNode == startNode!!.parent!!.left) {
                    startNode = startNode!!.parent
                } else {
                    do{
                        //Goes up in the tree while going up from the right child (the parent is lower)
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

       //returns true when the limit is reached
    private fun internalRangeWalkerAsc(currentNode : Node, walker : TimeWalker, to : Long? = null, first : Boolean = false) : Boolean {

        //When processing a range, we should not process the left branch of the element and of its parent hierarchy (all smaller)
        if (!first && currentNode.left != null) {
            if(internalRangeWalkerAsc(currentNode.left!!, walker, to)) {
                return true;
            }
        }
        if(to != null && currentNode.key.compareTo(to) >= 0) {
            //The limit is reached.
            return true;
        }
        walker.walk(currentNode.key)
        if (currentNode.right != null) {
            return internalRangeWalkerAsc(currentNode.right!!, walker, to)
        }
        return false;
    }



    fun walkRangeDesc(walker : TimeWalker, from : Long?, to : Long?) {
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
                if(startNode == startNode!!.parent!!.right) {
                    startNode = startNode!!.parent
                } else {
                    do{
                        //Goes up in the tree while going up from the left child (the parent is higher)
                        var fromLeft : Boolean = (startNode == startNode!!.parent!!.left)
                        startNode = startNode!!.parent
                    } while(fromLeft && startNode!!.parent != null)
                    if(startNode!!.parent == null) {
                        startNode = null
                    }
                }
            }
        }
    }


    private fun internalRangeWalkerDesc(currentNode : Node, walker : TimeWalker, to : Long? = null, first : Boolean = false) : Boolean {
        if (!first && currentNode.right != null) {
            if(internalRangeWalkerDesc(currentNode.right!!, walker, to)){
                return true;
            }
        }
        walker.walk(currentNode.key)
        if(to != null && currentNode.key.compareTo(to) <= 0) {
            return true;
        }
        if (currentNode.left != null) {
            return internalRangeWalkerDesc(currentNode.left!!, walker, to)
        }
        return false;
    }

}
