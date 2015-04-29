package org.kevoree.modeling.api.data.cache;

import org.kevoree.modeling.api.KObject;

public interface KCache {

    KCacheObject get(long universe, long time, long obj);

    void put(long universe, long time, long obj, KCacheObject payload);

    KCacheDirty[] dirties();

    void clear();

    void clean();

    void monitor(KObject origin);

}
