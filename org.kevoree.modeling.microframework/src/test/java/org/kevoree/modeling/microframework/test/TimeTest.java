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

        // create element at time t1
        Element element1 = t1.createElement();
        assertEquals(element1.now(), t1.now());

        t1.lookup(node0.uuid(), kObject -> {
            ((Node) kObject).setElement(element1);

            // lookup node
            t0.lookup(node0.uuid(), kObject_t0 -> {
                assertEquals("Node should be resolved with time 0", kObject_t0.now(), 0l);
            });

            //
            t1.lookup(node0.uuid(), kObject_t1 -> {
                assertEquals("Node should be resolved with time 1", kObject_t1.now(), 1l);
            });

        });

        // test navigation from node to element at t1
        t1.lookup(node0.uuid(), kObject -> {
            ((Node) kObject).getElement(element -> {
                assertNotNull("Element1 should be resolved", element);
                assertEquals("Element1 should have time 1", element.now(), 1l);
            });
        });


        CloudView t2 = dimension0.time(2l);
        Element element2 = t2.createElement();



        // protected against null callback?
        t0.lookup(node0.uuid(), null);

    }
}
