package org.kevoree.modeling.memory.manager;

import org.kevoree.modeling.memory.struct.map.KLongLongMap;
import org.kevoree.modeling.memory.struct.segment.KMemorySegment;
import org.kevoree.modeling.memory.struct.tree.KLongTree;

public interface KMemorySegmentResolutionTrace {

    long getUniverse();

    void setUniverse(long universe);

    long getTime();

    void setTime(long time);

    KLongLongMap getUniverseTree();

    void setUniverseTree(KLongLongMap tree);

    KLongTree getTimeTree();

    void setTimeTree(KLongTree tree);

    KMemorySegment getSegment();

    void setSegment(KMemorySegment tree);

}
