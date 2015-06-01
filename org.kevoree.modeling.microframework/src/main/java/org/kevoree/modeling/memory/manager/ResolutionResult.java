package org.kevoree.modeling.memory.manager;

import org.kevoree.modeling.memory.KCacheElementSegment;
import org.kevoree.modeling.memory.struct.map.LongLongHashMap;
import org.kevoree.modeling.memory.struct.tree.KLongTree;

public class ResolutionResult {

    public LongLongHashMap universeTree;

    public KLongTree timeTree;

    public KCacheElementSegment segment;

    public long universe;

    public long time;

    public long uuid;

}
