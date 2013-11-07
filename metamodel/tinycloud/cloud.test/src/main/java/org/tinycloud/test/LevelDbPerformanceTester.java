package org.tinycloud.test;

import org.cloud.Cloud;
import org.cloud.Node;
import org.cloud.Software;
import org.cloud.impl.DefaultCloudFactory;
import org.kevoree.modeling.datastores.leveldb.LevelDbDataStore;

/**
 * Created with IntelliJ IDEA.
 * User: thomas.hartmann
 * Date: 07/11/2013
 * Time: 11:03
 */
public class LevelDbPerformanceTester {

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
        DefaultCloudFactory factory = new DefaultCloudFactory();
        LevelDbDataStore datastore = new LevelDbDataStore();
        factory.setDatastore(datastore);

        System.out.println("Populate");
        populate(factory);

        System.out.println("Clear factory cache");
        factory.clearCache();


//        System.out.println("Stats:");
//        String stats = db.getProperty("leveldb.stats");
//        System.out.println(stats);

        System.out.println("Lookup from DataStore");
        long startLookup = System.currentTimeMillis();
        String val = datastore.get("trace", "nodes[node_69]");
        long endLookup = System.currentTimeMillis();
        System.out.println("Lookup in " + (endLookup - startLookup) + " ms");

        System.out.println(val);

        System.out.println("Commit to file system...");
        long startCommit = System.currentTimeMillis();
        factory.commit();
        long endCommit = System.currentTimeMillis();
        System.out.println("Committed in " + (endCommit - startCommit) + " ms");
    }

}
