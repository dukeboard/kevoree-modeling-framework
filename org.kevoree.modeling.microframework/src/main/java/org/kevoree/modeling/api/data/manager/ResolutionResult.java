package org.kevoree.modeling.api.data.manager;

import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.map.LongLongHashMap;
import org.kevoree.modeling.api.rbtree.KLongTree;

/**
 * Created by duke on 28/05/15.
 */
public class ResolutionResult {

    public LongLongHashMap universeTree;

    public KLongTree timeTree;

    public KCacheEntry entry;

    public long universe;

    public long time;

    public long uuid;

}
