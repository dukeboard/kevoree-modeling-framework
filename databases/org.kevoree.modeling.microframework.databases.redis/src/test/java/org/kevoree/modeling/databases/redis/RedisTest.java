package org.kevoree.modeling.databases.redis;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.ThrowableCallback;
import redis.embedded.RedisServer;

import java.io.IOException;

/**
 * Created by duke on 11/5/14.
 */
public class RedisTest {

    @Test
    public void test() throws IOException, InterruptedException {

        RedisServer redisServer = new RedisServer(6379);
        redisServer.start();

        RedisDataBase db = new RedisDataBase("localhost", 6379);
        String[][] insertPayload = new String[2][2];
        insertPayload[0][0] = "/0";
        insertPayload[0][1] = "/0/payload";
        insertPayload[1][0] = "/1";
        insertPayload[1][1] = "/1/payload";
        db.put(insertPayload, new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {

            }
        });
        String[] keys = {"/0", "/1"};

        final boolean[] executed = {false};

        db.get(keys, new ThrowableCallback<String[]>() {
            @Override
            public void on(String[] strings, Throwable error) {
                executed[0] = true;
                Assert.assertEquals(strings.length, 2);
                Assert.assertEquals(strings[0], "/0/payload");
                Assert.assertEquals(strings[1], "/1/payload");
            }
        });

        Assert.assertTrue(executed[0]);

        redisServer.stop();

    }

}
