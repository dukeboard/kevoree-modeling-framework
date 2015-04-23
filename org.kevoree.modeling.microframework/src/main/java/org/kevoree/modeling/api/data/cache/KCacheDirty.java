package org.kevoree.modeling.api.data.cache;

public class KCacheDirty {

    public KContentKey key;

    public KCacheObject object;

    public KCacheDirty(KContentKey key, KCacheObject object) {
        this.key = key;
        this.object = object;
    }
}
