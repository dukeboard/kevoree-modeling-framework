package org.kevoree.modeling.api.data.cache;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.data.CacheEntry;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by duke on 10/30/14.
 */
public class TimeCache {
    public Map<Long, CacheEntry> payload_cache = new HashMap<Long, CacheEntry>();
    public KObject root = null;
    public boolean rootDirty = false;
}
