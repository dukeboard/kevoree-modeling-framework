package org.kevoree.modeling.microframework.test;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KEvent;
import org.kevoree.modeling.api.ModelVisitor;
import org.kevoree.modeling.api.VisitResult;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.data.AccessMode;
import org.kevoree.modeling.api.event.ListenerScope;
import org.kevoree.modeling.microframework.test.cloud.CloudDimension;
import org.kevoree.modeling.microframework.test.cloud.CloudUniverse;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Node;
import org.kevoree.modeling.microframework.test.cloud.Element;

import java.util.Map;

/**
 * Created by duke on 10/13/14.
 */
public class HelloTest {

    @Test
    public void helloTest() {
        CloudUniverse universe = new CloudUniverse();
        universe.connect(null);
        universe.listen(new ModelListener() {
            @Override
            public void on(KEvent evt) {
                //System.err.println(evt);
            }
        }, ListenerScope.UNIVERSE);


        CloudDimension dimension0 = universe.newDimension();

        Assert.assertNotNull(dimension0);

        CloudView t0 = dimension0.time(0l);
        Assert.assertNotNull(t0);
        Assert.assertEquals(t0.now(), 0l);

        Node nodeT0 = t0.createNode();
        Assert.assertNotNull(nodeT0);
        Assert.assertNotNull(nodeT0.uuid());
        // assertNotNull(nodeT0.path());

        Assert.assertNull(nodeT0.getName());
        Assert.assertEquals("name=", nodeT0.domainKey());
        nodeT0.setName("node0");
        Assert.assertEquals("node0", nodeT0.getName());
        Assert.assertEquals("name=node0", nodeT0.domainKey());
        Assert.assertEquals(0l, nodeT0.now());

//        assertNull(nodeT0.parentPath());

        Element child0 = t0.createElement();
        Assert.assertNotNull(child0.timeTree());
        Assert.assertTrue(child0.timeTree().last().equals(0l));
        Assert.assertTrue(child0.timeTree().first().equals(0l));

        Node nodeT1 = t0.createNode();
        nodeT1.setName("n1");

        nodeT0.addChildren(nodeT1);

        Map<Long, Integer> refs = (Map<Long, Integer>) t0.dimension().universe().storage().raw(nodeT1, AccessMode.READ)[1];
        Assert.assertTrue(refs.containsKey(nodeT0.uuid()));

//        assertTrue(nodeT1.path().endsWith("/children[name=n1]"));
        final int[] i = {0};
        nodeT0.eachChildren(new Callback<Node[]>() {
            @Override
            public void on(Node[] n) {
                for(int k=0;k<n.length;k++){
                    i[0]++;
                }
            }
        });
        Assert.assertEquals(1, i[0]);
        Node nodeT3 = t0.createNode();
        nodeT3.setName("n3");
        nodeT1.addChildren(nodeT3);

//        assertTrue(nodeT3.path().endsWith("/children[name=n1]/children[name=n3]"));
//        assertTrue(nodeT3.parentPath().endsWith("/children[name=n1]"));

        /*
        KObject[] parent = new KObject[1];

        nodeT3.parent((p) -> {
            parent[0] = p;
        });
        assertTrue(parent[0] == nodeT1);
*/
        i[0] = 0;
        final int[] j = {0};
        nodeT0.visit(new ModelVisitor() {
            @Override
            public VisitResult visit(KObject elem) {
                i[0]++;
                return VisitResult.CONTINUE;
            }
        }, new Callback<Throwable>() {
            @Override
            public void on(Throwable t) {
                j[0]++;
            }
        });
        Assert.assertEquals(1, i[0]);
        Assert.assertEquals(1, j[0]);

        i[0] = 0;
        j[0] = 0;
        nodeT1.visit(new ModelVisitor() {
            @Override
            public VisitResult visit(KObject elem) {
                i[0]++;
                return VisitResult.CONTINUE;
            }
        }, new Callback<Throwable>() {
            @Override
            public void on(Throwable t) {
                j[0]++;
            }
        });
        Assert.assertEquals(1, i[0]);
        Assert.assertEquals(1, j[0]);

        i[0] = 0;
        j[0] = 0;
        nodeT3.visit(new ModelVisitor() {
            @Override
            public VisitResult visit(KObject elem) {
                i[0]++;
                return VisitResult.CONTINUE;
            }
        }, new Callback<Throwable>() {
            @Override
            public void on(Throwable t) {
                j[0]++;
            }
        });
        Assert.assertEquals(0, i[0]);
        Assert.assertEquals(1, j[0]);

        i[0] = 0;
        j[0] = 0;
        nodeT0.treeVisit(new ModelVisitor() {
            @Override
            public VisitResult visit(KObject elem) {
                i[0]++;
                return VisitResult.CONTINUE;
            }
        }, new Callback<Throwable>() {
            @Override
            public void on(Throwable t) {
                j[0]++;
            }
        });
        Assert.assertEquals(2, i[0]);
        Assert.assertEquals(1, j[0]);

        i[0] = 0;
        j[0] = 0;
        nodeT0.graphVisit(new ModelVisitor() {
            @Override
            public VisitResult visit(KObject elem) {
                i[0]++;
                return VisitResult.CONTINUE;
            }
        }, new Callback<Throwable>() {
            @Override
            public void on(Throwable t) {
                j[0]++;
            }
        });
        Assert.assertEquals(2, i[0]);
        Assert.assertEquals(1, j[0]);


        i[0] = 0;
        j[0] = 0;
        nodeT0.graphVisit(new ModelVisitor() {
            @Override
            public VisitResult visit(KObject elem) {
                i[0]++;
                return VisitResult.CONTINUE;
            }
        }, new Callback<Throwable>() {
            @Override
            public void on(Throwable t) {
                j[0]++;
            }
        });
        Assert.assertEquals(2, i[0]);
        Assert.assertEquals(1, j[0]);

        //System.err.println(nodeT0);
    }

}
