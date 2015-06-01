package org.kevoree.modeling.memory;

import org.kevoree.modeling.KObject;
import org.kevoree.modeling.memory.cache.KCacheDirty;

public interface KCache {

    KCacheElement get(long universe, long time, long obj);

    void put(long universe, long time, long obj, KCacheElement payload);

    KCacheDirty[] dirties();

    void clear();

    void clean();

    void monitor(KObject origin);

    int size();

}
