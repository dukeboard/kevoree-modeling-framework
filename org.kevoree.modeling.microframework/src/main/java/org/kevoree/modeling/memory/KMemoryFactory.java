package org.kevoree.modeling.memory;

import org.kevoree.modeling.memory.struct.segment.KMemorySegment;
import org.kevoree.modeling.memory.struct.tree.KLongLongTree;
import org.kevoree.modeling.memory.struct.tree.KLongTree;

public interface KMemoryFactory {

    KMemorySegment newCacheSegment(long originTime);

    KLongTree newLongTree();

    KLongLongTree newLongLongTree();

}
