package org.kevoree.modeling.microframework.test;

import org.junit.Test;
import org.kevoree.modeling.api.data.MemoryDataStore;
import org.kevoree.modeling.microframework.test.cloud.*;

import static org.junit.Assert.*;

/**
 * Created by duke on 10/13/14.
 */
public class HelloTest {

    @Test
    public void helloTest() {
        CloudUniverse univers = new CloudUniverse(new MemoryDataStore());
        CloudDimension dimension0 = univers.create();
        assertNotNull("Dimension should be created", dimension0);
        assertEquals("Dimension should be created with ID 0", dimension0.key(), "0");

        CloudView t0 = dimension0.time(0l);
        assertNotNull("Time0 should be created", t0);
        assertEquals("Time0 should be created with time 0", t0.now(), 0l);

        Node nodeT0 = t0.createNode();
        assertNotNull(nodeT0);
        assertNotNull(nodeT0.path());

        assertNull(nodeT0.getName());
        assertEquals("name=", nodeT0.key());
        nodeT0.setName("node0");
        assertEquals("node0", nodeT0.getName());
        assertEquals("name=node0", nodeT0.key());
        assertEquals(0l,nodeT0.now());

        assertNull(nodeT0.parentPath());

        Element child0 = t0.createElement();
        assertNotNull(child0.timeTree());
        assertTrue(child0.timeTree().last().equals(0l));
        assertTrue(child0.timeTree().first().equals(0l));



    }

}
