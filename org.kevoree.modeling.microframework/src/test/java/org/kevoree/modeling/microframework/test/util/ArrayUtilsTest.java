package org.kevoree.modeling.microframework.test.util;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.util.ArrayUtils;

/**
 * Created by duke on 02/03/15.
 */
public class ArrayUtilsTest {

    @Test
    public void containsTest() {
        long[] base = new long[3];
        base[0] = 0;
        base[1] = 10;
        base[2] = 50;

        Assert.assertEquals(ArrayUtils.contains(base, 0), 0);
        Assert.assertEquals(ArrayUtils.contains(base, 2), -1);
        Assert.assertEquals(ArrayUtils.contains(base, 10), 1);
        Assert.assertEquals(ArrayUtils.contains(base, 50), 2);
        Assert.assertEquals(ArrayUtils.contains(base, 100), -1);

    }

    @Test
    public void removeTest() {
        long[] base = new long[3];
        base[0] = 0;
        base[1] = 10;
        base[2] = 50;

        long[] result0 = ArrayUtils.remove(base, 0);
        Assert.assertEquals(result0.length, 2);
        Assert.assertEquals(result0[0], 10);
        Assert.assertEquals(result0[1], 50);

        long[] result1 = ArrayUtils.remove(base, 10);
        Assert.assertEquals(result1.length, 2);
        Assert.assertEquals(result1[0], 0);
        Assert.assertEquals(result1[1], 50);

        long[] result2 = ArrayUtils.remove(base, 50);
        Assert.assertEquals(result2.length, 2);
        Assert.assertEquals(result2[0], 0);
        Assert.assertEquals(result2[1], 10);

    }

    /*
    @Test
    public void cloneTest() {
        long[] base = new long[3];
        base[0] = 0;
        base[1] = 10;
        base[2] = 50;

        long[] result0 = ArrayUtils.clone(base);
        Assert.assertEquals(result0.length, 3);
        Assert.assertEquals(result0[0], 0);
        Assert.assertEquals(result0[1], 10);
        Assert.assertEquals(result0[2], 50);

    }*/

}
