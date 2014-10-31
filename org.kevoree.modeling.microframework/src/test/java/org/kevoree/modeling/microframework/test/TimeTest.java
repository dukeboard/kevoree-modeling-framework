package org.kevoree.modeling.microframework.test;

import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.data.MemoryKDataBase;
import org.kevoree.modeling.microframework.test.cloud.*;

import static org.junit.Assert.*;

/**
 * Created by thomas on 10/21/14.
 */
public class TimeTest {

    @Test
    public void timeCreationTest() {
        CloudUniverse universe = new CloudUniverse(new MemoryKDataBase());
        universe.newDimension(new Callback<CloudDimension>() {
            @Override
            public void on(CloudDimension dimension0) {
                assertNotNull("Dimension should be created", dimension0);

                // create time0
                final CloudView t0 = dimension0.time(0l);
                assertNotNull("Time0 should be created", t0);
                assertEquals("Time0 should be created with time 0", t0.now(), 0l);

                // create time1
                final CloudView t1 = dimension0.time(1l);
                assertNotNull("Time1 should be created", t1);
                assertEquals("Time1 should be created with time 0", t1.now(), 1l);
            }
        });
    }

    @Test
    public void simpleTimeNavigationTest() {
        CloudUniverse universe = new CloudUniverse(new MemoryKDataBase());
        universe.newDimension(new Callback<CloudDimension>() {
            @Override
            public void on(CloudDimension dimension0) {
                assertNotNull("Dimension should be created", dimension0);

                // create time0
                final CloudView t0 = dimension0.time(0l);

                // create node0 and element0 and link them
                final Node node0 = t0.createNode();
                Element element0 = t0.createElement();
                node0.setElement(element0);

                node0.getElement(new Callback<Element>() {
                    @Override
                    public void on(Element element) {
                        assertEquals(element, element0);
                        assertEquals(element.now(), t0.now());
                    }
                });

                t0.lookup(node0.uuid(), new Callback<KObject>() {
                    @Override
                    public void on(KObject kObject) {
                        ((Node) kObject).getElement(new Callback<Element>() {
                            @Override
                            public void on(Element element) {
                                assertEquals(element, element0);
                                assertEquals(element.now(), t0.now());
                            }
                        });
                    }
                });
            }
        });
    }


    @Test
    public void distortedTimeNavigationTest() {
        CloudUniverse universe = new CloudUniverse(new MemoryKDataBase());
        universe.newDimension(new Callback<CloudDimension>() {
            @Override
            public void on(CloudDimension dimension0) {
                assertNotNull("Dimension should be created", dimension0);

                // create time0
                final CloudView t0 = dimension0.time(0l);
                // create node0
                final Node node0 = t0.createNode();

                node0.getElement(new Callback<Element>() {
                    @Override
                    public void on(Element element) {
                        assertNull(element);
                    }
                });

                t0.lookup(node0.uuid(), new Callback<KObject>() {
                    @Override
                    public void on(KObject kObject) {
                        ((Node) kObject).getElement(new Callback<Element>() {
                            @Override
                            public void on(Element element) {
                                assertNull(element);
                            }
                        });
                    }
                });

                // create time1
                final CloudView t1 = dimension0.time(1l);

                // create elem1 and link node0 to elem1
                final Element elem1 = t1.createElement();
                node0.setElement(elem1);

                // at t0 node0.getElement should be null
                t0.lookup(node0.uuid(), new Callback<KObject>() {
                    @Override
                    public void on(KObject kObject) {
                        ((Node) kObject).getElement(new Callback<Element>() {
                            @Override
                            public void on(Element element) {
                                assertNull(element);
                            }
                        });
                    }
                });

                // at t1 node0.getElement should return elem1
                t1.lookup(node0.uuid(), new Callback<KObject>() {
                    @Override
                    public void on(KObject kObject) {
                        ((Node) kObject).getElement(new Callback<Element>() {
                            @Override
                            public void on(Element element) {
                                assertNotNull(element);
                                assertEquals(element, elem1);
                                assertEquals(element.now(), t1.now());
                            }
                        });
                    }
                });

            }
        });
    }

    @Test
    public void objectModificationTest() {
        CloudUniverse universe = new CloudUniverse(new MemoryKDataBase());
        universe.newDimension(new Callback<CloudDimension>() {
            @Override
            public void on(CloudDimension dimension0) {
                assertNotNull("Dimension should be created", dimension0);

                // create time0
                final CloudView t0 = dimension0.time(0l);
                // create node0
                final Node node0 = t0.createNode();

                node0.getElement(new Callback<Element>() {
                    @Override
                    public void on(Element element) {
                        assertNull(element);
                    }
                });

                t0.lookup(node0.uuid(), new Callback<KObject>() {
                    @Override
                    public void on(KObject kObject) {
                        ((Node) kObject).getElement(new Callback<Element>() {
                            @Override
                            public void on(Element element) {
                                assertNull(element);
                            }
                        });
                    }
                });

                // create time1
                final CloudView t1 = dimension0.time(1l);

                // create elem1 and link node0 to elem1
                final Element elem1 = t1.createElement();
                node0.setElement(elem1);

                // at t0 node0.getElement should be null
                t0.lookup(node0.uuid(), new Callback<KObject>() {
                    @Override
                    public void on(KObject kObject) {
                        ((Node) kObject).getElement(new Callback<Element>() {
                            @Override
                            public void on(Element element) {
                                assertNull(element);
                            }
                        });
                    }
                });

                // at t1 node0.getElement should return elem1
                t1.lookup(node0.uuid(), new Callback<KObject>() {
                    @Override
                    public void on(KObject kObject) {
                        ((Node) kObject).getElement(new Callback<Element>() {
                            @Override
                            public void on(Element element) {
                                assertNotNull(element);
                                assertEquals(element, elem1);
                                assertEquals(element.now(), t1.now());
                            }
                        });
                    }
                });

            }
        });
    }

}
