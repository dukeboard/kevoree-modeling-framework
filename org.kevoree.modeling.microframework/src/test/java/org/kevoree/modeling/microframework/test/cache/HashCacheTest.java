package org.kevoree.modeling.microframework.test.cache;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.data.cache.HashMemoryCache;
import org.kevoree.modeling.api.data.cache.KCacheObject;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.meta.MetaModel;

/**
 * Created by duke on 20/02/15.
 */
public class HashCacheTest {

    @Test
    public void test() {
        HashMemoryCache cache = new HashMemoryCache();
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

            @Override
            public void unserialize(KContentKey key, String payload, MetaModel metaModel) throws Exception {
            }

            @Override
            public int counter() {
                return 0;
            }

            @Override
            public void inc() {
            }

            @Override
            public void dec() {
            }
        };
        cache.put(KConfig.NULL_LONG,KConfig.NULL_LONG,KConfig.NULL_LONG, temp);
        Assert.assertEquals(temp, cache.get(KConfig.NULL_LONG,KConfig.NULL_LONG,KConfig.NULL_LONG));
        cache.put(0,KConfig.NULL_LONG,KConfig.NULL_LONG, temp);
        Assert.assertEquals(temp, cache.get(KConfig.NULL_LONG,KConfig.NULL_LONG,KConfig.NULL_LONG));
        Assert.assertEquals(temp, cache.get(0,KConfig.NULL_LONG,KConfig.NULL_LONG));
        cache.put(KConfig.NULL_LONG,KConfig.NULL_LONG,2, temp);
        Assert.assertEquals(temp, cache.get(KConfig.NULL_LONG,KConfig.NULL_LONG,2));
    }


}
