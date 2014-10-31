package org.kevoree.modeling.datastores.redis;

import jet.runtime.typeinfo.JetValueParameter;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.kevoree.modeling.api.events.ModelElementListener;
import org.kevoree.modeling.api.events.ModelEvent;
import org.kevoree.modeling.api.persistence.DataStore;
import redis.clients.jedis.Jedis;

import java.util.Set;

/**
 * Created by liryc on 8/4/14.
 */
public class JedisDataStore implements DataStore {

    private Jedis jedis = null;

    public JedisDataStore() {
        System.err.println("===================================================================");
        System.err.println("==                      RedisDB via Jedis                        ==");
        System.err.println("===================================================================");

        jedis = new Jedis("localhost",6379);//pool.getResource();
    }

    @Override
    public void put(@JetValueParameter(name = "segment") @NotNull String s, @JetValueParameter(name = "key") @NotNull String s2, @JetValueParameter(name = "value") @NotNull String s3) {
        jedis.hset(s, s2, s3);
        //jedis.set(s + s2, s3);
    }

    @Nullable
    @Override
    public String get(@JetValueParameter(name = "segment") @NotNull String s, @JetValueParameter(name = "key") @NotNull String s2) {
            return jedis.hget(s, s2);
            //return jedis.get(s + s2);
    }

    @Override
    public void remove(@JetValueParameter(name = "segment") @NotNull String s, @JetValueParameter(name = "key") @NotNull String s2) {
            jedis.hdel(s, s2);
            //jedis.del(s+s2); // return Long
    }

    @Override
    public void commit() {
        jedis.sync();
    }

    @Override
    public void close() {
        jedis.close();
        jedis.shutdown();
    }

    @NotNull
    @Override
    public Set<String> getSegments() {
        return jedis.keys("/");
    }

    @NotNull
    @Override
    public Set<String> getSegmentKeys(@JetValueParameter(name = "segment") @NotNull String s) {
        return jedis.hkeys( s );
    }

    @Override
    public void notify(@JetValueParameter(name = "event") @NotNull ModelEvent modelEvent) {}

    @Override
    public void register(@JetValueParameter(name = "listener") @NotNull ModelElementListener modelElementListener, @JetValueParameter(name = "from", type = "?") @Nullable Long aLong, @JetValueParameter(name = "to", type = "?") @Nullable Long aLong2, @JetValueParameter(name = "path") @NotNull String s) {}

    @Override
    public void unregister(@JetValueParameter(name = "listener") @NotNull ModelElementListener modelElementListener) {}

}
