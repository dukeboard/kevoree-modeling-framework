package org.kevoree.modeling.api.data.cache;

import org.kevoree.modeling.api.KObject;

public interface KCache {

    KCacheObject get(KContentKey key);

    void put(KContentKey key, KCacheObject payload);

    KCacheDirty[] dirties();

    void clearDataSegment();

    void clean();

    void monitor(KObject origin);

}
