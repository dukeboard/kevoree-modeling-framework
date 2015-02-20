package org.kevoree.modeling.microframework.test;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.data.cache.DefaultMemoryCache;
import org.kevoree.modeling.microframework.test.cloud.CloudUniverse;
import org.kevoree.modeling.microframework.test.cloud.CloudModel;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Element;
import org.kevoree.modeling.microframework.test.cloud.Node;

/**
 * Created by gregory.nain on 03/12/14.
 */
public class DeleteTest {

    @Test
    public void basicDeleteTest() {

        DefaultMemoryCache.DEBUG = true;

        CloudModel model = new CloudModel();
        model.connect(new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                if (throwable != null) {
                    throwable.printStackTrace();
                } else {
                    CloudUniverse universe = model.newUniverse();
                    CloudView factory = universe.time(0l);
                    Node n = factory.createNode();
                    factory.setRoot(n, new Callback<Throwable>() {
                        @Override
                        public void on(Throwable throwable) {
                            model.save(new Callback<Throwable>() {
                                @Override
                                public void on(Throwable aBoolean) {
                                    model.discard(new Callback<Throwable>() {
                                        @Override
                                        public void on(Throwable aBoolean) {
                                            CloudView factory1 = universe.time(1l);
                                            Element e = factory1.createElement();
                                            factory1.select("/", new Callback<KObject[]>() {
                                                @Override
                                                public void on(KObject[] results) {
                                                    Node n2 = (Node) results[0];
                                                    n2.setElement(e);
                                                }
                                            });


                                            model.save(new Callback<Throwable>() {
                                                @Override
                                                public void on(Throwable aBoolean) {
                                                    model.discard(new Callback<Throwable>() {
                                                        @Override
                                                        public void on(Throwable aBoolean) {

                                                        }
                                                    });
                                                }
                                            });

                                            CloudView factory2 = universe.time(2l);
                                            factory2.select("/", new Callback<KObject[]>() {
                                                @Override
                                                public void on(KObject[] results) {
                                                    Node n2 = (Node) results[0];
                                                    n2.getElement(new Callback<Element>() {
                                                        @Override
                                                        public void on(Element element) {
                                                            element.delete(new Callback<Throwable>() {
                                                                @Override
                                                                public void on(Throwable throwable) {
                                                                    if (throwable != null) {
                                                                        throwable.printStackTrace();
                                                                    }
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });

                                            model.save(new Callback<Throwable>() {
                                                @Override
                                                public void on(Throwable aBoolean) {
                                                    model.discard(new Callback<Throwable>() {
                                                        @Override
                                                        public void on(Throwable aBoolean) {

                                                        }
                                                    });
                                                }
                                            });

                                            CloudView factory3 = universe.time(3l);
                                            factory3.select("/", new Callback<KObject[]>() {
                                                @Override
                                                public void on(KObject[] results) {
                                                    Node n2 = (Node) results[0];
                                                    n2.getElement(new Callback<Element>() {
                                                        @Override
                                                        public void on(Element element) {
                                                            Assert.assertNull(element);

                                                            Node n42 = factory3.createNode();
                                                            n42.setName("n42");
                                                            n2.addChildren(n42);

                                                            //  System.out.println("n42="+n42);
                                                            // System.out.println("n2="+n2);

                                                            n42.delete(null);
                                                            // System.out.println("n2=" + n2);
                                                            // System.out.println("n42="+n42.getName());

                                                        }
                                                    });
                                                }
                                            });
                                            CloudView factory2_2 = universe.time(1l);
                                            factory2_2.select("/", new Callback<KObject[]>() {
                                                @Override
                                                public void on(KObject[] results) {
                                                    if (results != null && results.length > 0) {
                                                        Node n2 = (Node) results[0];
                                                        n2.getElement(new Callback<Element>() {
                                                            @Override
                                                            public void on(Element element) {
                                                                Assert.assertNotNull(element);
                                                            }
                                                        });
                                                    }
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });
    }


    @Test
    public void simpleDeleteTest() {

        CloudModel model = new CloudModel();
        model.connect(new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                CloudUniverse universe = model.newUniverse();
                CloudView factory = universe.time(0l);
                Node n = factory.createNode();
                n.setName("n");

                System.err.println("Seriously !!!");

                factory.lookup(n.uuid(), new Callback<KObject>() {
                    @Override
                    public void on(KObject kObject) {
                        System.err.println(kObject);
                        System.err.println(kObject.uuid());
                    }
                });

                factory.setRoot(n, null);
                Node n2 = factory.createNode();
                n2.setName("n2");
                n.addChildren(n2);
                //  n2.delete(null);
                factory.json().save(n, new ThrowableCallback<String>() {
                    @Override
                    public void on(String s, Throwable error) {
                        // System.err.println(s);
                    }
                });
            }
        });


    }


}
