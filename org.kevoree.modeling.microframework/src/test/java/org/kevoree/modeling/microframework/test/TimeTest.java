package org.kevoree.modeling.microframework.test;

import org.junit.Test;
import org.kevoree.modeling.api.data.MemoryKDataBase;
import org.kevoree.modeling.microframework.test.cloud.*;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

/**
 * Created by thomas on 10/21/14.
 */
public class TimeTest {

    @Test
    public void timeTest() {
        CloudUniverse universe = new CloudUniverse(new MemoryKDataBase());
        CloudDimension dimension0 = universe.create();
        assertNotNull("Dimension should be created", dimension0);

        // create time0
        CloudView t0 = dimension0.time(0l);
        assertNotNull("Time0 should be created", t0);
        assertEquals("Time0 should be created with time 0", t0.now(), 0l);

        Node node0 = t0.createNode();
        assertEquals("Node0 should be created with time 0", node0.now(), 0l);

        Element element0 = t0.createElement();
        node0.setElement(element0);
        assertEquals("Node0 should be created with time 0", element0.now(), 0l);

        // create time 0
        CloudView t1 = dimension0.time(1l);

        // create a new version element1
        Element element1 = t1.createElement();
        t1.lookup(node0.uuid(), kObject -> {
            ((Node) kObject).setElement(element1);
        });

        //
        t0.lookup(node0.uuid(), kObject -> {
            System.out.println(kObject);
        });

        t1.lookup(node0.uuid(), kObject -> {
            System.out.println(kObject);
        });

        // protected against null callback?
        t0.lookup(node0.uuid(), null);

    }
}
