package org.tinycloud.test;

import org.cloud.Cloud;
import org.cloud.Node;
import org.cloud.Software;
import org.cloud.impl.DefaultCloudFactory;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 14/11/2013
 * Time: 20:31
 */
public class SimpleTimeDistortionTest {

    public static final int NODES_PER_CLOUD = 1000;
    public static final int SOFTWARES_PER_NODE = 1000;

    private static void populate(DefaultCloudFactory factory) {
        Cloud cloud = factory.createCloud();

        for (int i = 0; i < NODES_PER_CLOUD; i++) {
            Node node = factory.createNode();
            node.setId("node_" + i);
            cloud.addNodes(node);

            for (int j = 0; j < SOFTWARES_PER_NODE; j++) {
                Software soft = factory.createSoftware();
                soft.setName("soft_" + i + "_" + j);
                node.addSoftwares(soft);
            }
        }
        System.out.println("Persist everything...");
        long startPersist = System.currentTimeMillis();
        factory.persistBatch(factory.createBatch().addElementAndReachable(cloud));
        long endPersist = System.currentTimeMillis();
        System.out.println("Persisted in " + (endPersist - startPersist) + " ms");
    }

    public static void main(String[] args) {

    }

}
