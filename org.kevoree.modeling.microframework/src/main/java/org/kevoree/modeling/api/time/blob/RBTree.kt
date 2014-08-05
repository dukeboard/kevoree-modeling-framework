package org.kevoree.modeling.api.time.blob

/**
 * Created by duke on 6/4/14.
 */

enum class Color {
    RED
    BLACK
}

enum class STATE {
    EXISTS
    DELETED
}

object RBCONST {
    val BLACK_DELETE = '0'
    val BLACK_EXISTS = '1'
    val RED_DELETE = '2'
    val RED_EXISTS = '3'
}

class Node(var key: Long, var value: STATE, var color: Color, var left: Node?, var right: Node?) {
    public var parent: Node? = null

    {
        if (left != null) {
            left!!.parent = this
        }
        if (right != null) {
            right!!.parent = this
        }
        this.parent = null
    }

    fun grandparent(): Node? {
        return parent?.parent
    }

    fun sibling(): Node? {
        if (this == parent?.left) {
            return parent?.right
        } else {
            return parent?.left
        }
    }
    fun uncle(): Node? {
        return parent?.sibling()
    }

    fun serialize(builder: StringBuilder) {
        builder.append("|")
        if (value == STATE.DELETED) {
            if (color == Color.BLACK) {
                builder.append(RBCONST.BLACK_DELETE)
            } else {
                builder.append(RBCONST.RED_DELETE)
            }
        } else {
            if (color == Color.BLACK) {
                builder.append(RBCONST.BLACK_EXISTS)
            } else {
                builder.append(RBCONST.RED_EXISTS)
            }
        }
        builder.append(key)
        if(left == null && right == null){
            builder.append("%")
        } else {
            if (left != null) {
                left?.serialize(builder)
            } else {
                builder.append("#")
            }
            if (right != null) {
                right?.serialize(builder)
            } else {
                builder.append("#")
            }
        }
    }

    /*
    unefficient for the moment
    fun serializeBinary(buffer: ByteBuffer) {
        buffer.put(0)
        buffer.putLong(key)
        if(value == STATE.EXISTS){
            buffer.put(0)
        } else {
            buffer.put(1)
        }
        if(color == Color.RED){
            buffer.put(0)
        } else {
            buffer.put(1)
        }
        if (left != null) {
            left?.serializeBinary(buffer)
        } else {
            buffer.put(1)
        }
        if (right != null) {
            right?.serializeBinary(buffer)
        } else {
            buffer.put(1)
        }
    } */

    fun next(): Node? {
        var p: Node? = this
        if (p!!.right != null) {
            p = p!!.right!!
            while (p!!.left != null) {
                p = p!!.left!!
            }
            return p;
        } else {
            if (p!!.parent != null) {
                if (p == p!!.parent!!.left) {
                    return p!!.parent!!
                } else {
                    while (p!!.parent != null && p == p!!.parent!!.right) {
                        p = p!!.parent!!
                    }
                    return p!!.parent
                }
            } else {
                return null
            }
        }
    }

    fun previous(): Node? {
        var p: Node? = this
        if (p!!.left != null) {
            p = p!!.left!!
            while (p!!.right != null) {
                p = p!!.right!!
            }
            return p;
        } else {
            if (p!!.parent != null) {
                if (p == p!!.parent!!.right) {
                    return p!!.parent!!
                } else {
                    while (p!!.parent != null && p == p!!.parent!!.left) {
                        p = p!!.parent!!
                    }
                    return p!!.parent
                }
            } else {
                return null
            }
        }
    }

}

private class ReaderContext(val payload: String, var offset: Int) {

    fun unserialize(rightBranch : Boolean): Node? {
        if (offset >= payload.length) {
            return null;
        }
        var tokenBuild = StringBuilder()
        var ch = payload.get(offset)
        if (ch == '%') {
            if(rightBranch){
                offset = offset + 1
            }
            return null
        }
        if (ch == '#') {
            offset = offset + 1
            return null
        }
        if (ch != '|') {
            throw Exception("Error while loading BTree")
        }
        offset = offset + 1
        ch = payload.get(offset)
        var color : Color = Color.BLACK
        var state : STATE = STATE.EXISTS
        when(ch){
            RBCONST.BLACK_DELETE -> {color = Color.BLACK;state=STATE.DELETED}
            RBCONST.BLACK_EXISTS -> {color = Color.BLACK;state=STATE.EXISTS}
            RBCONST.RED_DELETE -> {color = Color.RED;state=STATE.DELETED}
            RBCONST.RED_EXISTS -> {color = Color.RED;state=STATE.EXISTS}
        }
        offset = offset + 1
        ch = payload.get(offset)
        while (offset + 1 < payload.length && ch != '|' && ch != '#' && ch != '%') {
            tokenBuild.append(ch)
            offset = offset + 1
            ch = payload.get(offset)
        }
        if (ch != '|' && ch != '#' && ch != '%') {
            tokenBuild.append(ch)
        }
        var p = Node(java.lang.Long.parseLong(tokenBuild.toString()), state, color, null, null)
        val left = unserialize(false)
        if (left != null) {
            left.parent = p
        }
        val right = unserialize(true)
        if (right != null) {
            right.parent = p
        }
        p.left = left
        p.right = right
        return p
    }
}

public class RBTree {

    public var root: Node? = null

    private var size: Int = 0

    fun size(): Int {
        return size
    }

    fun serialize(): String {
        var builder = StringBuilder()
        builder.append(size)
        root?.serialize(builder)
        return builder.toString()
    }

    /*
     fun serializeBinary() : ByteBuffer {
         var bb = ByteBuffer.allocate(size*13)
         root?.serializeBinary(bb)
         return bb
     }*/


    fun unserialize(payload: String) {
        if (payload.size == 0) {
            return
        }
        var i = 0
        var buffer = StringBuilder()
        var ch = payload.get(i)
        while (i < payload.length && ch != '|' ) {
            buffer.append(ch)
            i = i + 1
            ch = payload.get(i)
        }
        size = java.lang.Integer.parseInt(buffer.toString())
        root = ReaderContext(payload, i).unserialize(true)
    }

    fun previousOrEqual(key: Long): Node? {
        var p = root
        if (p == null) {
            return null
        }
        while (p != null) {
            if (key == p!!.key) {
                return p
            }
            if (key > p!!.key) {
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

    fun nextOrEqual(key: Long): Node? {
        var p = root
        if (p == null) {
            return null
        }
        while (p != null) {
            if (key == p!!.key) {
                return p
            }
            if (key < p!!.key) {
                if (p!!.left != null) {
                    p = p!!.left
                } else {
                    return p
                }
            } else {
                if (p!!.right != null) {
                    p = p!!.right
                } else {
                    var parent = p!!.parent
                    var ch = p
                    while (parent != null && ch == parent!!.right) {
                        ch = parent
                        parent = parent!!.parent
                    }
                    return parent
                }
            }
        }
        return null
    }

    fun previous(key: Long): Node? {
        var p = root
        if (p == null) {
            return null
        }
        while (p != null) {
            if (key < p!!.key) {
                if (p!!.left != null) {
                    p = p!!.left!!
                } else {
                    return p!!.previous();
                }
            } else if ( key > p!!.key) {
                if (p!!.right != null) {
                    p = p!!.right!!
                } else {
                    return p;
                }
            } else {
                return p!!.previous();
            }
        }
        return null
    }


    fun previousWhileNot(key: Long, until: STATE): Node? {
        var elm = previousOrEqual(key)
        if (elm!!.value.equals(until)) {
            return null;
        } else {
            if (elm!!.key == key) {
                elm = elm!!.previous()
            }
        }
        if (elm == null || elm!!.value.equals(until)) {
            return null;
        } else {
            return elm;
        }
    }

    fun next(key: Long): Node? {
        var p = root
        if (p == null) {
            return null
        }
        while (p != null) {
            if (key < p!!.key) {
                if (p!!.left != null) {
                    p = p!!.left!!
                } else {
                    return p;
                }
            } else if ( key > p!!.key) {
                if (p!!.right != null) {
                    p = p!!.right!!
                } else {
                    return p!!.next();
                }
            } else {
                return p!!.next();
            }
        }
        return null
    }

    fun nextWhileNot(key: Long, until: STATE): Node? {
        var elm = nextOrEqual(key)
        if (elm!!.value.equals(until)) {
            return null;
        } else {
            if (elm!!.key == key) {
                elm = elm!!.next()
            }
        }
        if (elm == null || elm!!.value.equals(until)) {
            return null;
        } else {
            return elm;
        }
    }

    fun first(): Node? {
        var p = root
        if (p == null) {
            return null
        }
        while (p != null) {
            if (p!!.left != null) {
                p = p!!.left!!
            } else {
                return p
            }
        }
        return null
    }

    fun last(): Node? {
        var p = root
        if (p == null) {
            return null
        }
        while (p != null) {
            if (p!!.right != null) {
                p = p!!.right!!
            } else {
                return p
            }
        }
        return null;
    }

    fun firstWhileNot(key: Long, until: STATE): Node? {
        var elm = previousOrEqual(key)
        if (elm == null ) {
            return null
        } else if (elm!!.value.equals(until)) {
            return null
        }
        var prev: Node?
        do {
            prev = elm!!.previous();
            if (prev == null || prev!!.value.equals(until)) {
                return elm
            } else {
                elm = prev
            }
        } while (elm != null)
        return prev;
    }

    fun lastWhileNot(key: Long, until: STATE): Node? {
        var elm = previousOrEqual(key)
        if (elm == null ) {
            return null
        } else if (elm!!.value.equals(until)) {
            return null
        }
        var next: Node?
        do {
            next = elm!!.next();
            if (next == null || next!!.value.equals(until)) {
                return elm
            } else {
                elm = next
            }
        } while (elm != null)
        return next;
    }

    private fun lookupNode(key: Long): Node? {
        var n = root
        if (n == null) {
            return null
        }
        while (n != null) {
            if (key == n!!.key) {
                return n
            } else {
                if (key < n!!.key) {
                    n = n!!.left
                } else {
                    n = n!!.right
                }
            }
        }
        return n;
    }

    public fun lookup(key: Long): STATE? {
        val n = lookupNode(key)
        if (n == null) {
            return null;
        } else {
            return n.value;
        }
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
            if (oldn == oldn.parent!!.left) {
                oldn.parent!!.left = newn
            } else {
                oldn.parent!!.right = newn
            }
        }
        if (newn != null) {
            newn.parent = oldn.parent
        }
    }
    public fun insert(key: Long, value: STATE) {
        val insertedNode = Node(key, value, Color.RED, null, null)
        if (root == null) {
            size++
            root = insertedNode
        } else {
            var n = root
            while (true) {
                if (key == n!!.key) {
                    n!!.value = value
                    //nop size
                    return
                } else
                    if (key < n!!.key) {
                        if (n!!.left == null) {
                            n!!.left = insertedNode
                            size++
                            break
                        } else {
                            n = n!!.left!!
                        }
                    } else {
                        if (n!!.right == null) {
                            n!!.right = insertedNode
                            size++
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
        if (n.parent == null) {
            n.color = Color.BLACK
        } else {
            insertCase2(n)
        }
    }
    private fun insertCase2(n: Node) {
        if (nodeColor(n.parent) == Color.BLACK) {
            return
        } else {
            insertCase3(n)
        }
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
    public fun delete(key: Long) {
        var n = lookupNode(key)
        if (n == null) {
            return
        } else {
            size--;
            if (n!!.left != null && n!!.right != null) {
                // Copy key/value from predecessor and then delete it instead
                var pred = n!!.left!!
                while (pred.right != null) {
                    pred = pred.right!!
                }
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
        if (n == null) {
            return Color.BLACK
        } else {
            return n.color
        }
    }

}