package org.kevoree.modeling.microframework.test;

import org.junit.Test;
import org.kevoree.modeling.api.data.MemoryDataStore;
import org.kevoree.modeling.microframework.test.cloud.CloudDimension;
import org.kevoree.modeling.microframework.test.cloud.CloudUnivers;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Node;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

/**
 * Created by duke on 10/13/14.
 */
public class HelloTest {

    @Test
    public void helloTest() {
        CloudUnivers univers = new CloudUnivers(new MemoryDataStore());
        CloudDimension dimension0 = univers.create();
        assertNotNull("Dimension should be created", dimension0);
        assertEquals("Dimension should be created with ID 0", dimension0.key(), "0");

        CloudView t0 = dimension0.time(0l);
        assertNotNull("Time0 should be created", t0);
        assertEquals("Time0 should be created with time 0", t0.now(), 0l);

        Node nodeT0 = t0.createNode();
        System.out.println(nodeT0);

        nodeT0.path();

    }

}
