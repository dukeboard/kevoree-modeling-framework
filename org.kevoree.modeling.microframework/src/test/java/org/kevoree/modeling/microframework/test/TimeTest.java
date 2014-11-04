package org.kevoree.modeling.microframework.test;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.data.MemoryKDataBase;
import org.kevoree.modeling.microframework.test.cloud.CloudDimension;
import org.kevoree.modeling.microframework.test.cloud.CloudUniverse;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Node;
import org.kevoree.modeling.microframework.test.cloud.Element;

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
                Assert.assertNotNull(dimension0);

                // create time0
                final CloudView t0 = dimension0.time(0l);
                Assert.assertNotNull(t0);
                Assert.assertEquals(t0.now(), 0l);

                // create time1
                final CloudView t1 = dimension0.time(1l);
                Assert.assertNotNull(t1);
                Assert.assertEquals(t1.now(), 1l);
            }
        });
    }

    @Test
    public void simpleTimeNavigationTest() {
        CloudUniverse universe = new CloudUniverse(new MemoryKDataBase());
        universe.newDimension(new Callback<CloudDimension>() {
            @Override
            public void on(CloudDimension dimension0) {
                Assert.assertNotNull(dimension0);

                // create time0
                final CloudView t0 = dimension0.time(0l);

                // create node0 and element0 and link them
                final Node node0 = t0.createNode();
                Element element0 = t0.createElement();
                node0.setElement(element0);

                node0.getElement(new Callback<Element>() {
                    @Override
                    public void on(Element element) {
                        Assert.assertEquals(element, element0);
                        Assert.assertEquals(element.now(), t0.now());
                    }
                });

                t0.lookup(node0.uuid(), new Callback<KObject>() {
                    @Override
                    public void on(KObject kObject) {
                        ((Node) kObject).getElement(new Callback<Element>() {
                            @Override
                            public void on(Element element) {
                                Assert.assertEquals(element, element0);
                                Assert.assertEquals(element.now(), t0.now());
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
                Assert.assertNotNull(dimension0);

                // create time0
                final CloudView t0 = dimension0.time(0l);
                // create node0
                final Node node0 = t0.createNode();

                node0.getElement(new Callback<Element>() {
                    @Override
                    public void on(Element element) {
                        Assert.assertNull(element);
                    }
                });

                t0.lookup(node0.uuid(), new Callback<KObject>() {
                    @Override
                    public void on(KObject kObject) {
                        ((Node) kObject).getElement(new Callback<Element>() {
                            @Override
                            public void on(Element element) {
                                Assert.assertNull(element);
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
                                Assert.assertNull(element);
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
                                Assert.assertNotNull(element);
                                Assert.assertEquals(element, elem1);
                                Assert.assertEquals(element.now(), t1.now());
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
                Assert.assertNotNull(dimension0);

                // create time0
                final CloudView t0 = dimension0.time(0l);
                // create node0 and elem0 and link them
                final Node node0 = t0.createNode();
                node0.setName("node at 0");
                node0.setValue("0");

                final Element elem0 = t0.createElement();
                node0.setElement(elem0);

                // create time1
                final CloudView t1 = dimension0.time(1l);
                t1.lookup(node0.uuid(), new Callback<KObject>() {
                    @Override
                    public void on(KObject kObject) {
                        ((Node) kObject).setName("node at 1");
                        ((Node) kObject).setValue("1");
                    }
                });

                // check name and value of node0 at t0
                t0.lookup(node0.uuid(), new Callback<KObject>() {
                    @Override
                    public void on(KObject kObject) {
                        Assert.assertEquals(((Node) kObject).getName(), "node at 0");
                        Assert.assertEquals(((Node) kObject).getValue(), "0");
                    }
                });


                // check name and value of node0 at t1
                t1.lookup(node0.uuid(), new Callback<KObject>() {
                    @Override
                    public void on(KObject kObject) {
                        Assert.assertEquals(((Node) kObject).getName(), "node at 1");
                        Assert.assertEquals(((Node) kObject).getValue(), "1");
                    }
                });
            }
        });
    }

}
