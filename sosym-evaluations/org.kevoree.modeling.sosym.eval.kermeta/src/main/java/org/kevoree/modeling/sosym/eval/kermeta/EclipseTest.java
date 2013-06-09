package org.kevoree.modeling.sosym.eval.kermeta;

import emf.org.kermeta.language.structure.Metamodel;
import org.eclipse.emf.common.util.TreeIterator;
import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;
import org.eclipse.emf.ecore.util.EcoreUtil;
import org.eclipse.emf.ecore.xmi.impl.XMIResourceFactoryImpl;

import java.io.File;
import java.io.IOException;
import java.util.Collections;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 07/06/13
 * Time: 11:03
 */
public class EclipseTest {

    public void doTest() throws IOException, InterruptedException {
        File tempFile = File.createTempFile("tempKMFBench", "xmi");
        FileHelper.copyFile(this.getClass().getClassLoader().getResourceAsStream("Kompren.km"), tempFile);
        Metamodel model = doLoad(URI.createFileURI(tempFile.getAbsolutePath()));
        Metamodel model2 = doClone(model);
        File tempFile2 = File.createTempFile("tempKMFBenchSaved", "xmi");
        doSave(model2, URI.createFileURI(tempFile2.getAbsolutePath()));

        System.out.println("Hello");
        Thread.sleep(20000);


    }


    public Metamodel doLoad(URI fileURI) {
        ResourceSet resourceSet = new ResourceSetImpl();
        resourceSet.getResourceFactoryRegistry().getExtensionToFactoryMap().put(Resource.Factory.Registry.DEFAULT_EXTENSION, new XMIResourceFactoryImpl());
        resourceSet.getPackageRegistry().put(emf.org.kermeta.language.structure.StructurePackage.eNS_URI, emf.org.kermeta.language.structure.StructurePackage.eINSTANCE);
        resourceSet.getPackageRegistry().put(emf.org.kermeta.language.behavior.BehaviorPackage.eNS_URI, emf.org.kermeta.language.behavior.BehaviorPackage.eINSTANCE);
        long beforeLoad = System.nanoTime();
        Resource resource = resourceSet.getResource(fileURI, true);
        EObject myModelObject = resource.getContents().get(0);

        //EcoreUtil.resolveAll(myModelObject);

        double loadTime = (System.nanoTime() - beforeLoad);// / Math.pow(10,6);
        String lt = "" + loadTime / Math.pow(10, 6);
        System.out.println("Load time: " + lt + " ms");
        return (Metamodel) myModelObject;
    }

    public void doSave(EObject model, URI fileURI) {
        Resource resource = new XMIResourceFactoryImpl().createResource(fileURI);
        resource.getContents().add(model);
        long marshalingStart;
        long marshalingEnd;
        marshalingStart = System.nanoTime();
        try {
            resource.save(Collections.EMPTY_MAP);
        } catch (IOException e) {
            e.printStackTrace();
        }
        marshalingEnd = System.nanoTime();
        String mt = (marshalingEnd - marshalingStart) / Math.pow(10, 6) + "";
        System.out.println("Marshaling time: " + mt + " ms");
        System.out.println(fileURI.path());
    }

    public Metamodel doClone(Metamodel model) {
        long beforeClone = System.nanoTime();
        EObject cloned = EcoreUtil.copy(model);
        double cloneTime = (System.nanoTime() - beforeClone);
        String ct2 = "" + cloneTime / Math.pow(10, 6);
        System.out.println("Clone time: " + ct2 + " ms");
        return (Metamodel) cloned;
    }


    public static void main(String[] args) throws InterruptedException, IOException {
        EclipseTest m = new EclipseTest();
        m.doTest(); //warm up
    }

}
