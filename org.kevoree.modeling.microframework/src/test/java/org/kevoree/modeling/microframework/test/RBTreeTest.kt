package org.kevoree.modeling.microframework.test

import org.junit.Test
import org.junit.BeforeClass
import org.junit.Assert.assertTrue
import kotlin.test.assertNull
import kotlin.test.assertNotNull
import java.util.Queue
import java.util.LinkedList
import org.kevoree.modeling.api.time.rbtree.RBTree
import org.kevoree.modeling.api.time.rbtree.State

/**
 * Created by gregory.nain on 01/08/2014.
 */

public class RBTreeTest {

    Test public fun nextTest() {
        val MIN : Long = 0L
        val MAX : Long = 99L
        for( j in (MIN+1)..MAX) {
            val tree : RBTree = RBTree()
            for(i in MIN..j) {
                if( (i % 3) == 0L ) {
                    tree.insert(i,State.DELETED);
                } else {
                    tree.insert(i,State.EXISTS);
                }
            }
            //printTree(tree.root!!);
            for(i in MIN..(j-1)) {
                assertTrue("I: " + i + " -> " + tree.next(i)?.key + " != " + (i+1), tree.next(i)?.key == i+1);
            }
            assertTrue("I: " + j + " -> " + tree.next(j)?.key + " != null", tree.next(j)?.key == null);
        }
    }

    private fun printTree(root : Node) {
        var queue : Queue<Node?> = LinkedList<Node?>();
        queue.add(root);
        queue.add(null);
        while(!queue.empty) {
            var current : Node? = queue.poll()
            while(current != null) {
                print("| " + current!!.key + " ")
                if(current!!.left != null) {
                    queue.add(current!!.left!!);
                }
                if(current!!.right != null) {
                    queue.add(current!!.right!!);
                }
                current = queue.poll()
            }
            println()
            if(!queue.empty) {
                queue.add(null);
            }
        }
    }

    Test public fun previousTest() {
        val MIN : Long = 0L
        val MAX : Long = 99L
        for( j in (MIN+1)..MAX) {
            val tree : RBTree = RBTree()
            for(i in MIN..j) {
                if( (i % 7) == 0L ) {
                    tree.insert(i,STATE.DELETED);
                } else {
                    tree.insert(i,STATE.EXISTS);
                }
            }
            //printTree(tree.root!!);
            for(i in j..MIN) {
                assertTrue("I: " + i + " -> " + tree.previous(i)?.key + " != " + (i-1), tree.previous(i)?.key == i-1);
            }
            assertTrue("I: " + j + " -> " + tree.previous(MIN)?.key + " != null", tree.previous(MIN)?.key == null);
        }
    }

    Test public fun nextWhileNotTest() {

        val tree : RBTree = RBTree()
        for(i in 0L..6L) {
            tree.insert(i,STATE.EXISTS);
        }
        tree.insert(8L,STATE.DELETED);
        tree.insert(10L,STATE.EXISTS);
        tree.insert(11L,STATE.EXISTS);
        tree.insert(13L,STATE.EXISTS);

        // printTree(tree.root!!)
        for(i in 0L..5L) {
            //println("i:" + i + " -> " + tree.upperUntil(i, STATE.DELETED)?.key + " != " + (i+1))
            assertTrue(tree.nextWhileNot(i, STATE.DELETED)?.key == (i+1));
        }
        assertTrue(tree.nextWhileNot(5, STATE.DELETED) != null && tree.nextWhileNot(5, STATE.DELETED)!!.key == 6L)
        assertNull(tree.nextWhileNot(6, STATE.DELETED))
        assertNull(tree.nextWhileNot(7, STATE.DELETED))
        assertNull(tree.nextWhileNot(8, STATE.DELETED))
        assertTrue( "" + tree.nextWhileNot(9, STATE.DELETED)!!.key, tree.nextWhileNot(9, STATE.DELETED) != null && tree.nextWhileNot(9, STATE.DELETED)!!.key == 10L)
        assertTrue(tree.nextWhileNot(10, STATE.DELETED) != null && tree.nextWhileNot(10, STATE.DELETED)!!.key == 11L)
    }

    Test public fun previousWhileNotTest() {

        val tree : RBTree = RBTree()
        for(i in 0L..6L) {
            tree.insert(i,STATE.EXISTS);
        }
        tree.insert(8L,STATE.DELETED);
        tree.insert(10L,STATE.EXISTS);
        tree.insert(11L,STATE.EXISTS);
        tree.insert(13L,STATE.EXISTS);

        assertTrue(tree.previousWhileNot(14, STATE.DELETED) != null && tree.previousWhileNot(14, STATE.DELETED)!!.key == 13L)
        assertTrue(tree.previousWhileNot(13, STATE.DELETED) != null && tree.previousWhileNot(13, STATE.DELETED)!!.key == 11L)
        assertTrue(tree.previousWhileNot(12, STATE.DELETED) != null && tree.previousWhileNot(12, STATE.DELETED)!!.key == 11L)
        assertTrue(tree.previousWhileNot(11, STATE.DELETED) != null && tree.previousWhileNot(11, STATE.DELETED)!!.key == 10L)
        assertNull(tree.previousWhileNot(10, STATE.DELETED))
        assertNull(tree.previousWhileNot(9, STATE.DELETED))
        assertNull(tree.previousWhileNot(8, STATE.DELETED))
        assertTrue(tree.previousWhileNot(7, STATE.DELETED) != null && tree.previousWhileNot(7, STATE.DELETED)!!.key == 6L)
        assertTrue(tree.previousWhileNot(6, STATE.DELETED) != null && tree.previousWhileNot(6, STATE.DELETED)!!.key == 5L)
    }

    Test public fun firstTest() {
        val MIN : Long = 0L
        val MAX : Long = 99L
        for( j in (MIN+1)..MAX) {
            val tree : RBTree = RBTree()
            for(i in MIN..j) {
                if( (i % 3) == 0L ) {
                    tree.insert(i,STATE.DELETED);
                } else {
                    tree.insert(i,STATE.EXISTS);
                }
            }
            assertTrue(tree.first()!!.key == MIN)
        }
    }

    Test public fun lastTest() {
        val MIN : Long = 0L
        val MAX : Long = 99L
        for( j in (MIN+1)..MAX) {
            val tree : RBTree = RBTree()
            for(i in MIN..j) {
                if( (i % 3) == 0L ) {
                    tree.insert(i,STATE.DELETED);
                } else {
                    tree.insert(i,STATE.EXISTS);
                }
            }
            assertTrue( "" +tree.last()!!.key + " != " + j, tree.last()!!.key == j)
        }
    }

    Test public fun firstWhileNot() {
        val tree : RBTree = RBTree()
        for(i in 0L..6L) {
            tree.insert(i,STATE.EXISTS);
        }
        tree.insert(8L,STATE.DELETED);
        tree.insert(10L,STATE.EXISTS);
        tree.insert(11L,STATE.EXISTS);
        tree.insert(13L,STATE.EXISTS);
        //printTree(tree.root!!)
        assertTrue(tree.firstWhileNot(14, STATE.DELETED)!!.key == 10L)
        assertTrue(tree.firstWhileNot(13, STATE.DELETED)!!.key == 10L)
        assertTrue(tree.firstWhileNot(12, STATE.DELETED)!!.key == 10L)
        assertTrue(tree.firstWhileNot(11, STATE.DELETED)!!.key == 10L)
        assertTrue(tree.firstWhileNot(10, STATE.DELETED)!!.key == 10L)
        assertNull(tree.firstWhileNot(9, STATE.DELETED))
        assertNull(tree.firstWhileNot(8, STATE.DELETED))
        assertTrue("" + tree.firstWhileNot(7, STATE.DELETED)!!.key, tree.firstWhileNot(7, STATE.DELETED)!!.key == 0L)
        assertTrue(tree.firstWhileNot(6, STATE.DELETED)!!.key == 0L)
    }

    Test public fun lastWhileNot() {
        val tree : RBTree = RBTree()
        for(i in 0L..6L) {
            tree.insert(i,STATE.EXISTS);
        }
        tree.insert(8L,STATE.DELETED);
        tree.insert(10L,STATE.EXISTS);
        tree.insert(11L,STATE.EXISTS);
        tree.insert(13L,STATE.EXISTS);
        //printTree(tree.root!!)
        assertTrue(tree.lastWhileNot(0, STATE.DELETED)!!.key == 6L)
        assertTrue(tree.lastWhileNot(5, STATE.DELETED)!!.key == 6L)
        assertTrue(tree.lastWhileNot(6, STATE.DELETED)!!.key == 6L)
        assertTrue(tree.lastWhileNot(7, STATE.DELETED)!!.key == 6L)
        assertNull(tree.lastWhileNot(8, STATE.DELETED))
        assertNull(tree.lastWhileNot(9, STATE.DELETED))
        assertTrue(tree.lastWhileNot(10, STATE.DELETED)!!.key == 13L)
        assertTrue(tree.lastWhileNot(11, STATE.DELETED)!!.key == 13L)
        assertTrue(tree.lastWhileNot(12, STATE.DELETED)!!.key == 13L)
        assertTrue(tree.lastWhileNot(13, STATE.DELETED)!!.key == 13L)
        assertTrue(tree.lastWhileNot(14, STATE.DELETED)!!.key == 13L)
    }

    Test public fun previousOrEqualTest() {
        val tree : RBTree = RBTree()
        for(i in 0L..6L) {
            tree.insert(i,STATE.EXISTS);
        }
        tree.insert(8L,STATE.DELETED);
        tree.insert(10L,STATE.EXISTS);
        tree.insert(11L,STATE.EXISTS);
        tree.insert(13L,STATE.EXISTS);
        //printTree(tree.root!!)
        assertNull(tree.previousOrEqual(-1))
        assertTrue(tree.previousOrEqual(0)!!.key == 0L)
        assertTrue(tree.previousOrEqual(1)!!.key == 1L)
        assertTrue(tree.previousOrEqual(7)!!.key == 6L)
        assertTrue(tree.previousOrEqual(8)!!.key == 8L)
        assertTrue(tree.previousOrEqual(9)!!.key == 8L)
        assertTrue(tree.previousOrEqual(10)!!.key == 10L)
        assertTrue(tree.previousOrEqual(13)!!.key == 13L)
        assertTrue(tree.previousOrEqual(14)!!.key == 13L)
    }

    Test public fun nextOrEqualTest() {
        val tree : RBTree = RBTree()
        for(i in 0L..6L) {
            tree.insert(i,STATE.EXISTS);
        }
        tree.insert(8L,STATE.DELETED);
        tree.insert(10L,STATE.EXISTS);
        tree.insert(11L,STATE.EXISTS);
        tree.insert(13L,STATE.EXISTS);
        //printTree(tree.root!!)
        assertTrue(tree.nextOrEqual(-1)!!.key == 0L)
        assertTrue(tree.nextOrEqual(0)!!.key == 0L)
        assertTrue(tree.nextOrEqual(1)!!.key == 1L)
        assertTrue(tree.nextOrEqual(7)!!.key == 8L)
        assertTrue(tree.nextOrEqual(8)!!.key == 8L)
        assertTrue(tree.nextOrEqual(9)!!.key == 10L)
        assertTrue(tree.nextOrEqual(10)!!.key == 10L)
        assertTrue(tree.nextOrEqual(13)!!.key == 13L)
        assertNull(tree.nextOrEqual(14))
    }

}


