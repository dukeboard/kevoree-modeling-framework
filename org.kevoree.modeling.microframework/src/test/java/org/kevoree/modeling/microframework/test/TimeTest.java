package org.kevoree.modeling.microframework.test;

import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
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
        universe.newDimension(new Callback<CloudDimension>() {
            @Override
            public void on(CloudDimension dimension0) {
                assertNotNull("Dimension should be created", dimension0);

                // create time0
                final CloudView t0 = dimension0.time(0l);
                assertNotNull("Time0 should be created", t0);
                assertEquals("Time0 should be created with time 0", t0.now(), 0l);

                final Node node0 = t0.createNode();
                assertEquals("Node0 should be created with time 0", node0.now(), 0l);

                Element element0 = t0.createElement();
                node0.setElement(element0);
                assertEquals("Node0 should be created with time 0", element0.now(), 0l);

                // create time 0
                final CloudView t1 = dimension0.time(1l);

                // create element at time t1
                final Element element1 = t1.createElement();
                assertEquals(element1.now(), t1.now());

                t1.lookup(node0.uuid(), new Callback<KObject>() {
                    @Override
                    public void on(KObject kObject) {
                        ((Node) kObject).setElement(element1);

                        // lookup node
                        t0.lookup(node0.uuid(), new Callback<KObject>() {
                            @Override
                            public void on(KObject kObject_t0) {
                                assertEquals("Node should be resolved with time 0", kObject_t0.now(), 0l);
                            }
                        });

                        //
                        t1.lookup(node0.uuid(), new Callback<KObject>() {
                            @Override
                            public void on(KObject kObject_t1) {
                                assertEquals("Node should be resolved with time 1", kObject_t1.now(), 1l);
                            }
                        });

                        ((Node) kObject).getElement(new Callback<Element>() {
                            @Override
                            public void on(Element e) {
                                assertNotNull(e);
                            }
                        });

                    }
                });

                // test navigation from node to element at t1
                t1.lookup(node0.uuid(), new Callback<KObject>() {
                    @Override
                    public void on(KObject kObject) {
                        ((Node) kObject).getElement(new Callback<Element>() {
                            @Override
                            public void on(Element element) {
                                assertNotNull("Element1 should be resolved", element);
                                assertEquals("Element1 should have time 1", element.now(), 1l);
                            }
                        });
                    }
                });


                CloudView t2 = dimension0.time(2l);
                Element element2 = t2.createElement();


                // protected against null callback?
                t0.lookup(node0.uuid(), null);
            }
        });


    }
}
