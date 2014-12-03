package org.kevoree.modeling.microframework.test;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.microframework.test.cloud.CloudDimension;
import org.kevoree.modeling.microframework.test.cloud.CloudUniverse;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Element;
import org.kevoree.modeling.microframework.test.cloud.Node;

/**
 * Created by gregory.nain on 03/12/14.
 */
public class DeleteTest {


    @Test
    public void basicDeleteTest() {

        CloudUniverse universe = new CloudUniverse();
        universe.connect(null);
        CloudDimension dimension = universe.newDimension();
        CloudView factory = dimension.time(0l);
        Node n = factory.createNode();
        factory.setRoot(n, null);
        dimension.saveUnload(new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                if(throwable != null) {
                    throwable.printStackTrace();
                }
            }
        });


        CloudView factory1 = dimension.time(1l);
        Element e = factory1.createElement();
        factory1.select("/", new Callback<KObject[]>() {
            @Override
            public void on(KObject[] results) {
                if(results != null && results.length > 0) {
                    Node n2 = (Node)results[0];
                    n2.setElement(e);

                }

            }
        });
        dimension.saveUnload(new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                if(throwable != null) {
                    throwable.printStackTrace();
                }
            }
        });


        CloudView factory2 = dimension.time(2l);
        factory2.select("/", new Callback<KObject[]>() {
            @Override
            public void on(KObject[] results) {
                if(results != null && results.length > 0) {
                    Node n2 = (Node)results[0];
                    n2.getElement(new Callback<Element>() {
                        @Override
                        public void on(Element element) {
                            if(element != null) {
                                element.delete(new Callback<Throwable>() {
                                    @Override
                                    public void on(Throwable throwable) {
                                        if(throwable != null) {
                                            throwable.printStackTrace();
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
        dimension.saveUnload(new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                if(throwable != null) {
                    throwable.printStackTrace();
                }
            }
        });

        CloudView factory3 = dimension.time(3l);
        factory3.select("/", new Callback<KObject[]>() {
            @Override
            public void on(KObject[] results) {
                if(results != null && results.length > 0) {
                    Node n2 = (Node)results[0];
                    n2.getElement(new Callback<Element>() {
                        @Override
                        public void on(Element element) {
                            Assert.assertNull(element);
                        }
                    });
                }
            }
        });

        CloudView factory2_2 = dimension.time(2l);
        factory2_2.select("/", new Callback<KObject[]>() {
            @Override
            public void on(KObject[] results) {
                if(results != null && results.length > 0) {
                    Node n2 = (Node)results[0];
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



}
