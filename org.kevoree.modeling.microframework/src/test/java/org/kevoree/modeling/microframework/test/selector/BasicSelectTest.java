package org.kevoree.modeling.microframework.test.selector;

import org.junit.Test;
import org.kevoree.modeling.api.data.MemoryKDataBase;
import org.kevoree.modeling.microframework.test.cloud.CloudUniverse;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Node;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

/**
 * Created by duke on 10/27/14.
 */
public class BasicSelectTest {

    @Test
    public void selectTest() throws Exception {
        MemoryKDataBase dataBase = new MemoryKDataBase();
        CloudUniverse universe = new CloudUniverse(dataBase);
        universe.newDimension((dimension0) -> {
            CloudView t0 = dimension0.time(0l);
            Node node = t0.createNode();
            node.setName("n0");
            t0.setRoot(node);
            Node node2 = t0.createNode();
            node2.setName("n1");
            node.addChildren(node2);

            Node node3 = t0.createNode();
            node3.setName("n2");
            node2.addChildren(node3);


            Node node4 = t0.createNode();
            node4.setName("n4");
            node3.addChildren(node4);

            Node node5 = t0.createNode();
            node5.setName("n5");
            node3.addChildren(node5);

            t0.select("children[]", (selecteds) -> {
                assertEquals(1, selecteds.size());
                assertEquals(node2, selecteds.get(0));
            });

            t0.select("children[name=*]", (selecteds) -> {
                assertEquals(1, selecteds.size());
                assertEquals(node2, selecteds.get(0));
            });

            t0.select("children[name=n*]", (selecteds) -> {
                assertEquals(1, selecteds.size());
                assertEquals(node2, selecteds.get(0));
            });

            t0.select("children[name=n1]", (selecteds) -> {
                assertEquals(1, selecteds.size());
                assertEquals(node2, selecteds.get(0));
            });

            t0.select("children[name=!n1]", (selecteds) -> {
                assertEquals(0, selecteds.size());
            });

            t0.select("children[name!=n1]", (selecteds) -> {
                assertEquals(0, selecteds.size());
            });

            t0.select("children[name=n1]/children[name=n2]", (selecteds) -> {
                assertEquals(1, selecteds.size());
                assertEquals(node3, selecteds.get(0));
            });

            t0.select("/children[name=n1]/children[name=n2]", (selecteds) -> {
                assertEquals(1, selecteds.size());
                assertEquals(node3, selecteds.get(0));
            });

            node.select("children[name=n1]/children[name=n2]", (selecteds) -> {
                assertEquals(1, selecteds.size());
                assertEquals(node3, selecteds.get(0));
            });

            node.select("/children[name=n1]/children[name=n2]", (selecteds) -> {
                assertEquals(0, selecteds.size());
            });

            node.select("children[name=n1]/children[name=n2]/children[name=*]", (selecteds) -> {
                assertEquals(2, selecteds.size());
            });

        });
    }

}
