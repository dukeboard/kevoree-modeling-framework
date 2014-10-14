package org.kevoree.modeling.microframework.test;

import org.junit.Test;
import org.kevoree.modeling.api.data.MemoryDataStore;
import org.kevoree.modeling.microframework.test.cloud.CloudDimension;
import org.kevoree.modeling.microframework.test.cloud.CloudUnivers;
import static org.junit.Assert.*;
/**
 * Created by duke on 10/13/14.
 */
public class HelloTest {

    @Test
    public void helloTest() {
        CloudUnivers univers = new CloudUnivers(new MemoryDataStore());
        CloudDimension dimension0 = univers.create();
        assertNotNull("Dimension should be created",dimension0);
        assertEquals("Dimension should be created with ID 0",dimension0.key(),"0");

    }

}
