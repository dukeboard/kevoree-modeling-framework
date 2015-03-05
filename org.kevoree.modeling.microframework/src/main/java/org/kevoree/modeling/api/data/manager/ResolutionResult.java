package org.kevoree.modeling.api.data.manager;

import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.map.LongLongHashMap;
import org.kevoree.modeling.api.rbtree.IndexRBTree;
import org.kevoree.modeling.api.rbtree.LongRBTree;

/**
 * Created by duke on 19/02/15.
 */
public class ResolutionResult {

    public long resolvedUniverse = KConfig.NULL_LONG;
    public LongLongHashMap universeTree = null;
    public long resolvedQuanta = KConfig.NULL_LONG;
    public IndexRBTree timeTree = null;

}
