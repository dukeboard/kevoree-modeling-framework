package org.kevoree.modeling.microframework.test.map;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.KConfig;
import org.kevoree.modeling.memory.struct.map.LongHashMap;
import org.kevoree.modeling.memory.struct.map.LongHashMapCallBack;
import org.kevoree.modeling.memory.struct.map.LongLongHashMap;
import org.kevoree.modeling.memory.struct.map.LongLongHashMapCallBack;

/**
 * Created by duke on 03/03/15.
 */
public class LongMapTest {

    private int SIZE = 100;

    @Test
    public void test() {

        LongHashMap<String> map = new LongHashMap<String>(KConfig.CACHE_INIT_SIZE,KConfig.CACHE_LOAD_FACTOR);
        for (long i = 0; i < SIZE; i++) {
            map.put(i, "" + i);
        }
        Assert.assertEquals(map.size(), SIZE);
        for (long i = 0; i < SIZE; i++) {
            Assert.assertEquals(i, Long.parseLong(map.get(i)));
        }
        final int[] nbCall = {0};
        map.each(new LongHashMapCallBack<String>() {
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

        LongLongHashMap map = new LongLongHashMap(KConfig.CACHE_INIT_SIZE,KConfig.CACHE_LOAD_FACTOR);
        for (long i = 0; i < SIZE; i++) {
            map.put(i, i);
        }
        Assert.assertEquals(map.size(), SIZE);
        for (long i = 0; i < SIZE; i++) {
            Assert.assertEquals(i, map.get(i));
        }
        final int[] nbCall = {0};
        map.each(new LongLongHashMapCallBack() {
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
