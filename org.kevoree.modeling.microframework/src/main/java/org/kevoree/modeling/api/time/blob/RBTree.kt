package org.kevoree.modeling.api.time.blob

import org.kevoree.modeling.api.time.TimePoint

/**
 * Created by duke on 6/4/14.
 */

enum class Color {
    RED
    BLACK
}

class Node(var key: TimePoint, var value: String, var color: Color, var left: Node?, var right: Node?) {
    public var parent: Node? = null

    {
        if (left != null)
            left!!.parent = this
        if (right != null)
            right!!.parent = this
        this.parent = null
    }

    fun grandparent(): Node? {
        return parent?.parent
    }

    fun sibling(): Node? {
        if (this == parent?.left)
            return parent?.right
        else
            return parent?.left
    }
    fun uncle(): Node? {
        return parent?.sibling()
    }

    fun serialize(builder: StringBuilder) {
        builder.append(key)
        builder.append(";")
        builder.append(value)
        builder.append(";")
        if (color == Color.RED) {
            builder.append("R")
        } else {
            builder.append("B")
        }
        builder.append("|")
        if (left != null) {
            left?.serialize(builder)
        } else {
            builder.append("#|")
        }
        if (right != null) {
            right?.serialize(builder)
        } else {
            builder.append("#|")
        }
    }


}

private class ReaderContext(val payload: String, var offset: Int) {

    fun unserialize(): Node? {
        var tokenBuild = StringBuilder()
        var ch = payload.get(offset)
        if (ch == '#') {
            offset = offset + 2
            return null
        }
        while (offset < payload.length && ch != '|') {
            tokenBuild.append(ch)
            offset = offset + 1
            ch = payload.get(offset)
        }
        if (ch != '|') {
            tokenBuild.append(ch)
        } else {
            offset = offset + 1
        }
        var splitted = tokenBuild.toString().split(";")
        var color = if (splitted.get(2) == "B") {
            Color.BLACK
        } else {
            Color.RED
        }
        var p = Node(TimePoint.create(splitted.get(0)), splitted.get(1), color, null, null)
        val left = unserialize()
        if (left != null) {
            left.parent = p
        }
        val right = unserialize()
        if (right != null) {
            right.parent = p
        }
        p.left = left
        p.right = right
        return p
    }
}


trait VersionTree {
    fun floor(key: TimePoint)
}

public class RBTree {

    public var root: Node? = null

    fun serialize(): String {
        var builder = StringBuilder()
        root?.serialize(builder)
        return builder.toString()
    }

    fun unserialize(payload: String) {
        root = ReaderContext(payload, 0).unserialize()
    }

    fun lowerOrEqual(key: TimePoint): Node? {
        var p = root
        if (p == null) {
            return null
        }
        while (p != null) {
            val cmp = compare(key, p!!.key)
            if (cmp == 0) {
                return p
            }
            if (cmp > 0) {
                if (p!!.right != null)
                    p = p!!.right
                else
                    return p
            } else {
                if (p!!.left != null) {
                    p = p!!.left
                } else {
                    var parent = p!!.parent
                    var ch = p
                    while (parent != null && ch == parent!!.left) {
                        ch = parent
                        parent = parent!!.parent
                    }
                    return parent
                }
            }
        }
        return null
    }

    fun lower(key: TimePoint): Node? {
        var p = root
        if (p == null) {
            return null
        }
        while (p != null) {
            val cmp = compare(key, p!!.key)
            if (cmp > 0) {
                if (p!!.right != null) {
                    p = p!!.right
                } else {
                    return p
                }
            } else {
                if (p!!.left != null) {
                    p = p!!.left
                } else {
                    var parent = p!!.parent
                    var ch = p
                    while (parent != null && ch == parent!!.left) {
                        ch = parent
                        parent = parent!!.parent
                    }
                    return parent
                }
            }
        }
        return null
    }


    fun lowerUntil(key: TimePoint, until: String): Node? {
        val current = lookup(key)
        if(current!= null && current == until){
            return null;
        }
        var root = lower(key)
        if(root == null || root!!.value.equals(until)){
            return null;
        } else {
            return root;
        }
    }

    fun upper(key: TimePoint): Node? {
        var p = root
        if (p == null) {
            return null
        }
        while (p != null) {
            val cmp = compare(key, p!!.key)
            if (cmp > 0) {
                if (p!!.right != null) {
                    p = p!!.right;
                } else {
                    return null;
                }
            } else {
                if (cmp == 0) {
                    if (p!!.right != null) {
                        p = p!!.right;
                    } else {
                        return null;
                    }
                }
                if (p!!.left != null) {
                    val cmp2 = compare(key, p!!.left!!.key)
                    if (cmp2 < 0) {
                        p = p!!.left
                    } else {
                        return p;
                    }
                } else {
                    return p;
                }
            }
        }
        return null
    }

    fun upperUntil(key: TimePoint, until: String): Node? {
        val current = lookup(key)
        if(current!= null && current == until){
            return null;
        }
        var root = upper(key)
        if(root == null || root!!.value.equals(until)){
            return null;
        } else {
            return root;
        }
    }

    fun compare(k1: TimePoint, k2: TimePoint): Int {
        return k1.compareTo(k2)
    }

    private fun lookupNode(key: TimePoint): Node? {
        var n = root
        if (n == null) {
            return null
        }
        while (n != null) {
            val compResult = key.compareTo(n!!.key)
            if (compResult == 0) {
                return n
            } else {
                if (compResult < 0) {
                    n = n!!.left
                } else {
                    n = n!!.right
                }
            }
        }
        return n
    }
    public fun lookup(key: TimePoint): String? {
        val n = lookupNode(key)
        return (if (n == null)
            null
        else
            n.value)
    }
    private fun rotateLeft(n: Node) {
        val r = n.right
        replaceNode(n, r!!)
        n.right = r.left
        if (r.left != null) {
            r.left!!.parent = n
        }
        r.left = n
        n.parent = r
    }

    private fun rotateRight(n: Node) {
        val l = n.left
        replaceNode(n, l!!)
        n.left = l.right
        if (l.right != null) {
            l.right!!.parent = n
        }
        l.right = n
        n.parent = l
    }
    private fun replaceNode(oldn: Node, newn: Node?) {
        if (oldn.parent == null) {
            root = newn
        } else {
            if (oldn == oldn.parent!!.left)
                oldn.parent!!.left = newn
            else
                oldn.parent!!.right = newn
        }
        if (newn != null) {
            newn.parent = oldn.parent
        }
    }
    public fun insert(key: TimePoint, value: String) {
        val insertedNode = Node(key, value, Color.RED, null, null)
        if (root == null) {
            root = insertedNode
        } else {
            var n = root
            while (true) {
                val compResult = key.compareTo(n!!.key)
                if (compResult == 0) {
                    n!!.value = value
                    return
                } else
                    if (compResult < 0) {
                        if (n!!.left == null) {
                            n!!.left = insertedNode
                            break
                        } else {
                            n = n!!.left!!
                        }
                    } else {
                        if (n!!.right == null) {
                            n!!.right = insertedNode
                            break
                        } else {
                            n = n!!.right
                        }
                    }
            }
            insertedNode.parent = n
        }
        insertCase1(insertedNode)
    }
    private fun insertCase1(n: Node) {
        if (n.parent == null)
            n.color = Color.BLACK
        else
            insertCase2(n)
    }
    private fun insertCase2(n: Node) {
        if (nodeColor(n.parent) == Color.BLACK)
            return
        else
            insertCase3(n)
    }
    private fun insertCase3(n: Node) {
        if (nodeColor(n.uncle()) == Color.RED) {
            n.parent!!.color = Color.BLACK
            n.uncle()!!.color = Color.BLACK
            n.grandparent()!!.color = Color.RED
            insertCase1(n.grandparent()!!)
        } else {
            insertCase4(n)
        }
    }
    private fun insertCase4(n_n: Node) {
        var n = n_n
        if (n == n.parent!!.right && n.parent == n.grandparent()!!.left) {
            rotateLeft(n.parent!!)
            n = n.left!!
        } else {
            if (n == n.parent!!.left && n.parent == n.grandparent()!!.right) {
                rotateRight(n.parent!!)
                n = n.right!!
            }
        }
        insertCase5(n)
    }
    private fun insertCase5(n: Node) {
        n.parent!!.color = Color.BLACK
        n.grandparent()!!.color = Color.RED
        if (n == n.parent!!.left && n.parent == n.grandparent()!!.left) {
            rotateRight(n.grandparent()!!)
        } else {
            rotateLeft(n.grandparent()!!)
        }
    }
    public fun delete(key: TimePoint) {
        var n = lookupNode(key)
        if (n == null) {
            return
        } else {
            if (n!!.left != null && n!!.right != null) {
                // Copy key/value from predecessor and then delete it instead
                val pred = maximumNode(n!!.left!!)
                n!!.key = pred.key
                n!!.value = pred.value
                n = pred
            }
            val child = if ((n!!.right == null)) {
                n!!.left
            } else {
                n!!.right
            }
            if (nodeColor(n) == Color.BLACK) {
                n!!.color = nodeColor(child)
                deleteCase1(n!!)
            }
            replaceNode(n!!, child)
        }
    }
    private fun deleteCase1(n: Node) {
        if (n.parent == null) {
            return
        } else {
            deleteCase2(n)
        }
    }
    private fun deleteCase2(n: Node) {
        if (nodeColor(n.sibling()) == Color.RED) {
            n.parent!!.color = Color.RED
            n.sibling()!!.color = Color.BLACK
            if (n == n.parent!!.left) {
                rotateLeft(n.parent!!)
            } else {
                rotateRight(n.parent!!)
            }
        }
        deleteCase3(n)
    }
    private fun deleteCase3(n: Node) {
        if (nodeColor(n.parent) == Color.BLACK && nodeColor(n.sibling()) == Color.BLACK && nodeColor(n.sibling()!!.left) == Color.BLACK && nodeColor(n.sibling()!!.right) == Color.BLACK) {
            n.sibling()!!.color = Color.RED
            deleteCase1(n.parent!!)
        } else {
            deleteCase4(n)
        }
    }
    private fun deleteCase4(n: Node) {
        if (nodeColor(n.parent) == Color.RED && nodeColor(n.sibling()) == Color.BLACK && nodeColor(n.sibling()!!.left) == Color.BLACK && nodeColor(n.sibling()!!.right) == Color.BLACK) {
            n.sibling()!!.color = Color.RED
            n.parent!!.color = Color.BLACK
        } else {
            deleteCase5(n)
        }
    }
    private fun deleteCase5(n: Node) {
        if (n == n.parent!!.left && nodeColor(n.sibling()) == Color.BLACK && nodeColor(n.sibling()!!.left) == Color.RED && nodeColor(n.sibling()!!.right) == Color.BLACK) {
            n.sibling()!!.color = Color.RED
            n.sibling()!!.left!!.color = Color.BLACK
            rotateRight(n.sibling()!!)
        } else
            if (n == n.parent!!.right && nodeColor(n.sibling()) == Color.BLACK && nodeColor(n.sibling()!!.right) == Color.RED && nodeColor(n.sibling()!!.left) == Color.BLACK) {
                n.sibling()!!.color = Color.RED
                n.sibling()!!.right!!.color = Color.BLACK
                rotateLeft(n.sibling()!!)
            }
        deleteCase6(n)
    }
    private fun deleteCase6(n: Node) {
        n.sibling()!!.color = nodeColor(n.parent)
        n.parent!!.color = Color.BLACK
        if (n == n.parent!!.left) {
            n.sibling()!!.right!!.color = Color.BLACK
            rotateLeft(n.parent!!)
        } else {
            n.sibling()!!.left!!.color = Color.BLACK
            rotateRight(n.parent!!)
        }
    }

    private fun nodeColor(n: Node?): Color {
        return if (n == null) {
            Color.BLACK
        } else {
            n.color
        }
    }

    public fun max(): Node? {
        if (this.root == null) {
            return null
        } else {
            return maximumNode(this.root!!)
        }
    }

    fun relativeMax(from: TimePoint, without: String): Node? {
        val current = lookup(from);
        if(current != null && current == without){
            return null;
        }
        var n = lower(from)
        if (n == null || n!!.value.equals(without)) {
            return null
        } else {
            //climb to the maximal parent
            while (n!!.parent != null && n!!.parent!!.key.compareTo(n!!.key) > 0) {
                n = n!!.parent
            }
            while (n!!.right != null && !n!!.value.equals(without)) {
                n = n!!.right!!
            }
            if (!n!!.value.equals(without)) {
                return n
            } else {
                if (n!!.left != null) {
                    return n!!.left
                } else {
                    return n!!.parent
                }
            }
        }
    }

    private fun maximumNode(m: Node): Node {
        var n = m
        while (n.right != null) {
            n = n.right!!
        }
        return n
    }


}