package org.kevoree.modeling.api.data.cache;

import org.kevoree.modeling.api.time.rbtree.LongRBTree;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by duke on 18/02/15.
 */
public class ModelCache {

    /* Cache from object ID to their UniverseTree */
    public Map<Long, LongRBTree> universeTreeCache = new HashMap<Long, LongRBTree>();

    /* SubUniverse Cache, indexed by their ID */
    public Map<Long, UniverseCache> universeCache = new HashMap<Long, UniverseCache>();

    /* Global ordering of universe */
    public LongRBTree universeTree = new LongRBTree();

}
