package org.kevoree.modeling.microframework.test.cache;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.data.cache.KCacheObject;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.cache.MultiLayeredMemoryCache;

/**
 * Created by duke on 20/02/15.
 */
public class MultiLayeredCacheTest {

    @Test
    public void test() {
        MultiLayeredMemoryCache cache = new MultiLayeredMemoryCache();
        KCacheObject temp = new KCacheObject() {
            @Override
            public boolean isDirty() {
                return false;
            }

            @Override
            public String serialize() {
                return null;
            }

            @Override
            public void setClean() {

            }
        };
        cache.put(KContentKey.create("0///"), temp);
        Assert.assertEquals(temp, cache.get(KContentKey.create("0///")));
        cache.put(KContentKey.create("0/0//"), temp);
        Assert.assertEquals(temp, cache.get(KContentKey.create("0///")));
        Assert.assertEquals(temp, cache.get(KContentKey.create("0/0//")));
        cache.put(KContentKey.create("1///2"), temp);
        Assert.assertEquals(temp, cache.get(KContentKey.create("1///2")));
    }


}
