package org.kevoree.modeling.microframework.test;


import org.junit.Test;
import org.junit.Assert;
import org.kevoree.modeling.api.time.rbtree.TreeNode;
import org.kevoree.modeling.api.time.rbtree.RBTree;
import org.kevoree.modeling.api.time.rbtree.State;

import java.util.LinkedList;


/**
 * Created by gregory.nain on 01/08/2014.
 */

public class RBTreeTest {

    @Test
    public void nextTest() {
        long MIN = 0L;
        long MAX = 99L;
        for (long j = MIN; j <= MAX; j++) {
            RBTree tree = new RBTree();
            for (long i = MIN; i <= j; i++) {
                if ((i % 3) == 0L) {
                    tree.insert(i, State.DELETED);
                } else {
                    tree.insert(i, State.EXISTS);
                }
            }
            for (long i = MIN; i < j - 1; i++) {
                Assert.assertTrue(tree.next(i).getKey() == i + 1);
            }
            Assert.assertTrue(tree.next(j) == null);
        }
    }

    private void printTree(TreeNode root) {
        LinkedList<TreeNode> queue = new LinkedList<TreeNode>();
        queue.add(root);
        queue.add(null);
        while (!queue.isEmpty()) {
            TreeNode current = queue.poll();
            while (current != null) {
                System.out.print("| " + current.getKey() + " ");
                if (current.getLeft() != null) {
                    queue.add(current.getLeft());
                }
                if (current.getRight() != null) {
                    queue.add(current.getRight());
                }
                current = queue.poll();
            }
            System.out.println();
            if (!queue.isEmpty()) {
                queue.add(null);
            }
        }
    }

    @Test
    public void previousTest() {
        long MIN = 0L;
        long MAX = 99L;
        for (long j = MIN + 1; j <= MAX; j++) {
            RBTree tree = new RBTree();
            for (long i = MIN; i <= j; i++) {
                if ((i % 7) == 0L) {
                    tree.insert(i, State.DELETED);
                } else {
                    tree.insert(i, State.EXISTS);
                }
            }
            for (long i = j; i > MIN; i--) {
                Assert.assertTrue(tree.previous(i).getKey() == i - 1);
            }
            Assert.assertTrue(tree.previous(MIN) == null);
        }
    }

    @Test
    public void nextWhileNotTest() {
        RBTree tree = new RBTree();
        for (long i = 0; i <= 6; i++) {
            tree.insert(i, State.EXISTS);
        }
        tree.insert(8L, State.DELETED);
        tree.insert(10L, State.EXISTS);
        tree.insert(11L, State.EXISTS);
        tree.insert(13L, State.EXISTS);

        // printTree(tree.root!!)
        for (long i = 0; i < 5; i++) {
            //println("i:" + i + " -> " + tree.upperUntil(i, State.DELETED)?.domainKey + " != " + (i+1))
            Assert.assertTrue(tree.nextWhileNot(i, State.DELETED).getKey() == (i + 1));
        }
        Assert.assertTrue(tree.nextWhileNot(5, State.DELETED) != null && tree.nextWhileNot(5, State.DELETED).getKey() == 6L);
        Assert.assertNull(tree.nextWhileNot(6, State.DELETED));
        Assert.assertNull(tree.nextWhileNot(7, State.DELETED));
        Assert.assertNull(tree.nextWhileNot(8, State.DELETED));
        Assert.assertTrue(tree.nextWhileNot(9, State.DELETED) != null && tree.nextWhileNot(9, State.DELETED).getKey() == 10L);
        Assert.assertTrue(tree.nextWhileNot(10, State.DELETED) != null && tree.nextWhileNot(10, State.DELETED).getKey() == 11L);
    }

    @Test
    public void previousWhileNotTest() {
        RBTree tree = new RBTree();
        for (long i = 0; i <= 6; i++) {
            tree.insert(i, State.EXISTS);
        }
        tree.insert(8L, State.DELETED);
        tree.insert(10L, State.EXISTS);
        tree.insert(11L, State.EXISTS);
        tree.insert(13L, State.EXISTS);
        Assert.assertTrue(tree.previousWhileNot(14, State.DELETED) != null && tree.previousWhileNot(14, State.DELETED).getKey() == 13L);
        Assert.assertTrue(tree.previousWhileNot(13, State.DELETED) != null && tree.previousWhileNot(13, State.DELETED).getKey() == 11L);
        Assert.assertTrue(tree.previousWhileNot(12, State.DELETED) != null && tree.previousWhileNot(12, State.DELETED).getKey() == 11L);
        Assert.assertTrue(tree.previousWhileNot(11, State.DELETED) != null && tree.previousWhileNot(11, State.DELETED).getKey() == 10L);
        Assert.assertNull(tree.previousWhileNot(10, State.DELETED));
        Assert.assertNull(tree.previousWhileNot(9, State.DELETED));
        Assert.assertNull(tree.previousWhileNot(8, State.DELETED));
        Assert.assertTrue(tree.previousWhileNot(7, State.DELETED) != null && tree.previousWhileNot(7, State.DELETED).getKey() == 6L);
        Assert.assertTrue(tree.previousWhileNot(6, State.DELETED) != null && tree.previousWhileNot(6, State.DELETED).getKey() == 5L);
    }

    @Test
    public void firstTest() {
        long MIN = 0L;
        long MAX = 99L;
        for (long j = MIN + 1; j <= MAX; j++) {
            RBTree tree = new RBTree();
            for (long i = MIN; i <= j; i++) {
                if ((i % 3) == 0L) {
                    tree.insert(i, State.DELETED);
                } else {
                    tree.insert(i, State.EXISTS);
                }
            }
            Assert.assertTrue(tree.first().getKey() == MIN);
        }
    }

    @Test
    public void lastTest() {
        long MIN = 0L;
        long MAX = 99L;
        for (long j = MIN + 1; j <= MAX; j++) {
            RBTree tree = new RBTree();
            for (long i = MIN; i <= j; i++) {
                if ((i % 3) == 0L) {
                    tree.insert(i, State.DELETED);
                } else {
                    tree.insert(i, State.EXISTS);
                }
            }
            Assert.assertTrue(tree.last().getKey() == j);
        }
    }

    @Test
    public void firstWhileNot() {
        RBTree tree = new RBTree();
        for (long i = 0; i <= 6; i++) {
            tree.insert(i, State.EXISTS);
        }
        tree.insert(8L, State.DELETED);
        tree.insert(10L, State.EXISTS);
        tree.insert(11L, State.EXISTS);
        tree.insert(13L, State.EXISTS);
        //printTree(tree.root!!)
        Assert.assertTrue(tree.firstWhileNot(14, State.DELETED).getKey() == 10L);
        Assert.assertTrue(tree.firstWhileNot(13, State.DELETED).getKey() == 10L);
        Assert.assertTrue(tree.firstWhileNot(12, State.DELETED).getKey() == 10L);
        Assert.assertTrue(tree.firstWhileNot(11, State.DELETED).getKey() == 10L);
        Assert.assertTrue(tree.firstWhileNot(10, State.DELETED).getKey() == 10L);
        Assert.assertNull(tree.firstWhileNot(9, State.DELETED));
        Assert.assertNull(tree.firstWhileNot(8, State.DELETED));
        Assert.assertTrue(tree.firstWhileNot(7, State.DELETED).getKey() == 0L);
        Assert.assertTrue(tree.firstWhileNot(6, State.DELETED).getKey() == 0L);
    }

    @Test
    public void lastWhileNot() {
        RBTree tree = new RBTree();
        for (long i = 0; i <= 6; i++) {
            tree.insert(i, State.EXISTS);
        }
        tree.insert(8L, State.DELETED);
        tree.insert(10L, State.EXISTS);
        tree.insert(11L, State.EXISTS);
        tree.insert(13L, State.EXISTS);
        //printTree(tree.root!!);
        Assert.assertTrue(tree.lastWhileNot(0, State.DELETED).getKey() == 6L);
        Assert.assertTrue(tree.lastWhileNot(5, State.DELETED).getKey() == 6L);
        Assert.assertTrue(tree.lastWhileNot(6, State.DELETED).getKey() == 6L);
        Assert.assertTrue(tree.lastWhileNot(7, State.DELETED).getKey() == 6L);
        Assert.assertNull(tree.lastWhileNot(8, State.DELETED));
        Assert.assertNull(tree.lastWhileNot(9, State.DELETED));
        Assert.assertTrue(tree.lastWhileNot(10, State.DELETED).getKey() == 13L);
        Assert.assertTrue(tree.lastWhileNot(11, State.DELETED).getKey() == 13L);
        Assert.assertTrue(tree.lastWhileNot(12, State.DELETED).getKey() == 13L);
        Assert.assertTrue(tree.lastWhileNot(13, State.DELETED).getKey() == 13L);
        Assert.assertTrue(tree.lastWhileNot(14, State.DELETED).getKey() == 13L);
    }

    @Test
    public void previousOrEqualTest() {
        RBTree tree = new RBTree();
        for (long i = 0; i <= 6; i++) {
            tree.insert(i, State.EXISTS);
        }
        tree.insert(8L, State.DELETED);
        tree.insert(10L, State.EXISTS);
        tree.insert(11L, State.EXISTS);
        tree.insert(13L, State.EXISTS);
        //printTree(tree.root);
        Assert.assertNull(tree.previousOrEqual(-1));
        Assert.assertEquals(tree.previousOrEqual(0).getKey(), 0L);
        Assert.assertEquals(tree.previousOrEqual(1).getKey(), 1L);
        Assert.assertEquals(tree.previousOrEqual(7).getKey(), 6L);
        Assert.assertEquals(tree.previousOrEqual(8).getKey(), 8L);
        Assert.assertEquals(tree.previousOrEqual(9).getKey(), 8L);
        Assert.assertEquals(tree.previousOrEqual(10).getKey(), 10L);
        Assert.assertEquals(tree.previousOrEqual(13).getKey(), 13L);
        Assert.assertEquals(tree.previousOrEqual(14).getKey(), 13L);
    }

    @Test
    public void nextOrEqualTest() {
        RBTree tree = new RBTree();
        for (long i = 0; i <= 6; i++) {
            tree.insert(i, State.EXISTS);
        }
        tree.insert(8L, State.DELETED);
        tree.insert(10L, State.EXISTS);
        tree.insert(11L, State.EXISTS);
        tree.insert(13L, State.EXISTS);
        //printTree(tree.root!!)
        Assert.assertTrue(tree.nextOrEqual(-1).getKey() == 0L);
        Assert.assertTrue(tree.nextOrEqual(0).getKey() == 0L);
        Assert.assertTrue(tree.nextOrEqual(1).getKey() == 1L);
        Assert.assertTrue(tree.nextOrEqual(7).getKey() == 8L);
        Assert.assertTrue(tree.nextOrEqual(8).getKey() == 8L);
        Assert.assertTrue(tree.nextOrEqual(9).getKey() == 10L);
        Assert.assertTrue(tree.nextOrEqual(10).getKey() == 10L);
        Assert.assertTrue(tree.nextOrEqual(13).getKey() == 13L);
        Assert.assertNull(tree.nextOrEqual(14));
    }

}


