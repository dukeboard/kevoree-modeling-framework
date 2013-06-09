package org.kevoree.modeling.sosym.eval.kermeta;

import kmf.org.kermeta.language.cloner.ModelCloner;
import kmf.org.kermeta.language.loader.XMIModelLoader;
import kmf.org.kermeta.language.serializer.ModelSerializer;
import kmf.org.kermeta.language.serializer.XMIModelSerializer;
import kmf.org.kermeta.language.structure.Metamodel;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 07/06/13
 * Time: 11:06
 */
public class KMFKotlinTest {

    private ModelCloner cloner = new ModelCloner();
    private XMIModelLoader loader = new XMIModelLoader();

    public void doTest() throws IOException, InterruptedException {
        File tempFile = File.createTempFile("tempKMFBench", "xmi");
        FileHelper.copyFile(this.getClass().getClassLoader().getResourceAsStream("Kompren.km"), tempFile);

        Metamodel model = doLoad(tempFile);
        //Metamodel model2 = doClone(model);
        File tempFile2 = File.createTempFile("tempKMFBenchSaved", "xmi");
        doSave(model, tempFile2);

        System.out.println("Hello");
        Thread.sleep(20000);


    }

    public Metamodel doClone(Metamodel model) {
        long cloneStart = System.nanoTime();
        Metamodel clonedModel = cloner.clone(model);
        long cloneEnd = System.nanoTime();
        String clonet = (cloneEnd - cloneStart) / Math.pow(10, 6) + "";
        System.out.println("Cloning time: " + clonet + " ms");
        return clonedModel;
    }

    public Metamodel doLoad(File modelFile) {
        long beforeLoad = System.nanoTime();
        Metamodel loaded = (Metamodel) loader.loadModelFromPath(modelFile).get(0);
        double loadTime = (System.nanoTime() - beforeLoad);
        String lt = "" + loadTime / Math.pow(10, 6);
        System.out.println("Load time: " + lt + " ms");
        return loaded;
    }

    public void doSave(Metamodel model, File modelFile) {
        ModelSerializer sav = new XMIModelSerializer();
        long marshalingStart = 0, marshalingEnd = 0;
        try {
            FileOutputStream os = new FileOutputStream(modelFile);
            marshalingStart = System.nanoTime();
            sav.serialize(model, os);
            marshalingEnd = System.nanoTime();
        } catch (Exception e) {
            e.printStackTrace();
        }
        String mt = (marshalingEnd - marshalingStart) / Math.pow(10, 6) + "";
        System.out.println("Marshaling time: " + mt + " ms");
        System.out.println(modelFile.getAbsolutePath());
    }

    public static void main(String[] args) throws InterruptedException, IOException {
        KMFKotlinTest m = new KMFKotlinTest();
        m.doTest();

    }


}
