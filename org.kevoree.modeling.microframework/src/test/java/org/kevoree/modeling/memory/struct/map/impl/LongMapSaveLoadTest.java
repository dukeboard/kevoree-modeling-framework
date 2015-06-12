package org.kevoree.modeling.memory.struct.map.impl;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.KConfig;

/**
 * Created by duke on 04/03/15.
 */
public class LongMapSaveLoadTest {

    @Test
    public void test() throws Exception {
        ArrayLongLongMap map = new ArrayLongLongMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
        for (long i = 0; i < 10; i++) {
            map.put(i, i);
        }
        Assert.assertEquals(map.size(), 10);
        String saved = map.serialize(null);
        ArrayLongLongMap map2 = new ArrayLongLongMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
        map2.unserialize(saved, null);
        Assert.assertEquals(map2.size(), 10);
        for (long i = 0; i < 10; i++) {
            Assert.assertEquals(map.get(i), i);
            Assert.assertEquals(map2.get(i), i);
        }
    }

}
