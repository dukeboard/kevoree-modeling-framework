package org.kevoree.modeling.microframework.test.struct;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.memory.struct.tree.KLongTree;
import org.kevoree.modeling.memory.struct.tree.KTreeWalker;
import org.kevoree.modeling.memory.struct.tree.ooheap.OOKLongTree;

public class KLongTreeAbstractTest {

    protected KLongTree tree;

    protected int TEST_SIZE = 100;

    protected void initTree() {
        tree = new OOKLongTree();
    }

    @Test
    public void rangeTest() {
        initTree();
        for (int i = 0; i < TEST_SIZE; i++) {
            tree.insert(i);
        }

        final MutableInteger integer = new MutableInteger();

        //in the full range
        integer.set(0);
        tree.range(0, TEST_SIZE, new KTreeWalker() {
            @Override
            public void elem(long t) {
                integer.increment();
            }
        });
        Assert.assertEquals(TEST_SIZE, integer.get());

        //in the beginning
        integer.set(0);
        tree.range(0, 20, new KTreeWalker() {
            @Override
            public void elem(long t) {
                integer.increment();
            }
        });
        Assert.assertEquals(21, integer.get());

        //in the middle, single
        integer.set(0);
        tree.range(20, 20, new KTreeWalker() {
            @Override
            public void elem(long t) {
                integer.increment();
            }
        });
        Assert.assertEquals(1, integer.get());

        //in the middle
        integer.set(0);
        tree.range(20, 79, new KTreeWalker() {
            @Override
            public void elem(long t) {
                integer.increment();
            }
        });
        Assert.assertEquals(60, integer.get());

        //slightly above the limit
        integer.set(0);
        tree.range(TEST_SIZE - 20, TEST_SIZE, new KTreeWalker() {
            @Override
            public void elem(long t) {
                integer.increment();
            }
        });
        Assert.assertEquals(20, integer.get());

        //above the limit
        integer.set(0);
        tree.range(TEST_SIZE - 20, TEST_SIZE + 50, new KTreeWalker() {
            @Override
            public void elem(long t) {
                integer.increment();
            }
        });
        Assert.assertEquals(20, integer.get());

        //before the limit left
        integer.set(0);
        tree.range(-50, 99, new KTreeWalker() {
            @Override
            public void elem(long t) {
                integer.increment();
            }
        });
        Assert.assertEquals(TEST_SIZE, integer.get());

        //before the limit left and right
        integer.set(0);
        tree.range(-50, 150, new KTreeWalker() {
            @Override
            public void elem(long t) {
                integer.increment();
            }
        });
        Assert.assertEquals(TEST_SIZE, integer.get());
    }


}
