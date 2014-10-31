package kevoree;

import emf.kevoree.*;
import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;
import org.eclipse.emf.ecore.util.EcoreUtil;
import org.eclipse.emf.ecore.xmi.impl.XMIResourceFactoryImpl;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertTrue;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 07/06/13
 * Time: 22:01
 */
public class GenerateCloneCloudModelEMF {

    public ContainerRoot createModelTest(int nodeLimit) throws IOException {

        File tempFile = File.createTempFile("tempKMFBench", "xmi");
        FileHelper.copyFile(this.getClass().getClassLoader().getResourceAsStream("CloudModel2.kev"), tempFile);

        ResourceSet resourceSet = new ResourceSetImpl();
        resourceSet.getResourceFactoryRegistry().getExtensionToFactoryMap().put(Resource.Factory.Registry.DEFAULT_EXTENSION, new XMIResourceFactoryImpl());
        Resource resource2 = resourceSet.createResource(URI.createFileURI(tempFile.getAbsolutePath()));
        resourceSet.getPackageRegistry().put(KevoreePackage.eNS_URI, KevoreePackage.eINSTANCE);

        assertTrue("Resource is null. Model URI:" + tempFile.toString(), resource2 != null);
        resource2.load(null);

        EObject myModelObject = resource2.getContents().get(0);
        ContainerRoot rootModel = (ContainerRoot) myModelObject;


        TypeDefinition ARMInfraNodeTD = null;
        for (Object o : rootModel.getTypeDefinitions()) {
            if (((TypeDefinition) o).getName().equals("ARMInfraNode")) {
                ARMInfraNodeTD = (TypeDefinition) o;
            }
        }
        TypeDefinition XeonInfraNodeTD = null;
        for (Object o : rootModel.getTypeDefinitions()) {
            if (((TypeDefinition) o).getName().equals("XeonInfraNode")) {
                XeonInfraNodeTD = (TypeDefinition) o;
            }
        }

        //Fill Customer LowPowerNode
        for (int i = 0; i < 1000; i++) {
            ContainerNode node = KevoreeFactory.eINSTANCE.createContainerNode();
            node.setName("PNODE_" + i);
            node.setTypeDefinition(ARMInfraNodeTD);
            rootModel.getNodes().add(node);
            for (int i2 = 0; i2 < 10; i2++) {
                ContainerNode nodesub = KevoreeFactory.eINSTANCE.createContainerNode();
                nodesub.setName("SubARMINode_" + i2 + "-" + i);
                nodesub.setTypeDefinition(ARMInfraNodeTD);
                node.getHosts().add(nodesub);
                rootModel.getNodes().add(nodesub);
            }
        }


        //Fill Customer FullPowerNode
        for (int i = 0; i < 1000; i++) {
            ContainerNode node = KevoreeFactory.eINSTANCE.createContainerNode();
            node.setName("PXeonINode_" + i);
            node.setTypeDefinition(XeonInfraNodeTD);
            rootModel.getNodes().add(node);
            for (int i2 = 0; i2 < 10; i2++) {
                ContainerNode nodesub = KevoreeFactory.eINSTANCE.createContainerNode();
                nodesub.setName("SubARMINode2_" + i2 + "-" + i);
                nodesub.setTypeDefinition(XeonInfraNodeTD);
                node.getHosts().add(nodesub);
                rootModel.getNodes().add(nodesub);
            }
        }
        return rootModel;
    }


    public static void main(String[] args) throws IOException {

        GenerateCloneCloudModelEMF generator = new GenerateCloneCloudModelEMF();
        List<Integer> percents = Arrays.asList(0, 200, 400, 600, 800, 999);
        for (Integer p : percents) {
            File out = new File("Cloud_Fixed_" + p + ".kev");
            ContainerRoot model = generator.createModelTest(p);
            long before = System.currentTimeMillis();
            ContainerRoot cloned = null;
            for (int i = 0; i < 100; i++) {
                cloned = EcoreUtil.copy(model);
            }
            long after = System.currentTimeMillis();
            System.out.println(p + ";" + (after - before) / 100);
        }
    }


}
