package org.kevoree.modeling.api.data.cache;

/**
 * Created by duke on 18/02/15.
 */
public class DefaultMemoryCache implements KCache {

    @Override
    public KCacheObject get(KContentKey key) {
        return null;
    }

    @Override
    public void put(KContentKey key, KCacheObject payload) {

    }

    @Override
    public KContentKey[] dirties() {
        return new KContentKey[0];
    }

    @Override
    public void clearDataSegment() {

    }

}
