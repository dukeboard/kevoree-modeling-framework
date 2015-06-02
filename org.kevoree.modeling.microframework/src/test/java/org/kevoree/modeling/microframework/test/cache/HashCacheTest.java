package org.kevoree.modeling.microframework.test.cache;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.KConfig;
import org.kevoree.modeling.memory.cache.HashMemoryCache;
import org.kevoree.modeling.memory.KCacheElement;
import org.kevoree.modeling.memory.KContentKey;
import org.kevoree.modeling.meta.MetaModel;

/**
 * Created by duke on 20/02/15.
 */
public class HashCacheTest {

    @Test
    public void test() {
        HashMemoryCache cache = new HashMemoryCache();
        KCacheElement temp = new KCacheElement() {
            @Override
            public boolean isDirty() {
                return false;
            }

            @Override
            public String serialize(MetaModel metaModel) {
                return null;
            }

            @Override
            public void setClean(MetaModel mm) {
            }

            @Override
            public void setDirty() {

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
