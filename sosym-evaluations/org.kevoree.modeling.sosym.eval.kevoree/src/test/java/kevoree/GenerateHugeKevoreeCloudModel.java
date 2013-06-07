package kevoree;

import kmf.kevoree.*;
import kmf.kevoree.impl.DefaultKevoreeFactory;
import kmf.kevoree.loader.ModelLoader;
import kmf.kevoree.loader.XMIModelLoader;
import kmf.kevoree.serializer.XMIModelSerializer;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 07/06/13
 * Time: 22:01
 */
public class GenerateHugeKevoreeCloudModel {

    public static void main(String[] args) throws IOException {


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
        for (int i = 0; i < 100; i++) {
            ContainerNode node = factory.createContainerNode();
            node.setName("ARMINode_" + i);
            //node.setTypeDefinition(rootModel.findTypeDefinitionsByID("ARMInfraNode"));
            rootModel.addNodes(node);

            System.out.println(node.path());

               /*
            for (int i2 = 0; i2 < 100; i2++) {
                ContainerNode nodesub = factory.createContainerNode();
                nodesub.setName("SubARMINode_" + i2);
                nodesub.setTypeDefinition(rootModel.findTypeDefinitionsByID("ARMInfraNode"));
                node.addHosts(nodesub);
                rootModel.addNodes(nodesub);
            }   */

        }

        //Fill Customer FullPowerNode
        /*
        for (int i = 0; i < 10000; i++) {
            ContainerNode node = factory.createContainerNode();
            node.setName("XeonINode_" + i);
            node.setTypeDefinition(rootModel.findTypeDefinitionsByID("XeonInfraNode"));
            rootModel.addNodes(node);
        }
          */

        XMIModelSerializer saver = new XMIModelSerializer();
        File out = File.createTempFile("99888888", "888888888");
        saver.serialize(rootModel, new FileOutputStream(out));




        System.out.println(out.getAbsolutePath());

    }


}
