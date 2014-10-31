package kevoree;

import kmf.kevoree.container.KMFContainer;
import org.eclipse.emf.common.util.TreeIterator;
import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;
import org.eclipse.emf.ecore.util.EcoreUtil;
import org.eclipse.emf.ecore.xmi.impl.XMIResourceFactoryImpl;
import org.junit.Test;

import java.io.*;
import java.net.URISyntaxException;
import java.util.Collections;
import java.util.Map;

import static org.junit.Assert.assertTrue;

public class KevoreeCloudModelTest {

    private Object kmfModel = null;
    private EObject emfModel = null;
    private Object kmfModelClone = null;
    private EObject emfModelClone = null;

    private String model = "CloudModel2.kev";


    public void setUp() {
        try {

            File localModel = GenerateHugeKevoreeCloudModel.createHugeTest();
            model = localModel.getAbsolutePath();
            /*
            File localModel = new File(getClass().getClassLoader().getResource(model).toURI());
            */

            kmf.kevoree.loader.ModelLoader loader = new kmf.kevoree.loader.XMIModelLoader();
            kmfModel = loader.loadModelFromPath(localModel).get(0);
            URI fileURI = URI.createFileURI(localModel.getAbsolutePath());
            ResourceSet resourceSet = new ResourceSetImpl();
            resourceSet.getResourceFactoryRegistry().getExtensionToFactoryMap().put(Resource.Factory.Registry.DEFAULT_EXTENSION, new XMIResourceFactoryImpl());

            resourceSet.getPackageRegistry().put(emf.kevoree.KevoreePackage.eNS_URI, emf.kevoree.KevoreePackage.eINSTANCE);
            Resource resource2 = resourceSet.createResource(fileURI);
            assertTrue("Resource is null. Model URI:" + fileURI.toString(), resource2 != null);
            resource2.load(null);
            //EcoreUtil.resolveAll(resource2);
            assertTrue("Contents is null or void " + resource2.getContents().toString(), resource2.getContents() != null && resource2.getContents().size() != 0);
            emfModel = resource2.getContents().get(0);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public void timeKMFLoadCloudModel(int reps) {
        try {
            File localModel = new File(model);
            kmf.kevoree.loader.ModelLoader loader = new kmf.kevoree.loader.XMIModelLoader();
            for (int i = 0; i < reps; i++) {
                kmfModel = loader.loadModelFromPath(localModel).get(0);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public void timeEMFLoadCloudModel(int reps) {
        try {
            File localModel = new File(model);
            URI fileURI = URI.createFileURI(localModel.getAbsolutePath());
            for (int i = 0; i < reps; i++) {
                ResourceSet resourceSet = new ResourceSetImpl();
                resourceSet.getResourceFactoryRegistry().getExtensionToFactoryMap().put(Resource.Factory.Registry.DEFAULT_EXTENSION, new XMIResourceFactoryImpl());
                Resource resource2 = resourceSet.createResource(fileURI);
                assertTrue("Resource is null. Model URI:" + fileURI.toString(), resource2 != null);
                resource2.load(null);
//EcoreUtil.resolveAll(resource2);
                assertTrue("Contents is null or void " + resource2.getContents().toString(), resource2.getContents() != null && resource2.getContents().size() != 0);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public void timeKMFSaveCloudModel(int reps) {
        try {
            kmf.kevoree.serializer.ModelSerializer serializer = new kmf.kevoree.serializer.XMIModelSerializer();
            for (int i = 0; i < reps; i++) {
                File tempFile = File.createTempFile("Kevoree_CloudModel_" + System.currentTimeMillis(), ".tmp");
//System.out.println(tempFile.getAbsolutePath());
                tempFile.deleteOnExit();
                FileOutputStream fos = new FileOutputStream(tempFile);
                serializer.serialize(kmfModel, fos);
                fos.flush();
                fos.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    public void timeEMFSaveCloudModel(int reps) {
        try {
            Resource.Factory.Registry reg = Resource.Factory.Registry.INSTANCE;
            Map<String, Object> m = reg.getExtensionToFactoryMap();
            m.put("xmi", new XMIResourceFactoryImpl());
            for (int i = 0; i < reps; i++) {
                File tempFile = File.createTempFile("Kevoree_CloudModel_" + System.currentTimeMillis(), ".xmi");
//System.out.println(tempFile.getAbsolutePath());
                tempFile.deleteOnExit();
                URI fileURI = URI.createFileURI(tempFile.getAbsolutePath());
                ResourceSet resourceSet = new ResourceSetImpl();
                Resource resource2 = resourceSet.createResource(fileURI);
                resource2.getContents().add(emfModel);
                resource2.save(Collections.EMPTY_MAP);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    public void timeKMFCloneCloudModel(int reps) {
        for (int i = 0; i < reps; i++) {
            kmf.kevoree.cloner.ModelCloner cloner = new kmf.kevoree.cloner.ModelCloner();
            kmfModelClone = cloner.clone(kmfModel);
        }
    }


    public void timeEMFCloneCloudModel(int reps) {
        for (int i = 0; i < reps; i++) {
            emfModelClone = EcoreUtil.copy(emfModel);
        }
    }


    int path = 0;
    int noPath = 0;

    public void timeKMFLookupCloudModel(int reps) {
        for (int i = 0; i < reps; i++) {
            kmf.kevoree.container.KMFContainer model = (kmf.kevoree.container.KMFContainer) kmfModel;
            kmf.kevoree.container.KMFContainer modelCloned = (kmf.kevoree.container.KMFContainer) kmfModelClone;
            for (KMFContainer modelElem : model.containedAllElements()) {
                String elementPth = modelElem.path();
                if (elementPth != null && elementPth != "") {
                    path++;
                    modelCloned.findByPath(elementPth);
                } else {
                    noPath++;
                    for (KMFContainer clonedElem : modelCloned.containedAllElements()) {
                        if (modelElem.modelEquals(clonedElem)) {
                            break;
                        }
                    }
                }

            }
        }
    }


    int epath = 0;
    public void timeEMFLookupCloudModel(int reps) {
        EcoreUtil.EqualityHelper helper = new EcoreUtil.EqualityHelper();
        for (int i = 0; i < reps; i++) {
            TreeIterator m1It = emfModel.eAllContents();
            while (m1It.hasNext()) {
                epath++;
                EObject modelElem1 = (EObject) m1It.next();
                TreeIterator m2It = emfModelClone.eAllContents();
                while (m2It.hasNext()) {
                    EObject modelElem2 = (EObject) m2It.next();
                    if (helper.equals(modelElem1, modelElem2)) {
                        break;
                    }
                }
            }
        }
    }


    @Test
    public void launcherOfTest() {
        KevoreeCloudModelTest test = new KevoreeCloudModelTest();
        System.out.println("Setting up the test...");
        test.setUp();
        System.out.println("Done.");
        System.out.println("Loading in EMF...");
        long loadEmfStart = System.nanoTime();
        test.timeEMFLoadCloudModel(1);
        long loadEmfStop = System.nanoTime();
        System.out.println("Done.");
        System.out.println("Loading in KMF...");
        long loadKmfStart = System.nanoTime();
        test.timeKMFLoadCloudModel(1);
        long loadKmfStop = System.nanoTime();
        System.out.println("Done.");
        System.out.println("Saving in EMF...");
        long saveEmfStart = System.nanoTime();
        test.timeEMFSaveCloudModel(1);
        long saveEmfStop = System.nanoTime();
        System.out.println("Done.");
        System.out.println("Saving in KMF...");
        long saveKmfStart = System.nanoTime();
        test.timeKMFSaveCloudModel(1);
        long saveKmfStop = System.nanoTime();
        System.out.println("Done.");
        System.out.println("Cloning in EMF...");
        long cloneEmfStart = System.nanoTime();
        test.timeEMFCloneCloudModel(1);
        long cloneEmfStop = System.nanoTime();
        System.out.println("Done.");
        System.out.println("Cloning in KMF...");
        long cloneKmfStart = System.nanoTime();
        test.timeKMFCloneCloudModel(1);
        long cloneKmfStop = System.nanoTime();
        System.out.println("Done.");

/*
System.out.println("Building KMFLists ...");
test.buildKmfContainementList((kmf.kevoree.container.KMFContainer)test.kmfModel, false);
test.buildKmfContainementList((kmf.kevoree.container.KMFContainer) test.kmfModelClone, true);
System.out.println("Done.");
*/

        System.out.println("Lookup in EMF...");
        long lookupEmfStart = System.nanoTime();
        test.timeEMFLookupCloudModel(1);
        long lookupEmfStop = System.nanoTime();
        System.out.println("Done.");
        System.out.println("Lookup in KMF...");
        long lookupKmfStart = System.nanoTime();
        test.timeKMFLookupCloudModel(1);
        long lookupKmfStop = System.nanoTime();
//System.out.println("Path:"+ test.path + " NoPath:" + test.noPath + " Done.");

        TreeIterator modelIterator = test.emfModel.eAllContents();
        int countCloudModel = 0;
        while (modelIterator.hasNext()) {
            countCloudModel++;
            modelIterator.next();
        }

        PrintWriter pr = null;
        try {

            File results = new File("../org.kevoree.modeling.sosym.eval.root/SosymTestResults.csv");
            System.out.println("Printing results in:" + results.getAbsolutePath());

            if (!results.exists()) {
                pr = new PrintWriter(results);
                pr.println("model;Loading(ms);Cloning(ms);Lookup(ms);Saving(ms);with path; without path");
            } else {
                pr = new PrintWriter(new BufferedWriter(new FileWriter(results, true)));
            }

            System.out.println("path="+test.path+"/"+test.noPath+"/"+test.epath);

            pr.print("Kevoree:CloudModel (EMF) " + countCloudModel + " elements, " + ((test.path * 100) / countCloudModel) + "% with path;");
            pr.print(Math.round((loadEmfStop - loadEmfStart) / Math.pow(10, 6)) + ";");
            pr.print(Math.round((cloneEmfStop - cloneEmfStart) / Math.pow(10, 6)) + ";");
            pr.print(Math.round((lookupEmfStop - lookupEmfStart) / Math.pow(10, 6)) + ";");
            pr.print(Math.round((saveEmfStop - saveEmfStart) / Math.pow(10, 6)) + ";");
            pr.print("NN;");
            pr.print("NN");
            pr.println();
            pr.print("Kevoree:CloudModel (KMF) " + countCloudModel + " elements, " + ((test.path * 100) / countCloudModel) + "% with path;");

            pr.print(Math.round((loadKmfStop - loadKmfStart) / Math.pow(10, 6)) + ";");
            pr.print(Math.round((cloneKmfStop - cloneKmfStart) / Math.pow(10, 6)) + ";");
            pr.print(Math.round((lookupKmfStop - lookupKmfStart) / Math.pow(10, 6)) + ";");
            pr.print(Math.round((saveKmfStop - saveKmfStart) / Math.pow(10, 6)) + ";");
            pr.print(test.path + ";");
            pr.print(test.noPath + "");
            pr.println();

        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        } finally {
            if (pr != null) {
                pr.flush();
                pr.close();
            }
        }

    }
}
