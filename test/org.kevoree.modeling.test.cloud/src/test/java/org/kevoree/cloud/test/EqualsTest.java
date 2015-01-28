package org.kevoree.cloud.test;

import cloud.CloudModel;
import cloud.CloudUniverse;
import cloud.CloudView;
import cloud.Node;
import org.junit.Assert;
import org.junit.Test;

import java.util.ArrayList;
import java.util.HashSet;

/**
 * Created by gregory.nain on 28/01/15.
 */
public class EqualsTest {



    @Test
    public void equalsTest() {

        CloudModel model = new CloudModel();
        model.connect(null);

        CloudUniverse universe = model.newUniverse();
        CloudView view = universe.time(0L);

        Node n0_0 = view.createNode();
        n0_0.setName("N0");

        Node n0_1 = view.createNode();
        n0_1.setName("N0");

        Assert.assertTrue(n0_0.equals(n0_1));

    }


    @Test
    public void containsTest() {

        CloudModel model = new CloudModel();
        model.connect(null);

        CloudUniverse universe = model.newUniverse();
        CloudView view = universe.time(0L);

        Node n0_0 = view.createNode();
        n0_0.setName("N0");

        Node n0_1 = view.createNode();
        n0_1.setName("N0");

        HashSet<Node> nodeList = new HashSet<>();
        nodeList.add(n0_0);

        Assert.assertEquals(1, nodeList.size());
        Assert.assertTrue(nodeList.contains(n0_0));
        Assert.assertTrue(nodeList.contains(n0_1));

        nodeList.add(n0_1);
        Assert.assertEquals(1, nodeList.size());

    }

}
