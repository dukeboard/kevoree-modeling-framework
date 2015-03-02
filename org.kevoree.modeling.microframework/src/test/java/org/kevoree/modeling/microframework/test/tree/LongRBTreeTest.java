package org.kevoree.modeling.microframework.test.tree;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.rbtree.LongRBTree;
import org.kevoree.modeling.api.rbtree.IndexRBTree;

/**
 * Created by duke on 01/12/14.
 */
public class LongRBTreeTest {


    @Test
    public void saveLoad0() throws Exception {
        IndexRBTree tree = new IndexRBTree();
        for (long i = 0; i <= 6; i++) {
            tree.insert(i);
        }
        IndexRBTree treeBis = new IndexRBTree();
        treeBis.unserialize(null, tree.serialize(), null);
        Assert.assertEquals(tree.size(), treeBis.size());
    }

    @Test
    public void saveLoad() throws Exception {
        LongRBTree tree = new LongRBTree();
        for (long i = 0; i <= 6; i++) {
            tree.insert(i, i);
        }
        LongRBTree treeBis = new LongRBTree();
        treeBis.unserialize(null, tree.serialize(), null);
        Assert.assertEquals(tree.size(), treeBis.size());
        for (int i = 0; i < tree.size(); i++) {
            Long resolved = tree.lookup(i).value;
            Long resolvedBis = treeBis.lookup(i).value;
            Assert.assertEquals(resolved, resolvedBis);
        }
    }

    @Test
    public void cacheEffectTest() {
        LongRBTree tree = new LongRBTree();
        for (long i = 0; i <= 6; i++) {
            tree.insert(i, i);
        }
        Assert.assertTrue(tree.previousOrEqual(-1) == null);
        Assert.assertTrue(tree.previousOrEqual(0).key == 0l);
        Assert.assertTrue(tree.previousOrEqual(1).key == 1l);
        Assert.assertTrue(tree.previousOrEqual(0).key == 0l);

        tree.insert(7, 7);
        Assert.assertTrue(tree.previousOrEqual(7).key == 7l);
        Assert.assertTrue(tree.previousOrEqual(7).key == 7l);
        Assert.assertTrue(tree.previousOrEqual(8).key == 7l);
        Assert.assertTrue(tree.previousOrEqual(9).key == 7l);
        //Assert.assertTrue(tree.previousOrEqual(7).key == 7l);
        Assert.assertTrue(tree.previousOrEqual(10).key == 7l);
        Assert.assertTrue(tree.previousOrEqual(7).key == 7l);

    }

}
