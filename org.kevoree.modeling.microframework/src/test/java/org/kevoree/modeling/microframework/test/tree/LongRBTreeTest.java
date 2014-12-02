package org.kevoree.modeling.microframework.test.tree;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.time.rbtree.LongRBTree;
import org.kevoree.modeling.api.time.rbtree.RBTree;
import org.kevoree.modeling.api.time.rbtree.State;

/**
 * Created by duke on 01/12/14.
 */
public class LongRBTreeTest {


    @Test
    public void saveLoad0() throws Exception {
        RBTree tree = new RBTree();
        for (long i = 0; i <= 6; i++) {
            tree.insert(i, State.EXISTS);
        }
        RBTree treeBis = new RBTree();
        treeBis.unserialize(tree.serialize());
        Assert.assertEquals(tree.size(), treeBis.size());
        for (int i = 0; i < tree.size(); i++) {
            State resolved = tree.lookup(i);
            State resolvedBis = treeBis.lookup(i);
            Assert.assertEquals(resolved, resolvedBis);
        }
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
