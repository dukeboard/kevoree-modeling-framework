package org.kevoree.modeling.api.data.cache;

import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.api.time.rbtree.LongRBTree;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by duke on 10/30/14.
 */
public class UniverseCache {
    public Map<Long, TimeTree> timeTreeCache = new HashMap<Long, TimeTree>();
    public Map<Long, TimeCache> timesCaches = new HashMap<Long, TimeCache>();
    public LongRBTree roots = null;

}
