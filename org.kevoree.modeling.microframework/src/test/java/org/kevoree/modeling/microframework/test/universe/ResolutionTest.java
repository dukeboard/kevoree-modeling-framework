package org.kevoree.modeling.microframework.test.universe;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.data.manager.ResolutionHelper;
import org.kevoree.modeling.api.rbtree.LongRBTree;

/**
 * Created by duke on 03/03/15.
 */
public class ResolutionTest {

    @Test
    public void test() {

        //create a universeTree
        LongRBTree globalUniverse = new LongRBTree();
        //root
        globalUniverse.insert(0, 0);
        //branch 0 -> 1 -> 3
        globalUniverse.insert(1, 0);
        globalUniverse.insert(3, 1);
        //branch 0 -> 2 -> 4
        globalUniverse.insert(2, 0);
        globalUniverse.insert(4, 2);

        LongRBTree objectUniverse = new LongRBTree();
        objectUniverse.insert(0, 0);
        objectUniverse.insert(3, 10);
        objectUniverse.insert(2, 8);

        //test branch 0 -> 1 -> 3
        Assert.assertEquals(0, ResolutionHelper.resolve_universe(globalUniverse, objectUniverse, 0, 0));
        Assert.assertEquals(3, ResolutionHelper.resolve_universe(globalUniverse, objectUniverse, 10, 3));
        Assert.assertEquals(3, ResolutionHelper.resolve_universe(globalUniverse, objectUniverse, 50, 3));
        //1 has no modification
        Assert.assertEquals(0, ResolutionHelper.resolve_universe(globalUniverse, objectUniverse, 10, 1));

        //test branch 0 -> 2 -> 4
        Assert.assertEquals(2, ResolutionHelper.resolve_universe(globalUniverse, objectUniverse, 10, 2));
        Assert.assertEquals(0, ResolutionHelper.resolve_universe(globalUniverse, objectUniverse, 1, 2));
        Assert.assertEquals(2, ResolutionHelper.resolve_universe(globalUniverse, objectUniverse, 50, 4));
        Assert.assertEquals(0, ResolutionHelper.resolve_universe(globalUniverse, objectUniverse, 5, 4));


        //Now simulate a hidden evolution

    }

}
