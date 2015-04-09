package org.kevoree.modeling.api.data.cache;

import org.kevoree.modeling.api.KObject;

/**
 * Created by duke on 18/02/15.
 */
public interface KCache {

    public KCacheObject get(KContentKey key);

    public void put(KContentKey key, KCacheObject payload);

    public KCacheDirty[] dirties();

    public void clearDataSegment();

    public void clean();

    public void monitor(KObject origin);

}
