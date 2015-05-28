package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.data.cache.KCacheDirty;

public interface KCache {

    KCacheObject get(long universe, long time, long obj);

    void put(long universe, long time, long obj, KCacheObject payload);

    KCacheDirty[] dirties();

    void clear();

    void clean();

    void monitor(KObject origin);

    int size();

}
