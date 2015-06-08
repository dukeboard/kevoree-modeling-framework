package org.kevoree.modeling.memory.struct.map.impl;

import org.kevoree.modeling.KConfig;
import org.kevoree.modeling.memory.struct.map.BaseKStringHashMapTest;
import org.kevoree.modeling.memory.struct.map.KStringHashMap;

/**
 * Created by duke on 09/04/15.
 */
public class ArrayStringHashMapTest extends BaseKStringHashMapTest {

    @Override
    public KStringHashMap createKStringHashMap(int p_initalCapacity, float p_loadFactor) {
        return new ArrayStringHashMap<String>(p_initalCapacity, p_loadFactor);
    }
}
