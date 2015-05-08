package org.kevoree.modeling.databases.redis;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.cdn.KContentPutRequest;
import org.kevoree.modeling.api.msg.KEvents;
import redis.embedded.RedisServer;

import java.io.IOException;

/**
 * Created by duke on 11/5/14.
 */
public class RedisTest {

    @Test
    public void test() throws IOException, InterruptedException {

       // RedisServer redisServer = new RedisServer(6379);
       // redisServer.start();

        RedisContentDeliveryDriver driver = new RedisContentDeliveryDriver("0.0.0.0", 6379);
        driver.connect(new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                KContentPutRequest request = new KContentPutRequest(3);

                KContentKey k0 = KContentKey.createObject(0l, 1l, 2l);
                KContentKey k1 = KContentKey.createObject(3l, 4l, 5l);

                request.put(k0, "K0");
                request.put(k1, "K1");
                driver.put(request, new Callback<Throwable>() {
                    @Override
                    public void on(Throwable throwable) {
                        if (throwable != null) {
                            throwable.printStackTrace();
                        }
                    }
                });

                KContentKey[] keys = new KContentKey[2];
                keys[0] = k0;
                keys[1] = k1;

                driver.get(keys, new ThrowableCallback<String[]>() {
                    @Override
                    public void on(String[] strings, Throwable error) {
                        Assert.assertEquals(strings.length, 2);
                        Assert.assertEquals(strings[0], "K0");
                        Assert.assertEquals(strings[1], "K1");
                    }
                });
            }
        });

        // redisServer.stop();

    }

}
