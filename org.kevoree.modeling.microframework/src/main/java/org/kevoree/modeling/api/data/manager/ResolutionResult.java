package org.kevoree.modeling.api.data.manager;

import org.kevoree.modeling.api.rbtree.IndexRBTree;
import org.kevoree.modeling.api.rbtree.LongRBTree;

/**
 * Created by duke on 19/02/15.
 */
public class ResolutionResult {

    public Long resolvedUniverse = null;
    public LongRBTree universeTree = null;
    public Long resolvedQuanta = null;
    public IndexRBTree timeTree = null;

}
