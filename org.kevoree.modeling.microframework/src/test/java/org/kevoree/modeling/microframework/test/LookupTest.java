package org.kevoree.modeling.microframework.test;

import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.data.MemoryKDataBase;
import org.kevoree.modeling.microframework.test.cloud.CloudDimension;
import org.kevoree.modeling.microframework.test.cloud.CloudUniverse;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Node;

import static org.junit.Assert.*;

/**
 * Created by duke on 10/23/14.
 */
public class LookupTest {

    @Test
    public void lookupTest() throws Exception {
        final MemoryKDataBase dataBase = new MemoryKDataBase();
        final CloudUniverse universe = new CloudUniverse(dataBase);
        universe.newDimension(new Callback<CloudDimension>() {
            @Override
            public void on(final CloudDimension dimension0) {
                CloudView t0 = dimension0.time(0l);
                final Node node = t0.createNode();
                node.setName("n0");
                t0.setRoot(node);
                assertTrue(node.isRoot());
                universe.storage().getRoot(t0, new Callback<KObject>() {
                    @Override
                    public void on(KObject resolvedRoot) {
                        assertEquals(node, resolvedRoot);
                    }
                });
                assertTrue(node.isRoot());
                dimension0.save(new Callback<Throwable>() {
                    @Override
                    public void on(Throwable e) {
                        final CloudUniverse universe2 = new CloudUniverse(dataBase);
                        universe2.dimension(dimension0.key(), new Callback<CloudDimension>() {
                            @Override
                            public void on(CloudDimension dimension0_2) {
                                final CloudView t0_2 = dimension0_2.time(0l);
                                t0_2.lookup(node.uuid(), new Callback<KObject>() {
                                    @Override
                                    public void on(final KObject resolved) {
                                        t0_2.lookup(node.uuid(), new Callback<KObject>() {
                                            @Override
                                            public void on(KObject resolved2) {
                                                assertEquals(resolved, resolved2);
                                            }
                                        });
                                        universe2.storage().getRoot(t0_2, new Callback<KObject>() {
                                            @Override
                                            public void on(KObject resolvedRoot) {
                                                assertEquals(resolved, resolvedRoot);
                                            }
                                        });
                                        assertTrue(resolved.isRoot());
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
