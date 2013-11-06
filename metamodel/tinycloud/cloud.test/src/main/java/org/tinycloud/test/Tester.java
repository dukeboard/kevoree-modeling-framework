package org.tinycloud.test;

import org.cloud.Cloud;
import org.cloud.Node;
import org.cloud.Software;
import org.cloud.impl.DefaultCloudFactory;
import org.kevoree.modeling.api.persistence.KMFContainerProxy;
import org.kevoree.modeling.api.persistence.MemoryDataStore;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 06/11/2013
 * Time: 10:39
 */
public class Tester {

    public static void main(String[] args) {

        System.out.println("Run");

        DefaultCloudFactory factory = new DefaultCloudFactory();
        factory.setDatastore(new MemoryDataStore());

        Cloud cloud = factory.createCloud();


        Node node0 = factory.createNode();
        node0.setId("node0");
        cloud.addNodes(node0);

        Software soft0 = factory.createSoftware();
        soft0.setName("soft0");
        node0.addSoftwares(soft0);


        factory.persist(factory.createBatch().addElementAndRecheable(cloud));

        MemoryDataStore datastore = (MemoryDataStore) factory.getDatastore();
        for (String key : datastore.getMap().keySet()) {
            System.out.println(key + "->" + datastore.getMap().get(key));

        }

        Cloud cloudLazy = (Cloud) factory.lookup("/");
        System.out.println(cloudLazy);
        System.out.println(cloudLazy.findNodesByID("node0"));
        System.out.println(cloudLazy.getNodes().get(0));

        System.out.println(cloudLazy.findByPath("nodes[node0]/softwares[soft0]"));
        System.out.println(factory.lookup("nodes[node0]/softwares[soft0]"));

        KMFContainerProxy lazyNode = (KMFContainerProxy) cloudLazy.getNodes().get(0);
        System.out.println(lazyNode.getIsResolved());

        System.out.println(cloudLazy.getNodes().get(0).getSoftwares().get(0));

        /*
        KMFContainerProxy cloudLazyProxy = (KMFContainerProxy) cloudLazy;
        System.out.println(cloudLazyProxy.getIsResolved());

        System.out.println(cloudLazy.findByPath("nodes[node0]"));
        System.out.println(cloudLazy.findByPath("nodes[node0]").eContainer());
        System.out.println(cloudLazy.findByPath("nodes[node0]/softwares[soft0]").eContainer());
        System.out.println(cloudLazy.findByPath("nodes[node0]/softwares[soft0]").eContainer().path());

        cloudLazy.visit(new ModelVisitor() {
            @Override
            public void visit(KMFContainer kmfContainer, String s, KMFContainer kmfContainer2) {
                    System.out.println("visit="+kmfContainer);
            }
        }, true, true, true);

          */

                /*
        cloudLazy.getNodes();

        Node node0lazy = cloudLazy.findNodesByID("node0");

        System.out.println("node0->" + ((KMFContainerProxy) node0lazy).getIsResolved());
        System.out.println("/->" + cloudLazyProxy.getIsResolved());
        */

        //System.out.println("/->" + cloudLazyProxy.getIsResolved());

    }

}
