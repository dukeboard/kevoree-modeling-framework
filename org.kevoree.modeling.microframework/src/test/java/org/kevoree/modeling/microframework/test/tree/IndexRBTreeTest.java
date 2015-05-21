package org.kevoree.modeling.microframework.test.tree;


import org.junit.Test;
import org.junit.Assert;
import org.kevoree.modeling.api.rbtree.FlatIndexRBTree;
import org.kevoree.modeling.api.rbtree.TreeNode;
import org.kevoree.modeling.api.rbtree.IndexRBTree;

import java.util.LinkedList;


/**
 * Created by gregory.nain on 01/08/2014.
 */

public class IndexRBTreeTest {

    @Test
    public void printTest() {
        long MIN = 0L;
        long MAX = 99L;
        for (long j = MIN; j <= MAX; j++) {
            IndexRBTree tree = new IndexRBTree();
            for (long i = MIN; i <= j; i++) {
                if ((i % 3) == 0L) {
                    tree.insert(i);
                } else {
                    tree.insert(i);
                }
            }
        }
    }


    @Test
    public void nextTest() {
        long MIN = 0L;
        long MAX = 99L;
        for (long j = MIN; j <= MAX; j++) {
            IndexRBTree tree = new IndexRBTree();
            for (long i = MIN; i <= j; i++) {
                if ((i % 3) == 0L) {
                    tree.insert(i);
                } else {
                    tree.insert(i);
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
            IndexRBTree tree = new IndexRBTree();
            for (long i = MIN; i <= j; i++) {
                if ((i % 7) == 0L) {
                    tree.insert(i);
                } else {
                    tree.insert(i);
                }
            }
            for (long i = j; i > MIN; i--) {
                Assert.assertTrue(tree.previous(i).getKey() == i - 1);
            }
            Assert.assertTrue(tree.previous(MIN) == null);
        }
    }

    @Test
    public void firstTest() {
        long MIN = 0L;
        long MAX = 99L;
        for (long j = MIN + 1; j <= MAX; j++) {
            IndexRBTree tree = new IndexRBTree();
            for (long i = MIN; i <= j; i++) {
                if ((i % 3) == 0L) {
                    tree.insert(i);
                } else {
                    tree.insert(i);
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
            IndexRBTree tree = new IndexRBTree();
            for (long i = MIN; i <= j; i++) {
                if ((i % 3) == 0L) {
                    tree.insert(i);
                } else {
                    tree.insert(i);
                }
            }
            Assert.assertTrue(tree.last().getKey() == j);
        }
    }

    @Test
    public void previousOrEqualTest() {
        IndexRBTree tree = new IndexRBTree();
        for (long i = 0; i <= 6; i++) {
            tree.insert(i);
        }
        tree.insert(8L);
        tree.insert(10L);
        tree.insert(11L);
        tree.insert(13L);
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
        IndexRBTree tree = new IndexRBTree();
        for (long i = 0; i <= 6; i++) {
            tree.insert(i);
        }
        tree.insert(8L);
        tree.insert(10L);
        tree.insert(11L);
        tree.insert(13L);
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

    @Test
    public void cacheEffectTest() {
        IndexRBTree tree = new IndexRBTree();
        for (long i = 0; i <= 6; i++) {
            tree.insert(i);
        }
        Assert.assertTrue(tree.previousOrEqual(-1) == null);
        Assert.assertTrue(tree.previousOrEqual(0).getKey() == 0l);
        Assert.assertTrue(tree.previousOrEqual(1).getKey() == 1l);
        Assert.assertTrue(tree.previousOrEqual(0).getKey() == 0l);

        tree.insert(7);
        Assert.assertTrue(tree.previousOrEqual(7).getKey() == 7l);
        Assert.assertTrue(tree.previousOrEqual(7).getKey() == 7l);
        Assert.assertTrue(tree.previousOrEqual(8).getKey() == 7l);
        Assert.assertTrue(tree.previousOrEqual(9).getKey() == 7l);
        //Assert.assertTrue(tree.previousOrEqual(7).getKey() == 7l);
        Assert.assertTrue(tree.previousOrEqual(10).getKey() == 7l);
        Assert.assertTrue(tree.previousOrEqual(7).getKey() == 7l);

    }


    @Test
    public void equivalenceTest() {
        //FlatIndexRBTree flatTree = new FlatIndexRBTree();
        long before = System.currentTimeMillis();
        IndexRBTree indexTree = new IndexRBTree();
        for (long i = 0; i < 30000000; i++) {
            indexTree.insert(i);
            //flatTree.insert(i);
        }

      //  Assert.assertEquals(indexTree.serialize(),flatTree.serialize());


         System.err.print(System.currentTimeMillis()-before);
        //Thread.sleep(50000);

       // System.err.println("o=" + indexTree.serialize());
      //  System.err.println("f=" + flatTree.serialize());

/*
        for (long i = 0; i < 10000; i++) {
            TreeNode resolved = indexTree.lookup(i);
            Long resolved2 = flatTree.lookup(i);
            Assert.assertEquals((long) resolved2, resolved.getKey());
        }*/


    }


}


