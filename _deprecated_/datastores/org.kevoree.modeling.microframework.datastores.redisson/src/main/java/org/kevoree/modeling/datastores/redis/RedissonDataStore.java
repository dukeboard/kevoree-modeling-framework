package org.kevoree.modeling.datastores.redis;

import jet.runtime.typeinfo.JetValueParameter;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.kevoree.modeling.api.events.ModelElementListener;
import org.kevoree.modeling.api.events.ModelEvent;
import org.kevoree.modeling.api.persistence.DataStore;
import org.redisson.Redisson;
import org.redisson.core.RMap;

import java.util.Set;

/**
 * Created by liryc on 9/5/14.
 */
public class RedissonDataStore implements DataStore {

    private Redisson redisson = null;
    private RMap<String, String> map = null;

    public RedissonDataStore() {
        System.err.println("===================================================================");
        System.err.println("==                   RedisDB via Redisson                        ==");
        System.err.println("===================================================================");

        redisson = Redisson.create();
    }

    @Override
    public void put(@JetValueParameter(name = "segment") @NotNull String s, @JetValueParameter(name = "key") @NotNull String s2, @JetValueParameter(name = "value") @NotNull String s3) {
        map = redisson.getMap( s );
        //map.put(s2, s3);
        map.putIfAbsent(s2, s3);
    }

    @Nullable
    @Override
    public String get(@JetValueParameter(name = "segment") @NotNull String s, @JetValueParameter(name = "key") @NotNull String s2) {
        map = redisson.getMap( s );
        return map.get( s2 );
    }

    @Override
    public void remove(@JetValueParameter(name = "segment") @NotNull String s, @JetValueParameter(name = "key") @NotNull String s2) {
        map = redisson.getMap( s );
        map.remove( s2 );
    }

    @Override
    public void commit() {}

    @Override
    public void close() {
        redisson.shutdown();
    }

    @NotNull
    @Override
    public Set<String> getSegments() {
        return map.keySet();
    }

    @NotNull
    @Override
    public Set<String> getSegmentKeys(@JetValueParameter(name = "segment") @NotNull String s) {
        map = redisson.getMap( s );
        return map.getAll( getSegments() ).keySet();
    }

    @Override
    public void notify(@JetValueParameter(name = "event") @NotNull ModelEvent modelEvent) {}

    @Override
    public void register(@JetValueParameter(name = "listener") @NotNull ModelElementListener modelElementListener, @JetValueParameter(name = "from", type = "?") @Nullable Long aLong, @JetValueParameter(name = "to", type = "?") @Nullable Long aLong2, @JetValueParameter(name = "path") @NotNull String s) {}

    @Override
    public void unregister(@JetValueParameter(name = "listener") @NotNull ModelElementListener modelElementListener) {}
}
