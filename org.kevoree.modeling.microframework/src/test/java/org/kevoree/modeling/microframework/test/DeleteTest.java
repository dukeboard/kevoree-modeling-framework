package org.kevoree.modeling.microframework.test;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.ThrowableCallback;
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
        final CloudModel model = new CloudModel();
        model.connect().then(new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                if (throwable != null) {
                    throwable.printStackTrace();
                } else {
                    final CloudUniverse universe = model.newUniverse();
                    CloudView factory = universe.time(0l);
                    Node n = factory.createNode();
                    factory.setRoot(n).then(new Callback<Throwable>() {
                        @Override
                        public void on(Throwable throwable) {
                            model.save().then(new Callback<Throwable>() {
                                @Override
                                public void on(Throwable aBoolean) {
                                    model.discard().then(new Callback<Throwable>() {
                                        @Override
                                        public void on(Throwable aBoolean) {
                                            CloudView factory1 = universe.time(1l);
                                            final Element e = factory1.createElement();
                                            factory1.select("/").then(new Callback<KObject[]>() {
                                                @Override
                                                public void on(KObject[] results) {
                                                    Node n2 = (Node) results[0];
                                                    n2.setElement(e);
                                                }
                                            });
                                            model.save().then(new Callback<Throwable>() {
                                                @Override
                                                public void on(Throwable aBoolean) {
                                                    model.discard().then(new Callback<Throwable>() {
                                                        @Override
                                                        public void on(Throwable aBoolean) {

                                                        }
                                                    });
                                                }
                                            });

                                            CloudView factory2 = universe.time(2l);
                                            factory2.select("/").then(new Callback<KObject[]>() {
                                                @Override
                                                public void on(KObject[] results) {
                                                    Node n2 = (Node) results[0];
                                                    n2.getElement(new Callback<Element>() {
                                                        @Override
                                                        public void on(Element element) {
                                                            element.delete().then(new Callback<Throwable>() {
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

                                            model.save().then(new Callback<Throwable>() {
                                                @Override
                                                public void on(Throwable aBoolean) {
                                                    model.discard().then(new Callback<Throwable>() {
                                                        @Override
                                                        public void on(Throwable aBoolean) {

                                                        }
                                                    });
                                                }
                                            });

                                            final CloudView factory3 = universe.time(3l);
                                            factory3.select("/").then(new Callback<KObject[]>() {
                                                @Override
                                                public void on(KObject[] results) {
                                                    final Node n2 = (Node) results[0];
                                                    n2.getElement(new Callback<Element>() {
                                                        @Override
                                                        public void on(Element element) {
                                                            Assert.assertNull(element);

                                                            Node n42 = factory3.createNode();
                                                            n42.setName("n42");
                                                            n2.addChildren(n42);

                                                            //  System.out.println("n42="+n42);
                                                            // System.out.println("n2="+n2);

                                                            n42.delete();
                                                            // System.out.println("n2=" + n2);
                                                            // System.out.println("n42="+n42.getName());

                                                        }
                                                    });
                                                }
                                            });
                                            CloudView factory2_2 = universe.time(1l);
                                            factory2_2.select("/").then(new Callback<KObject[]>() {
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

        final CloudModel model = new CloudModel();
        model.connect().then(new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                CloudUniverse universe = model.newUniverse();
                CloudView factory = universe.time(0l);
                Node n = factory.createNode();
                n.setName("n");
                factory.setRoot(n);
                Node n2 = factory.createNode();
                n2.setName("n2");
                n.addChildren(n2);
                //  n2.delete(null);
                factory.json().save(n).then(new Callback<String>() {
                    @Override
                    public void on(String s) {
                        // System.err.println(s);
                    }
                });
            }
        });


    }


}
