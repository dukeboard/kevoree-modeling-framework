package org.kevoree.modeling.microframework.test.tree;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.rbtree.ooheap.OOKLongLongTree;
import org.kevoree.modeling.api.rbtree.ooheap.OOKLongTree;

/**
 * Created by duke on 01/12/14.
 */
public class OOKLongLongTreeTest {
    
    @Test
    public void saveLoad0() throws Exception {
        OOKLongTree tree = new OOKLongTree();
        for (long i = 0; i <= 6; i++) {
            tree.insert(i);
        }
        OOKLongTree treeBis = new OOKLongTree();
        treeBis.unserialize(null, tree.serialize(), null);
        Assert.assertEquals(tree.size(), treeBis.size());
    }

    @Test
    public void saveLoad() throws Exception {
        OOKLongLongTree tree = new OOKLongLongTree();
        for (long i = 0; i <= 6; i++) {
            tree.insert(i, i);
        }
        OOKLongLongTree treeBis = new OOKLongLongTree();
        treeBis.unserialize(null, tree.serialize(), null);
        Assert.assertEquals(tree.size(), treeBis.size());
        for (int i = 0; i < tree.size(); i++) {
            Long resolved = tree.lookupValue(i);
            Long resolvedBis = treeBis.lookupValue(i);
            Assert.assertEquals(resolved, resolvedBis);
        }
    }

    @Test
    public void cacheEffectTest() {
        OOKLongLongTree tree = new OOKLongLongTree();
        for (long i = 0; i <= 6; i++) {
            tree.insert(i, i);
        }
        Assert.assertTrue(tree.previousOrEqualValue(-1) == KConfig.NULL_LONG);
        Assert.assertTrue(tree.previousOrEqualValue(0) == 0l);
        Assert.assertTrue(tree.previousOrEqualValue(1) == 1l);
        Assert.assertTrue(tree.previousOrEqualValue(0) == 0l);

        tree.insert(7, 7);
        Assert.assertTrue(tree.previousOrEqualValue(7) == 7l);
        Assert.assertTrue(tree.previousOrEqualValue(7) == 7l);
        Assert.assertTrue(tree.previousOrEqualValue(8) == 7l);
        Assert.assertTrue(tree.previousOrEqualValue(9) == 7l);
        //Assert.assertTrue(tree.previousOrEqual(7).key == 7l);
        Assert.assertTrue(tree.previousOrEqualValue(10) == 7l);
        Assert.assertTrue(tree.previousOrEqualValue(7) == 7l);

    }

}
