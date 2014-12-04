package org.kevoree.modeling.microframework.test;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.data.MemoryKDataBase;
import org.kevoree.modeling.api.trace.ModelTraceApplicator;
import org.kevoree.modeling.api.trace.TraceSequence;
import org.kevoree.modeling.microframework.test.cloud.CloudDimension;
import org.kevoree.modeling.microframework.test.cloud.CloudUniverse;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Node;
import org.kevoree.modeling.microframework.test.cloud.Element;

/**
 * Created by thomas on 31/10/14.
 */
public class CompareTest {

    /**
     * diff semantic: differences between two models,
     * apply the diff trace to construct a model from another model
     */
    @Test
    public void diffTest() {
        CloudUniverse universe = new CloudUniverse();
        universe.connect(null);

        CloudDimension dimension0 = universe.newDimension();

        Assert.assertNotNull(dimension0);

        // create time0
        final CloudView t0 = dimension0.time(0l);

        // create two nodes
        final Node node0_0 = t0.createNode();
        node0_0.setName("node0_0");
        node0_0.setValue("0_0");

        final Node node0_1 = t0.createNode();
        node0_1.setName("node0_1");
        node0_1.setValue("0_1");

        // test diff
        node0_0.diff(node0_1, new Callback<TraceSequence>() {
            @Override
            public void on(TraceSequence traceSequence) {
                Assert.assertNotEquals(traceSequence.traces().length, 0);
                Assert.assertEquals("[{\"type\":\"SET\",\"src\":\"1\",\"meta\":\"name\",\"val\":\"node0_1\"},\n" +
                        "{\"type\":\"SET\",\"src\":\"1\",\"meta\":\"value\",\"val\":\"0_1\"}]", traceSequence.toString());
            }
        });

        // model trace applicator
        node0_0.diff(node0_1, new Callback<TraceSequence>() {
            @Override
            public void on(TraceSequence traceSequence) {
                new ModelTraceApplicator(node0_0).applyTraceSequence(traceSequence, new Callback<Throwable>() {
                    @Override
                    public void on(Throwable throwable) {
                        Assert.assertNull(throwable);
                        // compare new node0_0 with node0_1
                        node0_0.diff(node0_1, new Callback<TraceSequence>() {
                            @Override
                            public void on(TraceSequence traceSequence) {
                                Assert.assertEquals(traceSequence.traces().length, 0);
                            }
                        });
                    }
                });
            }
        });

    }

    /**
     * intersection semantic: simialarities between two models
     */
    @Test
    public void intersectionTest() {
        CloudUniverse universe = new CloudUniverse();
        universe.connect(null);

        CloudDimension dimension0 = universe.newDimension();

        Assert.assertNotNull(dimension0);

        // create time0
        final CloudView t0 = dimension0.time(0l);

        // create two nodes
        final Node node0_0 = t0.createNode();
        node0_0.setName("node0_0");
        node0_0.setValue("0_0");

        final Node node0_1 = t0.createNode();
        node0_1.setName("node0_1");
        node0_1.setValue("0_1");

        // test intersection
        node0_0.intersection(node0_1, new Callback<TraceSequence>() {
            @Override
            public void on(TraceSequence traceSequence) {
                Assert.assertEquals(traceSequence.traces().length, 0);
            }
        });

        // create node0_2 with same value than node0_1
        final Node node0_2 = t0.createNode();
        node0_2.setName("node0_2");
        node0_2.setValue("0_1");

        node0_2.intersection(node0_1, new Callback<TraceSequence>() {
            @Override
            public void on(TraceSequence traceSequence) {
                Assert.assertEquals(traceSequence.traces().length, 1);
                Assert.assertEquals("[{\"type\":\"SET\",\"src\":\"3\",\"meta\":\"value\",\"val\":\"0_1\"}]", traceSequence.toString());
            }
        });

    }

    /**
     * union semantic: union but merge for same attributes/refs
     */
    @Test
    public void unionTest() {
        CloudUniverse universe = new CloudUniverse();
        universe.connect(null);

        CloudDimension dimension0 = universe.newDimension();
        Assert.assertNotNull(dimension0);

        // create time0
        final CloudView t0 = dimension0.time(0l);

        // create two nodes
        final Node node0_0 = t0.createNode();
        node0_0.setName("node0_0");
        node0_0.setValue("0_0");
        final Element elem0_0 = t0.createElement();
        elem0_0.setName("elem0_0");
        node0_0.setElement(elem0_0);

        final Node node0_1 = t0.createNode();
        node0_1.setName("node0_1");
        node0_1.setValue("0_1");

        // test union
        node0_0.merge(node0_1, new Callback<TraceSequence>() {
            @Override
            public void on(TraceSequence traceSequence) {
                Assert.assertEquals("{\"type\":\"SET\",\"src\":\"1\",\"meta\":\"name\",\"val\":\"node0_1\"}", traceSequence.traces()[0].toString()); // merge behaviour
                Assert.assertEquals("{\"type\":\"SET\",\"src\":\"1\",\"meta\":\"value\",\"val\":\"0_1\"}", traceSequence.traces()[1].toString()); // merge behaviour
                Assert.assertEquals("{\"type\":\"ADD\",\"src\":\"1\",\"meta\":\"element\"}", traceSequence.traces()[2].toString()); // union behaviour

                new ModelTraceApplicator(node0_0).applyTraceSequence(traceSequence, new Callback<Throwable>() {
                    @Override
                    public void on(Throwable throwable) {
                        node0_0.getElement(new Callback<Element>() {
                            @Override
                            public void on(Element element) {
                                Assert.assertEquals(elem0_0, element); // union behaviour
                            }
                        });
                    }
                });
            }
        });
    }
}
