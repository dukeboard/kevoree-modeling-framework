package org.kevoree.modeling.api.data.cache;

/**
 * Created by duke on 20/02/15.
 */
public class KCacheDirty {

    public KContentKey key;

    public KCacheObject object;

    public KCacheDirty(KContentKey key, KCacheObject object) {
        this.key = key;
        this.object = object;
    }
}
