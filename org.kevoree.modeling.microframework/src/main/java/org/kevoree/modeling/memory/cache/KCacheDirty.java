package org.kevoree.modeling.memory.cache;

import org.kevoree.modeling.memory.KCacheElement;
import org.kevoree.modeling.memory.KContentKey;

public class KCacheDirty {

    public KContentKey key;

    public KCacheElement object;

    public KCacheDirty(KContentKey key, KCacheElement object) {
        this.key = key;
        this.object = object;
    }
}
