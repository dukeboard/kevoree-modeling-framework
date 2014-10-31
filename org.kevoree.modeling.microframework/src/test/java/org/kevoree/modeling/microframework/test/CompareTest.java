package org.kevoree.modeling.microframework.test;

import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.data.MemoryKDataBase;
import org.kevoree.modeling.api.trace.ModelTraceApplicator;
import org.kevoree.modeling.api.trace.TraceSequence;
import org.kevoree.modeling.microframework.test.cloud.CloudDimension;
import org.kevoree.modeling.microframework.test.cloud.CloudUniverse;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Node;

import static org.junit.Assert.*;

/**
 * Created by thomas on 31/10/14.
 */
public class CompareTest {

    @Test
    public void diffTest() {
        CloudUniverse universe = new CloudUniverse(new MemoryKDataBase());
        universe.newDimension(new Callback<CloudDimension>() {
            @Override
            public void on(CloudDimension dimension0) {
                assertNotNull("Dimension should be created", dimension0);

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
                t0.createModelCompare().diff(node0_0, node0_1, new Callback<TraceSequence>() {
                    @Override
                    public void on(TraceSequence traceSequence) {
                        assertNotEquals(traceSequence.traces().length, 0);
                        assertEquals("[{\"type\":\"SET\",\"src\":\"1\",\"meta\":\"name\",\"val\":\"node0_1\"},\n" +
                                "{\"type\":\"SET\",\"src\":\"1\",\"meta\":\"value\",\"val\":\"0_1\"}]", traceSequence.toString());
                    }
                });

                // model trace applicator
                t0.createModelCompare().diff(node0_0, node0_1, new Callback<TraceSequence>() {
                    @Override
                    public void on(TraceSequence traceSequence) {
                        new ModelTraceApplicator(node0_0).applyTraceSequence(traceSequence, new Callback<Throwable>() {
                            @Override
                            public void on(Throwable throwable) {
                                assertNull(throwable);
                                // compare new node0_0 with node0_1
                                t0.createModelCompare().diff(node0_0, node0_1, new Callback<TraceSequence>() {
                                    @Override
                                    public void on(TraceSequence traceSequence) {
                                        assertEquals(traceSequence.traces().length, 0);
                                    }
                                });
                            }
                        });
                    }
                });

            }
        });
    }

    @Test
    public void intersectionTest() {
        CloudUniverse universe = new CloudUniverse(new MemoryKDataBase());
        universe.newDimension(new Callback<CloudDimension>() {
            @Override
            public void on(CloudDimension dimension0) {
                assertNotNull("Dimension should be created", dimension0);

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
                t0.createModelCompare().intersection(node0_0, node0_1, new Callback<TraceSequence>() {
                    @Override
                    public void on(TraceSequence traceSequence) {
                        assertEquals(traceSequence.traces().length, 0);
                    }
                });

                // create node0_2 with same value than node0_1
                final Node node0_2 = t0.createNode();
                node0_2.setName("node0_2");
                node0_2.setValue("0_1");

                t0.createModelCompare().intersection(node0_2, node0_1, new Callback<TraceSequence>() {
                    @Override
                    public void on(TraceSequence traceSequence) {
                        assertEquals(traceSequence.traces().length, 1);
                        assertEquals("[{\"type\":\"SET\",\"src\":\"3\",\"meta\":\"value\",\"val\":\"0_1\"}]", traceSequence.toString());
                    }
                });

            }
        });
    }

    @Test
    public void mergeTest() {
        CloudUniverse universe = new CloudUniverse(new MemoryKDataBase());
        universe.newDimension(new Callback<CloudDimension>() {
            @Override
            public void on(CloudDimension dimension0) {
                assertNotNull("Dimension should be created", dimension0);

                // create time0
                final CloudView t0 = dimension0.time(0l);

                // create two nodes
                final Node node0_0 = t0.createNode();
                node0_0.setName("node0_0");

                final Node node0_1 = t0.createNode();
                node0_1.setValue("0_1");

                // test diff
                t0.createModelCompare().union(node0_0, node0_1, new Callback<TraceSequence>() {
                    @Override
                    public void on(TraceSequence traceSequence) {
                        assertEquals("{\"type\":\"SET\",\"src\":\"1\",\"meta\":\"name\",\"val\":\"node0_0\"}", traceSequence.traces()[0].toString());
                        assertEquals("{\"type\":\"SET\",\"src\":\"1\",\"meta\":\"value\",\"val\":\"0_1\"}", traceSequence.traces()[1].toString());
                    }
                });

            }
        });
    }
}
