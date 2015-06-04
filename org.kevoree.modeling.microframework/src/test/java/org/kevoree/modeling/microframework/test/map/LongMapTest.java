package org.kevoree.modeling.microframework.test.map;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.KConfig;
import org.kevoree.modeling.memory.struct.map.impl.ArrayLongHashMap;
import org.kevoree.modeling.memory.struct.map.KLongHashMapCallBack;
import org.kevoree.modeling.memory.struct.map.impl.ArrayLongLongHashMap;
import org.kevoree.modeling.memory.struct.map.KLongLongHashMapCallBack;

/**
 * Created by duke on 03/03/15.
 */
public class LongMapTest {

    private int SIZE = 100;

    @Test
    public void test() {

        ArrayLongHashMap<String> map = new ArrayLongHashMap<String>(KConfig.CACHE_INIT_SIZE,KConfig.CACHE_LOAD_FACTOR);
        for (long i = 0; i < SIZE; i++) {
            map.put(i, "" + i);
        }
        Assert.assertEquals(map.size(), SIZE);
        for (long i = 0; i < SIZE; i++) {
            Assert.assertEquals(i, Long.parseLong(map.get(i)));
        }
        final int[] nbCall = {0};
        map.each(new KLongHashMapCallBack<String>() {
            @Override
            public void on(long key, String s) {
                nbCall[0]++;
                Assert.assertEquals(key, Long.parseLong(s));
            }
        });
        Assert.assertEquals(nbCall[0], SIZE);
        map.clear();
        Assert.assertEquals(map.size(), 0);
    }

    @Test
    public void testLongLong() {

        ArrayLongLongHashMap map = new ArrayLongLongHashMap(KConfig.CACHE_INIT_SIZE,KConfig.CACHE_LOAD_FACTOR);
        for (long i = 0; i < SIZE; i++) {
            map.put(i, i);
        }
        Assert.assertEquals(map.size(), SIZE);
        for (long i = 0; i < SIZE; i++) {
            Assert.assertEquals(i, map.get(i));
        }
        final int[] nbCall = {0};
        map.each(new KLongLongHashMapCallBack() {
            @Override
            public void on(long key, long s) {
                nbCall[0]++;
                Assert.assertEquals(key, s);
            }
        });
        Assert.assertEquals(nbCall[0], SIZE);
        map.clear();
        Assert.assertEquals(map.size(), 0);
    }

}
