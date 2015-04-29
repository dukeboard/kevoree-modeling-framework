package org.kevoree.modeling.microframework.test.cache;

/**
 * Created by duke on 20/02/15.
 */
public class MultiLayeredCacheTest {

    /*
    @Test
    public void test() {
        MultiLayeredMemoryCache cache = new MultiLayeredMemoryCache(null);
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
        cache.put(KContentKey.create("0///"), temp);
        Assert.assertEquals(temp, cache.get(KContentKey.create("0///")));
        cache.put(KContentKey.create("0/0//"), temp);
        Assert.assertEquals(temp, cache.get(KContentKey.create("0///")));
        Assert.assertEquals(temp, cache.get(KContentKey.create("0/0//")));
        cache.put(KContentKey.create("1///2"), temp);
        Assert.assertEquals(temp, cache.get(KContentKey.create("1///2")));
    }
*/

}
