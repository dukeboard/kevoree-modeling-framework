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
        if (versionTree.root != null) {
            var stop: Boolean = false
            var currentNode = versionTree.root!!
            var parentNode = currentNode.parent
            var actionToApply = GO_DOWN_LEFT
            while (!stop) {
                when (actionToApply) {
                    GO_DOWN_LEFT -> {
                        if (currentNode.left != null) {
                            parentNode = currentNode
                            currentNode = currentNode.left!!
                        } else {
                            //actionToApply = PROCESS_INFIX {
                            walker.walk(currentNode.key)
                            actionToApply = GO_DOWN_RIGHT
                            //}
                        }
                    }
                    GO_DOWN_RIGHT -> {
                        if (currentNode.right != null) {
                            parentNode = currentNode
                            currentNode = currentNode.right!!
                            actionToApply = GO_DOWN_LEFT
                        } else {
                            actionToApply = PROCESS_POSTFIX
                        }
                    }
                    PROCESS_POSTFIX -> {
                        if (currentNode.parent != null) {
                            if (currentNode == parentNode?.left) {

                                currentNode = currentNode.parent!!
                                parentNode = currentNode.parent

                                //actionToApply = PROCESS_INFIX {
                                walker.walk(currentNode.key)
                                actionToApply = GO_DOWN_RIGHT
                                //}
                            } else {
                                currentNode = currentNode.parent!!
                                parentNode = currentNode.parent
                                actionToApply = PROCESS_POSTFIX
                            }
                        } else {
                            stop = true
                        }
                    }
                }
            }
        }
    }

    override fun walkDesc(walker: TimeWalker) {
        if (versionTree.root != null) {
            var stop: Boolean = false
            var currentNode = versionTree.root!!
            var parentNode = currentNode.parent
            var actionToApply = GO_DOWN_RIGHT
            while (!stop) {
                when (actionToApply) {
                    GO_DOWN_LEFT -> {
                        if (currentNode.left != null) {
                            parentNode = currentNode
                            currentNode = currentNode.left!!
                            actionToApply = GO_DOWN_RIGHT
                        } else {
                            actionToApply = PROCESS_POSTFIX
                        }
                    }
                    GO_DOWN_RIGHT -> {
                        if (currentNode.right != null) {
                            parentNode = currentNode
                            currentNode = currentNode.right!!
                        } else {
                            //actionToApply = PROCESS_INFIX {
                            walker.walk(currentNode.key)
                            actionToApply = GO_DOWN_LEFT
                            //}
                        }
                    }
                    PROCESS_POSTFIX -> {
                        if (currentNode.parent != null) {
                            if (currentNode == parentNode?.right) {

                                currentNode = currentNode.parent!!
                                parentNode = currentNode.parent

                                //actionToApply = PROCESS_INFIX {
                                walker.walk(currentNode.key)
                                actionToApply = GO_DOWN_LEFT
                                //}
                            } else {
                                currentNode = currentNode.parent!!
                                parentNode = currentNode.parent
                                actionToApply = PROCESS_POSTFIX
                            }
                        } else {
                            stop = true
                        }
                    }
                }
            }
        }
    }

    override fun walkRangeAsc(walker: TimeWalker, from: Long?, to: Long?) {
        //Looks for the closest version for the FROM, LowerOrEquals first
        var startNode: Node? = null
        if (from != null) {
            startNode = versionTree.previousOrEqual(from)
            if (startNode == null) {
                startNode = versionTree.next(from)
            }
            if (startNode == null) {
                // !! No version found !!
                return;
            }
        }

        var stop: Boolean = false
        var currentNode = startNode!!
        var parentNode = currentNode.parent
        var actionToApply = PROCESS_INFIX
        while (!stop) {
            when (actionToApply) {
                GO_DOWN_LEFT -> {
                    if (currentNode.left != null) {
                        parentNode = currentNode
                        currentNode = currentNode.left!!
                    } else {
                        //actionToApply = PROCESS_INFIX {
                        if (to != null && currentNode.key.compareTo(to) > 0) {
                            stop = true;
                        } else {
                            walker.walk(currentNode.key)
                        }
                        actionToApply = GO_DOWN_RIGHT
                        //}
                    }
                }
                PROCESS_INFIX -> {
                    if (to != null && currentNode.key.compareTo(to) > 0) {
                        stop = true;
                    } else {
                        walker.walk(currentNode.key)
                    }
                    actionToApply = GO_DOWN_RIGHT
                }
                GO_DOWN_RIGHT -> {
                    if (currentNode.right != null) {
                        parentNode = currentNode
                        currentNode = currentNode.right!!
                        actionToApply = GO_DOWN_LEFT
                    } else {
                        actionToApply = PROCESS_POSTFIX
                    }
                }
                PROCESS_POSTFIX -> {
                    if (currentNode.parent != null) {
                        if (currentNode == parentNode?.left) {
                            currentNode = currentNode.parent!!
                            parentNode = currentNode.parent
                            //actionToApply = PROCESS_INFIX {
                            if (to != null && currentNode.key.compareTo(to) > 0) {
                                stop = true;
                            } else {
                                walker.walk(currentNode.key)
                            }
                            actionToApply = GO_DOWN_RIGHT
                            //}
                        } else {
                            currentNode = currentNode.parent!!
                            parentNode = currentNode.parent
                            actionToApply = PROCESS_POSTFIX
                        }
                    } else {
                        stop = true
                    }
                }
            }
        }
    }

    override fun walkRangeDesc(walker: TimeWalker, from: Long?, to: Long?) {
        var startNode: Node? = null
        if (from != null) {
            startNode = versionTree.previousOrEqual(from)
            if (startNode == null) {
                startNode = versionTree.next(from)
            }
            if (startNode == null) {
                return;
            }
        }
        var stop: Boolean = false
        var currentNode = startNode!!
        var parentNode = currentNode.parent
        var actionToApply = PROCESS_INFIX
        while (!stop) {
            when (actionToApply) {
                GO_DOWN_LEFT -> {
                    if (currentNode.left != null) {
                        parentNode = currentNode
                        currentNode = currentNode.left!!
                        actionToApply = GO_DOWN_RIGHT
                    } else {
                        actionToApply = PROCESS_POSTFIX
                    }
                }
                PROCESS_INFIX -> {
                    walker.walk(currentNode.key)
                    actionToApply = GO_DOWN_LEFT
                    if (to != null && currentNode.key < to) {
                        stop = true
                    }
                }
                GO_DOWN_RIGHT -> {
                    if (currentNode.right != null) {
                        parentNode = currentNode
                        currentNode = currentNode.right!!
                    } else {
                        //actionToApply = PROCESS_INFIX {
                        walker.walk(currentNode.key)
                        actionToApply = GO_DOWN_LEFT
                        if (to != null && currentNode.key < to) {
                            stop = true
                        }
                        //}
                    }
                }
                PROCESS_POSTFIX -> {
                    if (currentNode.parent != null) {
                        if (currentNode == parentNode?.right) {
                            currentNode = currentNode.parent!!
                            parentNode = currentNode.parent
                            //actionToApply = PROCESS_INFIX {
                            walker.walk(currentNode.key)
                            actionToApply = GO_DOWN_LEFT
                            if (to != null && currentNode.key < to) {
                                stop = true
                            }
                            //}
                        } else {
                            currentNode = currentNode.parent!!
                            parentNode = currentNode.parent
                            actionToApply = PROCESS_POSTFIX
                        }
                    } else {
                        stop = true
                    }
                }
            }
        }
    }

}
