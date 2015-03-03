package org.kevoree.modeling.microframework.test.util;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.util.LongHashMap;

import java.util.HashMap;

/**
 * Created by duke on 03/03/15.
 */
public class LongMapTest {

    private int SIZE = 1000000;

    /**
     * @native:ts {@code
     * //noJS
     * }
     */
    @Test
    public void test() {

        long first = System.currentTimeMillis();
        LongHashMap<String> map = new LongHashMap<String>();
        for (long i = 0; i < SIZE; i++) {
            map.put(i, "" + i);
        }
        Assert.assertEquals(map.size(), SIZE);
        long after = System.currentTimeMillis();
        System.err.println(after - first);
        for (long i = 0; i < SIZE; i++) {
            Assert.assertEquals(i, Long.parseLong(map.get(i)));
        }
        long after2 = System.currentTimeMillis();
        System.err.println(after2 - after);

        final int[] nbCall = {0};
        map.values(new Callback<String>() {
            @Override
            public void on(String s) {
                nbCall[0]++;
            }
        });
        long after3 = System.currentTimeMillis();
        System.err.println(after3 - after2);

        Assert.assertEquals(nbCall[0], SIZE);
        map.clear();
        Assert.assertEquals(map.size(), 0);
    }

    /**
     * @native:ts {@code
     * //noJS
     * }
     */
    @Test
    public void testMap() {

        long first = System.currentTimeMillis();
        HashMap<Long,String> map = new HashMap<Long,String>();
        for (long i = 0; i < SIZE; i++) {
            map.put(i, "" + i);
        }
        Assert.assertEquals(map.size(), SIZE);
        long after = System.currentTimeMillis();
        System.err.println(after - first);
        for (long i = 0; i < SIZE; i++) {
            Assert.assertEquals(i, Long.parseLong(map.get(i)));
        }
        long after2 = System.currentTimeMillis();
        System.err.println(after2 - after);

        int nbCall = 0;
        Long[] keys = map.keySet().toArray(new Long[map.size()]);
        for(int i=0;i<keys.length;i++){
            nbCall++;
        }
        Assert.assertEquals(nbCall, SIZE);
        long after3 = System.currentTimeMillis();
        System.err.println(after3 - after2);


        map.clear();
        Assert.assertEquals(map.size(), 0);
    }

}
