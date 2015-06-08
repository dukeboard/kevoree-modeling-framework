package org.kevoree.modeling.memory.struct.map.impl;

import org.kevoree.modeling.KConfig;
import org.kevoree.modeling.memory.struct.map.BaseKLongHashMapTest;
import org.kevoree.modeling.memory.struct.map.KLongHashMap;

/**
 * Created by duke on 03/03/15.
 */
public class ArrayLongHashMapTest extends BaseKLongHashMapTest {

    @Override
    public KLongHashMap createKLongHashMap(int p_initalCapacity, float p_loadFactor) {
        return new ArrayLongHashMap<String>(p_initalCapacity, p_loadFactor);
    }
}
