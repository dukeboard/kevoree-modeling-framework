package org.kevoree.modeling.microframework.test.tree;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.KConfig;
import org.kevoree.modeling.memory.struct.tree.impl.LongLongTree;
import org.kevoree.modeling.memory.struct.tree.impl.LongTree;

/**
 * Created by duke on 01/12/14.
 */
public class LongLongTreeTest {
    
    @Test
    public void saveLoad0() throws Exception {
        LongTree tree = new LongTree();
        for (long i = 0; i <= 6; i++) {
            tree.insert(i);
        }
        LongTree treeBis = new LongTree();
        treeBis.unserialize(tree.serialize(null), null);
        Assert.assertEquals(tree.size(), treeBis.size());
    }

    @Test
    public void saveLoad() throws Exception {
        LongLongTree tree = new LongLongTree();
        for (long i = 0; i <= 6; i++) {
            tree.insert(i, i);
        }
        LongLongTree treeBis = new LongLongTree();
        treeBis.unserialize(tree.serialize(null), null);
        Assert.assertEquals(tree.size(), treeBis.size());
        for (int i = 0; i < tree.size(); i++) {
            Long resolved = tree.lookupValue(i);
            Long resolvedBis = treeBis.lookupValue(i);
            Assert.assertEquals(resolved, resolvedBis);
        }
    }

    @Test
    public void cacheEffectTest() {
        LongLongTree tree = new LongLongTree();
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
