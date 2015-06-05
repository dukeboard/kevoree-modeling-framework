package org.kevoree.modeling.memory.struct.segment.impl;

import org.kevoree.modeling.memory.struct.segment.BaseKMemorySegmentTest;
import org.kevoree.modeling.memory.struct.segment.KMemorySegment;

/**
 * Created by duke on 05/06/15.
 */
public class HeapMemorySegmentTest extends BaseKMemorySegmentTest {

    @Override
    public KMemorySegment createMemorySegment() {
        return new HeapMemorySegment();
    }

}
