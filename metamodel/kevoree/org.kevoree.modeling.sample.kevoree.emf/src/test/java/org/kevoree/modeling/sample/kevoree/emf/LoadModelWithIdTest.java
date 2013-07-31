package org.kevoree.modeling.sample.kevoree.emf;/*
* Author : Gregory Nain (developer.name@uni.lu)
* Date : 31/07/13
*/

import emf.kevoree.KevoreePackage;
import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;
import org.eclipse.emf.ecore.xmi.XMLResource;
import org.eclipse.emf.ecore.xmi.impl.XMIResourceFactoryImpl;

import java.io.File;

import static org.junit.Assert.assertTrue;

public class LoadModelWithIdTest {


    public static void main(String[] args) {
        try {
            File localModel = new File(LoadModelWithIdTest.class.getClassLoader().getResource("bootstrapModel0.kev").toURI());
            URI fileURI = URI.createFileURI(localModel.getAbsolutePath());
            ResourceSet resourceSet = new ResourceSetImpl();
            resourceSet.getResourceFactoryRegistry().getExtensionToFactoryMap().put(Resource.Factory.Registry.DEFAULT_EXTENSION, new XMIResourceFactoryImpl());
            resourceSet.getPackageRegistry().put(KevoreePackage.eNS_URI,KevoreePackage.eINSTANCE);
            resourceSet.getLoadOptions().put(XMLResource.OPTION_RECORD_UNKNOWN_FEATURE, Boolean.TRUE);

            Resource resource2 = resourceSet.createResource(fileURI);

            assertTrue("Resource is null. Model URI:" + fileURI.toString(), resource2 != null);
            resource2.load(resourceSet.getLoadOptions());
            //EcoreUtil.resolveAll(resource2);
            assertTrue("Contents is null or void " + resource2.getContents().toString(), resource2.getContents() != null && resource2.getContents().size() != 0);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}
