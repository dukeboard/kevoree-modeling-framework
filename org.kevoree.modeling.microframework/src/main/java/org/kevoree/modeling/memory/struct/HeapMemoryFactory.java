package org.kevoree.modeling.memory.struct;

import org.kevoree.modeling.KConfig;
import org.kevoree.modeling.memory.struct.map.KLongLongMap;
import org.kevoree.modeling.memory.struct.map.impl.ArrayLongLongMap;
import org.kevoree.modeling.memory.struct.segment.KMemorySegment;
import org.kevoree.modeling.memory.KMemoryFactory;
import org.kevoree.modeling.memory.struct.segment.impl.HeapMemorySegment;
import org.kevoree.modeling.memory.struct.tree.KLongLongTree;
import org.kevoree.modeling.memory.struct.tree.KLongTree;
import org.kevoree.modeling.memory.struct.tree.impl.LongLongTree;
import org.kevoree.modeling.memory.struct.tree.impl.LongTree;

public class HeapMemoryFactory implements KMemoryFactory {

    @Override
    public KMemorySegment newCacheSegment(long originTime) {
        return new HeapMemorySegment();
    }

    @Override
    public KLongTree newLongTree() {
        return new LongTree();
    }

    @Override
    public KLongLongTree newLongLongTree() {
        return new LongLongTree();
    }

    @Override
    public KLongLongMap newLongLongMap(int initSize) {
        return new ArrayLongLongMap(initSize, KConfig.CACHE_LOAD_FACTOR);
    }

}
