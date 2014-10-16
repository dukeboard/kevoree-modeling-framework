package org.kevoree.modeling.microframework.test;

import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.ModelVisitor;
import org.kevoree.modeling.api.data.MemoryDataStore;
import org.kevoree.modeling.microframework.test.cloud.*;

import static org.junit.Assert.*;

/**
 * Created by duke on 10/13/14.
 */
public class HelloTest {

    @Test
    public void helloTest() {
        CloudUniverse univers = new CloudUniverse(new MemoryDataStore());
        CloudDimension dimension0 = univers.create();
        assertNotNull("Dimension should be created", dimension0);
        assertEquals("Dimension should be created with ID 0", dimension0.key(), "0");

        CloudView t0 = dimension0.time(0l);
        assertNotNull("Time0 should be created", t0);
        assertEquals("Time0 should be created with time 0", t0.now(), 0l);

        Node nodeT0 = t0.createNode();
        assertNotNull(nodeT0);
        assertNotNull(nodeT0.path());

        assertNull(nodeT0.getName());
        assertEquals("name=", nodeT0.key());
        nodeT0.setName("node0");
        assertEquals("node0", nodeT0.getName());
        assertEquals("name=node0", nodeT0.key());
        assertEquals(0l, nodeT0.now());

        assertNull(nodeT0.parentPath());

        Element child0 = t0.createElement();
        assertNotNull(child0.timeTree());
        assertTrue(child0.timeTree().last().equals(0l));
        assertTrue(child0.timeTree().first().equals(0l));

        Node nodeT1 = t0.createNode();
        nodeT1.setName("n1");
        nodeT0.addChildren(nodeT1, null);

        assertTrue(nodeT1.path().endsWith("/children[name=n1]"));
        final int[] i = {0};
        nodeT0.eachChildren((n) -> {
            i[0]++;
        }, null);
        assertEquals(1, i[0]);

        Node nodeT3 = t0.createNode();
        nodeT3.setName("n3");
        nodeT1.addChildren(nodeT3, null);

        assertTrue(nodeT3.path().endsWith("/children[name=n1]/children[name=n3]"));
        assertTrue(nodeT3.parentPath().endsWith("/children[name=n1]"));

        KObject[] parent = new KObject[1];
        nodeT3.parent((p) -> {
            parent[0] = p;
        });
        assertTrue(parent[0] == nodeT1);

        i[0] = 0;
        final int[] j = {0};
        nodeT0.visit(new ModelVisitor() {
            @Override
            public void visit(KObject elem, Callback<Result> visitor) {
                i[0]++;
                visitor.on(Result.CONTINUE);
            }
        }, (t) -> {
            j[0]++;
        });
        assertEquals(1, i[0]);
        assertEquals(1, j[0]);

        i[0] = 0;
        j[0] = 0;
        nodeT1.visit(new ModelVisitor() {
            @Override
            public void visit(KObject elem, Callback<Result> visitor) {
                i[0]++;
                visitor.on(Result.CONTINUE);
            }
        }, (t) -> {
            j[0]++;
        });
        assertEquals(1, i[0]);
        assertEquals(1, j[0]);

        i[0] = 0;
        j[0] = 0;
        nodeT3.visit(new ModelVisitor() {
            @Override
            public void visit(KObject elem, Callback<Result> visitor) {
                i[0]++;
                visitor.on(Result.CONTINUE);
            }
        }, (t) -> {
            j[0]++;
        });
        assertEquals(0, i[0]);
        assertEquals(1, j[0]);

        i[0] = 0;
        j[0] = 0;
        nodeT0.treeVisit(new ModelVisitor() {
            @Override
            public void visit(KObject elem, Callback<Result> visitor) {
                i[0]++;
                visitor.on(Result.CONTINUE);
            }
        }, (t) -> {
            j[0]++;
        });
        assertEquals(2, i[0]);
        assertEquals(1, j[0]);

        i[0] = 0;
        j[0] = 0;
        nodeT0.graphVisit(new ModelVisitor() {
            @Override
            public void visit(KObject elem, Callback<Result> visitor) {
                i[0]++;
                visitor.on(Result.CONTINUE);
            }
        }, (t) -> {
            j[0]++;
        });
        assertEquals(2, i[0]);
        assertEquals(1, j[0]);


        i[0] = 0;
        j[0] = 0;
        nodeT0.graphVisit((elem, callback) -> {
            i[0]++;
            callback.on(ModelVisitor.Result.CONTINUE);
        }, (t) -> {
            j[0]++;
        });
        assertEquals(2, i[0]);
        assertEquals(1, j[0]);


    }

}
