package org.kevoree.modeling.sosym.eval.thingml;


import kmf.thingml.ThingMLModel;
import kmf.thingml.cloner.ModelCloner;
import kmf.thingml.container.KMFContainer;
import kmf.thingml.loader.XMIModelLoader;
import kmf.thingml.serializer.ModelSerializer;
import kmf.thingml.serializer.XMIModelSerializer;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 07/06/13
 * Time: 11:06
 */
public class KMFKotlinTest {

    private ModelCloner cloner = new ModelCloner();
    private XMIModelLoader loader = new XMIModelLoader();

    public ThingMLModel warmup(File file) throws IOException {

        ThingMLModel model = null;
        for (int i = 0; i < 500; i++) {
            model = doLoad(file);
        }
        ThingMLModel model2 = null;
        for (int i = 0; i < 1000; i++) {
            model2 = doClone(model);
        }

        for (int i = 0; i < 10; i++) {
            model2 = doClone(model);
            doLookup(model, model2);
        }
        for (int i = 0; i < 100; i++) {
            File tempFile2 = File.createTempFile("tempKMFBenchSaved" + new Random().nextInt(), "xmi");
            FileOutputStream outS = new FileOutputStream(tempFile2);
            doSave(model2, outS);
        }
        return model;
    }

    private Double lastCloneTime = 0d;
    private Double lastSaveTime = 0d;
    private Double lastLoadTime = 0d;
    private Double lastLookupTime = 0d;

    public void doTest(String file) throws IOException, InterruptedException {

        File tempFile = File.createTempFile("tempKMFBench", "xmi");
        FileHelper.copyFile(this.getClass().getClassLoader().getResourceAsStream(file), tempFile);
        ThingMLModel model = warmup(tempFile);
        ThingMLModel model2 = null;

        int nbElems = 0;
        for (Object o : model.containedAllElements()) {
            nbElems++;
        }

        System.out.println("=====" + file + "/nb:" + nbElems);

        Double fullLoadTime = 0d;
        for (int i = 0; i < 10; i++) {
            model2 = doLoad(tempFile);
            fullLoadTime = fullLoadTime + lastLoadTime;
        }
        System.out.println("Load time : " + (fullLoadTime / 10) + ",full=" + fullLoadTime);

        Double fullCloneTime = 0d;
        for (int i = 0; i < 100; i++) {
            model2 = doClone(model);
            fullCloneTime = fullCloneTime + lastCloneTime;
        }
        System.out.println("Clone time : " + (fullCloneTime / 100) + ",full=" + fullCloneTime);

        model2 = doClone(model);
        doLookup(model, model2);
        System.out.println("Lookup time : " + (lastLookupTime / 1));

        Double fullSaveTime = 0d;
        for (int i = 0; i < 10; i++) {
            File tempFile2 = File.createTempFile("tempKMFBenchSaved" + new Random().nextInt(), "xmi");
            FileOutputStream outS = new FileOutputStream(tempFile2);
            doSave(model, outS);
            fullSaveTime = fullSaveTime + lastSaveTime;
        }
        System.out.println("Save time : " + (fullSaveTime / 10) + ",full=" + fullSaveTime);
    }

    public ThingMLModel doClone(ThingMLModel model) {
        long cloneStart = System.nanoTime();
        ThingMLModel clonedModel = cloner.clone(model);
        long cloneEnd = System.nanoTime();
        lastCloneTime = (cloneEnd - cloneStart) / Math.pow(10, 6);
        return clonedModel;
    }

    public ThingMLModel doLoad(File modelFile) {
        long beforeLoad = System.nanoTime();
        ThingMLModel loaded = (ThingMLModel) loader.loadModelFromPath(modelFile).get(0);
        lastLoadTime = (System.nanoTime() - beforeLoad) / Math.pow(10, 6);
        return loaded;
    }

    public void doSave(ThingMLModel model, OutputStream out) {
        ModelSerializer sav = new XMIModelSerializer();
        long marshalingStart = 0, marshalingEnd = 0;
        try {
            marshalingStart = System.nanoTime();
            sav.serialize(model, out);
            marshalingEnd = System.nanoTime();
        } catch (Exception e) {
            e.printStackTrace();
        }
        lastSaveTime = (marshalingEnd - marshalingStart) / Math.pow(10, 6);
    }

    int path = 0;
    int noPath = 0;

    public void doLookup(KMFContainer model, KMFContainer cloned) {
        double begin = System.nanoTime();
        for (KMFContainer modelElem : model.containedAllElements()) {
            String elementPth = modelElem.path();
            if (elementPth != null && elementPth != "") {
                path++;
                cloned.findByPath(elementPth);
            } else {
                noPath++;
                for (KMFContainer clonedElem : cloned.containedAllElements()) {
                    if (modelElem.modelEquals(clonedElem)) {
                        break;
                    }
                }
            }
        }
        lastLookupTime = (System.nanoTime() - begin) / Math.pow(10, 6);
    }

    public static void main(String[] args) throws InterruptedException, IOException {
        KMFKotlinTest m = new KMFKotlinTest();

        List<String> files = Arrays.asList("bCMS.xmi", "dcrm.xmi", "flood.xmi","helloworld.xmi"/*,"LightFollower.xmi"*/);
        for (String f : files) {
            m.doTest(f);
        }
    }


}
