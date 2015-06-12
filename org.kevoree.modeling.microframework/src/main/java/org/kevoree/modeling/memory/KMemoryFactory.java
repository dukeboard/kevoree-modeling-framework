package org.kevoree.modeling.memory;

import org.kevoree.modeling.memory.struct.map.KLongLongMap;
import org.kevoree.modeling.memory.struct.segment.KMemorySegment;
import org.kevoree.modeling.memory.struct.tree.KLongLongTree;
import org.kevoree.modeling.memory.struct.tree.KLongTree;

public interface KMemoryFactory {

    KMemorySegment newCacheSegment(long originTime);

    KLongTree newLongTree();

    KLongLongTree newLongLongTree();

    KLongLongMap newLongLongMap(int initSize);

}
