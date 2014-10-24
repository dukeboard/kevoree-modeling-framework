package org.kevoree.modeling.microframework.test;

import org.junit.Test;
import org.kevoree.modeling.api.data.MemoryKDataBase;
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
        MemoryKDataBase dataBase = new MemoryKDataBase();
        CloudUniverse universe = new CloudUniverse(dataBase);
        universe.newDimension((dimension0) -> {
            CloudView t0 = dimension0.time(0l);
            Node node = t0.createNode();
            node.setName("n0");
            t0.setRoot(node);
            assertTrue(node.isRoot());
            universe.storage().getRoot(t0, (resolvedRoot) -> {
                assertEquals(node, resolvedRoot);
            });
            assertTrue(node.isRoot());
            dimension0.save((e) -> {
                CloudUniverse universe2 = new CloudUniverse(dataBase);
                universe2.dimension(dimension0.key(), (dimension0_2) -> {
                    CloudView t0_2 = dimension0_2.time(0l);
                    t0_2.lookup(node.uuid(), (resolved) -> {
                        t0_2.lookup(node.uuid(), (resolved2) -> {
                            assertEquals(resolved, resolved2);
                        });
                        universe2.storage().getRoot(t0_2, (resolvedRoot) -> {
                            assertEquals(resolved, resolvedRoot);
                        });
                        assertTrue(resolved.isRoot());
                    });
                });
            });
        });
    }

}
