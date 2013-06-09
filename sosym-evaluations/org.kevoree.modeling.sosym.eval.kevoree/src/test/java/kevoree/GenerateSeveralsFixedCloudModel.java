package kevoree;

import kmf.kevoree.*;
import kmf.kevoree.cloner.ModelCloner;
import kmf.kevoree.impl.DefaultKevoreeFactory;
import kmf.kevoree.loader.ModelLoader;
import kmf.kevoree.loader.XMIModelLoader;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 07/06/13
 * Time: 22:01
 */
public class GenerateSeveralsFixedCloudModel {

    public ContainerRoot createModelTest(int nodeLimit) throws IOException {

        KevoreeFactory factory = new DefaultKevoreeFactory();
        ModelLoader loader = new XMIModelLoader();
        ContainerRoot rootModel = (ContainerRoot) loader.loadModelFromStream(GenerateSeveralsFixedCloudModel.class.getClassLoader().getResourceAsStream("CloudModel2.kev")).get(0);
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
                nodesub.setName("SubARMINode_" + i2 + "-" + i);
                nodesub.setTypeDefinition(rootModel.findTypeDefinitionsByID("ARMInfraNode"));
                node.addHosts(nodesub);
                rootModel.addNodes(nodesub);
            }

            /* Fix percent */
            if (i < nodeLimit) {
                node.setRecursiveReadOnly();
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
                nodesub.setName("SubARMINode2_" + i2 + "-" + i);
                nodesub.setTypeDefinition(rootModel.findTypeDefinitionsByID("ARMInfraNode"));
                node.addHosts(nodesub);
                rootModel.addNodes(nodesub);
            }

            /* Fix percent */
            if (i < nodeLimit) {
                node.setRecursiveReadOnly();
            }
        }
        return rootModel;
    }


    public static void main(String[] args) throws IOException {

        ModelCloner cloner = new ModelCloner();

        GenerateSeveralsFixedCloudModel generator = new GenerateSeveralsFixedCloudModel();
        List<Integer> percents = Arrays.asList(0,200, 400, 600, 800, 999);
        for (Integer p : percents) {
            File out = new File("Cloud_Fixed_" + p + ".kev");
            ContainerRoot model = generator.createModelTest(p);
            long before = System.currentTimeMillis();
            for(int i=0;i<100;i++){
                ContainerRoot cloned = cloner.cloneMutableOnly(model,false);
            }
            long after = System.currentTimeMillis();
            System.out.println(p+";"+(after-before)/100);
        }
    }


}
