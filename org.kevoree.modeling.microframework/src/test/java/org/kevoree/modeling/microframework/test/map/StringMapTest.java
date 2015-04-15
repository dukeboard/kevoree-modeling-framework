package org.kevoree.modeling.microframework.test.map;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.map.StringHashMap;
import org.kevoree.modeling.api.map.StringHashMapCallBack;

import java.util.HashMap;

/**
 * Created by duke on 09/04/15.
 */
public class StringMapTest {

    @Test
    public void test() {
        RandomString randomString = new RandomString(10);
        HashMap<String, String> origin = new HashMap<String, String>();
        StringHashMap<String> optimized = new StringHashMap<String>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
        int nbLoop = 100;
        for (int i = 0; i < nbLoop; i++) {
            String newVal = randomString.nextString();
            origin.put(newVal, newVal);
            optimized.put(newVal, newVal);
        }
        Assert.assertEquals(nbLoop, origin.keySet().size());
        Assert.assertEquals(nbLoop, optimized.size());
        final int[] loopElem = {0};
        optimized.each(new StringHashMapCallBack<String>() {
            @Override
            public void on(String key, String value) {
                Assert.assertEquals(key, value);
                String originVal = origin.get(key);
                Assert.assertEquals(key, originVal);
                loopElem[0]++;
            }
        });
        Assert.assertEquals(nbLoop, loopElem[0]);
    }

    @Test
    public void emptyTest() {
        StringHashMap<String> optimized = new StringHashMap<String>(0, KConfig.CACHE_LOAD_FACTOR);
        Assert.assertEquals(optimized.size(),0);
        Assert.assertTrue(!optimized.containsKey("randomKey"));
        Assert.assertNull(optimized.get("randomKey"));
        Assert.assertNull(optimized.put("randomKey", "randomVal"));
        Assert.assertTrue(optimized.containsKey("randomKey"));
        Assert.assertNotNull(optimized.get("randomKey"));
    }

}
