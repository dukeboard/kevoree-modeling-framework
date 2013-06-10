package org.kevoree.modeling.sosym.eval.kermeta;

import emf.org.kermeta.language.structure.Metamodel;
import org.eclipse.emf.common.util.TreeIterator;
import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;
import org.eclipse.emf.ecore.util.EcoreUtil;
import org.eclipse.emf.ecore.xmi.XMLResource;
import org.eclipse.emf.ecore.xmi.impl.XMIResourceFactoryImpl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Random;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 07/06/13
 * Time: 11:03
 */
public class EclipseTest {

    public Metamodel warmup(File f) throws IOException { //JIT optimization and cache clean

        Metamodel model = null;
        for (int i = 0; i < 50; i++) {
            model = doLoad(URI.createFileURI(f.getAbsolutePath()));
        }
        Metamodel model2 = null;
        for (int i = 0; i < 100; i++) {
            model2 = doClone(model);
        }
        /*
        for(int i=0;i<10;i++){
            File tempFile2 = File.createTempFile("tempKMFBenchSaved", "xmi");
            FileOutputStream outS = new FileOutputStream(tempFile2);
            model2 = doClone(model);
            doSave(model2, outS);
            outS.close();
        }   */
        return model;
    }

    private Double lastCloneTime = 0d;
    private Double lastSaveTime = 0d;
    private Double lastLoadTime = 0d;
    private Double lastLookupTime = 0d;

    public void doTest(String file) throws IOException, InterruptedException {

        File tempFile = File.createTempFile("tempKMFBench", "xmi");
        FileHelper.copyFile(this.getClass().getClassLoader().getResourceAsStream(file), tempFile);

        Metamodel model = warmup(tempFile);

        int nbElems = 0;
        TreeIterator it = model.eAllContents();
        while (it.hasNext()) {
            nbElems++;
            it.next();
        }
        System.out.println("=====" + file + "/nb:" + nbElems);
        Double fullLoadTime = 0d;
        for (int i = 0; i < 10; i++) {
            model = doLoad(URI.createFileURI(tempFile.getAbsolutePath()));
            fullLoadTime = fullLoadTime + lastLoadTime;
        }
        System.out.println("Load time : " + (fullLoadTime / 10)+", full:"+fullLoadTime);


        Metamodel model2 = null;
        Double fullCloneTime = 0d;
        for (int i = 0; i < 100; i++) {
            model2 = doClone(model);
            fullCloneTime = fullCloneTime + lastCloneTime;
        }
        System.out.println("Clone time : " + (fullCloneTime / 100)+",full="+fullCloneTime);

        model2 = doClone(model);
        doLookup(model, model2);
        System.out.println("Lookup time : " + (lastLookupTime / 1));

        Double fullSaveTime = 0d;
        for(int i=0;i<10;i++){
            File tempFile2 = File.createTempFile("tempKMFBenchSaved"+new Random().nextInt(), "xmi");
            FileOutputStream outS = new FileOutputStream(tempFile2);
            model2 = doClone(model);
            doSave(model2, outS);
            outS.close();
            fullSaveTime = fullSaveTime + lastSaveTime;
        }
        System.out.println("Save time : " + (fullSaveTime / 10)+",full="+fullSaveTime);
    }


    public Metamodel doLoad(URI fileURI) {
        ResourceSet resourceSet = new ResourceSetImpl();
        resourceSet.getLoadOptions().put(XMLResource.OPTION_DISABLE_NOTIFY, true);
        resourceSet.getResourceFactoryRegistry().getExtensionToFactoryMap().put(Resource.Factory.Registry.DEFAULT_EXTENSION, new XMIResourceFactoryImpl());
        resourceSet.getPackageRegistry().put(emf.org.kermeta.language.structure.StructurePackage.eNS_URI, emf.org.kermeta.language.structure.StructurePackage.eINSTANCE);
        resourceSet.getPackageRegistry().put(emf.org.kermeta.language.behavior.BehaviorPackage.eNS_URI, emf.org.kermeta.language.behavior.BehaviorPackage.eINSTANCE);
        long beforeLoad = System.nanoTime();
        Resource resource = resourceSet.getResource(fileURI, true);
        EObject myModelObject = resource.getContents().get(0);
        double loadTime = (System.nanoTime() - beforeLoad);// / Math.pow(10,6);
        lastLoadTime = loadTime / Math.pow(10, 6);
        return (Metamodel) myModelObject;
    }

    public void doSave(EObject model, OutputStream out) {
        ResourceSet resourceSet = new ResourceSetImpl();
        resourceSet.getLoadOptions().put(XMLResource.OPTION_SAVE_ONLY_IF_CHANGED, XMLResource.OPTION_SAVE_ONLY_IF_CHANGED_FILE_BUFFER);
        resourceSet.getResourceFactoryRegistry().getExtensionToFactoryMap().put(Resource.Factory.Registry.DEFAULT_EXTENSION, new XMIResourceFactoryImpl());
        resourceSet.getPackageRegistry().put(emf.org.kermeta.language.structure.StructurePackage.eNS_URI, emf.org.kermeta.language.structure.StructurePackage.eINSTANCE);
        resourceSet.getPackageRegistry().put(emf.org.kermeta.language.behavior.BehaviorPackage.eNS_URI, emf.org.kermeta.language.behavior.BehaviorPackage.eINSTANCE);
        Resource resource = resourceSet.createResource(URI.createURI("memory://hello" + new Random().nextInt() + ""));
        resource.setModified(true);
        resource.getContents().add(model);
        long marshalingStart;
        long marshalingEnd;
        marshalingStart = System.nanoTime();
        try {
            resource.save(out, Collections.EMPTY_MAP);
        } catch (IOException e) {
            e.printStackTrace();
        }
        resource.unload();
        marshalingEnd = System.nanoTime();
        lastSaveTime = (marshalingEnd - marshalingStart) / Math.pow(10, 6);
    }

    public Metamodel doClone(Metamodel model) {
        long beforeClone = System.nanoTime();
        EObject cloned = EcoreUtil.copy(model);
        double cloneTime = (System.nanoTime() - beforeClone);
        lastCloneTime = cloneTime / Math.pow(10, 6);

        return (Metamodel) cloned;
    }

    public void doLookup(EObject emfModel,EObject emfModelClone) {
        double begin = System.nanoTime();
        EcoreUtil.EqualityHelper helper = new EcoreUtil.EqualityHelper();
        TreeIterator m1It = emfModel.eAllContents();
        while (m1It.hasNext()) {
            EObject modelElem1 = (EObject) m1It.next();
            TreeIterator m2It = emfModelClone.eAllContents();
            while (m2It.hasNext()) {
                EObject modelElem2 = (EObject) m2It.next();
                if (helper.equals(modelElem1, modelElem2)) {
                    break;
                }
            }
        }
        lastLookupTime = (System.nanoTime() - begin) / Math.pow(10, 6);
    }


    public static void main(String[] args) throws InterruptedException, IOException {
        EclipseTest m = new EclipseTest();
        List<String> files = Arrays.asList("Kompren.km", "TestHello.km", "Class2Rdbms.km");
        for (String f : files) {
            m.doTest(f);
        }
    }

}
