package org.kevoree.modeling.memory.struct.map.impl;

import org.kevoree.modeling.KConfig;
import org.kevoree.modeling.memory.struct.map.BaseKLongLongHashMapTest;
import org.kevoree.modeling.memory.struct.map.KLongLongHashMap;

public class ArrayLongLongHashMapTest extends BaseKLongLongHashMapTest {

    @Override
    public KLongLongHashMap createKLongLongHashMap(int p_initalCapacity, float p_loadFactor) {
        return new ArrayLongLongHashMap(p_initalCapacity, p_loadFactor);
    }
}
