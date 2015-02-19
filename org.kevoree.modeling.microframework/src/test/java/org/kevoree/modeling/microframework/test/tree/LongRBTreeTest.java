package org.kevoree.modeling.microframework.test.tree;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.time.rbtree.LongRBTree;
import org.kevoree.modeling.api.time.rbtree.IndexRBTree;

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
        treeBis.unserialize(tree.serialize());
        Assert.assertEquals(tree.size(), treeBis.size());
    }

    @Test
    public void saveLoad() throws Exception {
        LongRBTree tree = new LongRBTree();
        for (long i = 0; i <= 6; i++) {
            tree.insert(i, i);
        }
        LongRBTree treeBis = new LongRBTree();
        treeBis.unserialize(tree.serialize());
        Assert.assertEquals(tree.size(), treeBis.size());
        for (int i = 0; i < tree.size(); i++) {
            Long resolved = tree.lookup(i);
            Long resolvedBis = treeBis.lookup(i);
            Assert.assertEquals(resolved, resolvedBis);
        }

    }

}
