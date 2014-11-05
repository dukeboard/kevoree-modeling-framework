package org.kevoree.modeling.databases.redis;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.data.KDataBase;
import redis.clients.jedis.Jedis;

import java.util.List;

/**
 * Created by liryc on 8/4/14.
 */
public class RedisDataBase implements KDataBase {

    private Jedis jedis = null;

    public RedisDataBase(String ip, Integer port) {
        jedis = new Jedis(ip, port);
    }

    @Override
    public void get(String[] keys, ThrowableCallback<String[]> callback) {
        List<String> values = jedis.mget(keys);
        callback.on(values.toArray(new String[values.size()]), null);
    }

    @Override
    public void put(String[][] payloads, Callback<Throwable> error) {
        String[] elems = new String[payloads.length * 2];
        for (int i = 0; i < payloads.length; i++) {
            elems[(i * 2)] = payloads[i][0];
            elems[(i * 2) + 1] = payloads[i][1];
        }
        jedis.mset(elems);
        error.on(null);
    }

    @Override
    public void remove(String[] keys, Callback<Throwable> error) {

    }

    @Override
    public void commit(Callback<Throwable> error) {

    }

    @Override
    public void close(Callback<Throwable> error) {
        jedis.close();
    }

}
