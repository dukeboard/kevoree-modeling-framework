package kevoree;

import kmf.kevoree.*;
import kmf.kevoree.container.KMFContainer;
import kmf.kevoree.impl.DefaultKevoreeFactory;
import kmf.kevoree.loader.ModelLoader;
import kmf.kevoree.loader.XMIModelLoader;
import kmf.kevoree.serializer.XMIModelSerializer;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 07/06/13
 * Time: 22:01
 */
public class GenerateHugeKevoreeCloudModel {

    public static File createHugeTest() throws IOException {

        KevoreeFactory factory = new DefaultKevoreeFactory();
        ModelLoader loader = new XMIModelLoader();
        ContainerRoot rootModel = (ContainerRoot) loader.loadModelFromStream(GenerateHugeKevoreeCloudModel.class.getClassLoader().getResourceAsStream("CloudModel2.kev")).get(0);
        /* Fix Immutable */
        for (TypeDefinition td : rootModel.getTypeDefinitions()) {
            td.setRecursiveReadOnly();
        }
        for (DeployUnit du : rootModel.getDeployUnits()) {
            du.setRecursiveReadOnly();
        }
        for (Repository r : rootModel.getRepositories()) {
            r.setRecursiveReadOnly();
        }

        //Fill Customer LowPowerNode
        for (int i = 0; i < 1000; i++) {
            ContainerNode node = factory.createContainerNode();
            node.setName("PNODE_" + i);
            node.setTypeDefinition(rootModel.findTypeDefinitionsByID("ARMInfraNode"));
            rootModel.addNodes(node);

            for (int i2 = 0; i2 < 10; i2++) {
                ContainerNode nodesub = factory.createContainerNode();
                nodesub.setName("SubARMINode_" + i2+"-"+i);
                nodesub.setTypeDefinition(rootModel.findTypeDefinitionsByID("ARMInfraNode"));
                node.addHosts(nodesub);
                rootModel.addNodes(nodesub);
            }

        }

        //Fill Customer FullPowerNode

        for (int i = 0; i < 1000; i++) {
            ContainerNode node = factory.createContainerNode();
            node.setName("PXeonINode_" + i);
            node.setTypeDefinition(rootModel.findTypeDefinitionsByID("XeonInfraNode"));
            rootModel.addNodes(node);

            for (int i2 = 0; i2 < 10; i2++) {
                ContainerNode nodesub = factory.createContainerNode();
                nodesub.setName("SubARMINode2_" + i2+"-"+i);
                nodesub.setTypeDefinition(rootModel.findTypeDefinitionsByID("ARMInfraNode"));
                node.addHosts(nodesub);
                rootModel.addNodes(nodesub);
            }
        }


        XMIModelSerializer saver = new XMIModelSerializer();
        File out = File.createTempFile("99888888", "888888888");
        saver.serialize(rootModel, new FileOutputStream(out));


        System.out.println("nodeSize="+rootModel.getNodes().size());
        int i = 0;
        for(KMFContainer c : rootModel.containedAllElements()){
          i++;
        }
        System.out.println("l1_"+i);
        i=0;
        for(KMFContainer c2 : rootModel.containedAllElements()){
            i++;
        }
        System.out.println("l2_"+i);



        return out;
    }


    public static void main(String[] args) throws IOException {
        System.out.println(createHugeTest());
    }


}
