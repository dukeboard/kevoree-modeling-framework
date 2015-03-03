package org.kevoree.modeling.microframework.test.util;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.util.LongHashMap;

/**
 * Created by duke on 03/03/15.
 */
public class LongMapTest {

    /**
     * @native:ts {@code
     *
     * }
     */
    @Test
    public void test() {
        LongHashMap<String> map = new LongHashMap<String>();
        for (long i = 0; i < 1000000; i++) {
            map.put(i, "" + i);
        }
        Assert.assertEquals(map.size(), 1000000);
        for (long i = 0; i < 1000000; i++) {
            Assert.assertEquals(i, Long.parseLong(map.get(i)));
        }
        final int[] nbCall = {0};
        map.values(new Callback<String>() {
            @Override
            public void on(String s) {
                nbCall[0]++;
            }
        });
        Assert.assertEquals(nbCall[0], 1000000);
        map.clear();
        Assert.assertEquals(map.size(), 0);
    }

}
