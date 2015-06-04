package org.kevoree.modeling.memory.manager.impl;

import org.kevoree.modeling.memory.struct.segment.KMemorySegment;
import org.kevoree.modeling.memory.struct.map.impl.ArrayLongLongHashMap;
import org.kevoree.modeling.memory.struct.tree.KLongTree;

public class ResolutionResult {

    public ArrayLongLongHashMap universeTree;

    public KLongTree timeTree;

    public KMemorySegment segment;

    public long universe;

    public long time;

    public long uuid;

}
