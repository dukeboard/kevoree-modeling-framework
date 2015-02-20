package org.kevoree.modeling.api.data.cache;

/**
 * Created by duke on 18/02/15.
 */
public interface KCache {

    public KCacheObject get(KContentKey key);

    public void put(KContentKey key, KCacheObject payload);

    public KCacheDirty[] dirties();

    public void clearDataSegment();

}
