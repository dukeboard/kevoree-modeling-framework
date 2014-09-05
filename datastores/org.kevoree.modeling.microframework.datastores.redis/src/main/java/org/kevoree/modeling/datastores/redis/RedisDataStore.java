package org.kevoree.modeling.datastores.redis;

import jet.runtime.typeinfo.JetValueParameter;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.kevoree.modeling.api.events.ModelElementListener;
import org.kevoree.modeling.api.events.ModelEvent;
import org.kevoree.modeling.api.persistence.DataStore;
import org.redisson.Redisson;
import org.redisson.core.RMap;
import redis.clients.jedis.Jedis;

import java.util.Set;

/**
 * Created by liryc on 8/4/14.
 */
public class RedisDataStore implements DataStore {

    private static final boolean REDISSON_CLIENT = true;
    // TRUE
    private Redisson redisson = null;
    private RMap<String, String> map = null;
    // FALSE
    private Jedis jedis = null;

    public RedisDataStore() {
        System.err.println("===================================================================");
        System.err.println("==                           RedisDB                             ==");
        System.err.println("===================================================================");

        if( REDISSON_CLIENT ) {
            redisson = Redisson.create();
            map = redisson.getMap("redisMap");
        } else {
            jedis = new Jedis("localhost", 6379);
        }
    }

    @Override
    public void put(@JetValueParameter(name = "segment") @NotNull String s, @JetValueParameter(name = "key") @NotNull String s2, @JetValueParameter(name = "value") @NotNull String s3) {
        if( REDISSON_CLIENT ) {
            map.put(s+s2, s3); // return String
        } else {
            jedis.set(s+s2, s3); // return String
        }
    }

    @Nullable
    @Override
    public String get(@JetValueParameter(name = "segment") @NotNull String s, @JetValueParameter(name = "key") @NotNull String s2) {
        if( REDISSON_CLIENT ) {
            return map.get(s+s2);
        } else {
            return jedis.get(s+s2);
        }
    }

    @Override
    public void remove(@JetValueParameter(name = "segment") @NotNull String s, @JetValueParameter(name = "key") @NotNull String s2) {
        if( REDISSON_CLIENT ) {
            map.remove(s+s2); // return String
            //map.remove(s+s2, "value"); // return boolean
        } else {
            jedis.del(s+s2); // return Long
        }
    }

    @Override
    public void commit() {

    }

    @Override
    public void close() {

    }
/*
    @Override
    public void sync() {
        if( REDISSON_CLIENT ) {
            //redisson or map .sync()
        } else {
            jedis.sync();
        }
    }
*/
    @NotNull
    @Override
    public Set<String> getSegments() {
        if( REDISSON_CLIENT ) {
            return null;
        } else {
            return null;
        }
    }

    @NotNull
    @Override
    public Set<String> getSegmentKeys(@JetValueParameter(name = "segment") @NotNull String s) {
        if( REDISSON_CLIENT ) {
            return map.keySet();
        } else {
            return jedis.hkeys("MapName");
        }
    }

    @Override
    public void notify(@JetValueParameter(name = "event") @NotNull ModelEvent modelEvent) {

    }

    @Override
    public void register(@JetValueParameter(name = "listener") @NotNull ModelElementListener modelElementListener, @JetValueParameter(name = "from", type = "?") @Nullable Long aLong, @JetValueParameter(name = "to", type = "?") @Nullable Long aLong2, @JetValueParameter(name = "path") @NotNull String s) {

    }

    @Override
    public void unregister(@JetValueParameter(name = "listener") @NotNull ModelElementListener modelElementListener) {

    }

}

