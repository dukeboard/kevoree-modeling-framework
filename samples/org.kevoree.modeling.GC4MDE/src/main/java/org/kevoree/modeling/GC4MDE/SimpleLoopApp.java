package org.kevoree.modeling.GC4MDE;

import org.kermeta.language.loader.ModelLoader;
import org.kermeta.language.loader.XMIModelLoader;
import org.kermeta.language.serializer.JSONModelSerializer;
import org.kermeta.language.serializer.ModelSerializer;
import org.kermeta.language.structure.Metamodel;

import java.util.List;
import java.util.Scanner;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 15/04/13
 * Time: 11:00
 */
public class SimpleLoopApp {

    public int nbModel = 1000;

    public static void main(String[] args) {
        SimpleLoopApp app = new SimpleLoopApp();
        app.test();
    }

    public void test() {
        System.out.println("Load and lost "+nbModel+" Kermeta Model");
        ModelLoader loader = new XMIModelLoader();
        String content = buildTestRes();

        long before = System.currentTimeMillis();
        for (int i = 0; i < nbModel; i++) {
            List<Metamodel> models = loader.loadModelFromString(content);
            if (i % 100 == 0) {
                System.out.println("i=" + i);
            }
            cleanupModel(models);
        }

        long after = System.currentTimeMillis();
        System.out.println("Time spent : " + (after - before) + " ms ");
        System.out.println("Time spent per model (avg) : " + ((after - before) / nbModel) + " ms ");
        //ModelSerializer saver = new JSONModelSerializer();
        //saver.serialize(loader.loadModelFromStream(SimpleLoopApp.class.getClassLoader().getResourceAsStream("test_hello_beforeCheckingforScopeRESOLVED.km")).get(0), System.out);
    }

    public void cleanupModel(List<Metamodel> models) {
        //NOOP
    }

    public String buildTestRes(){
        return new Scanner(SimpleLoopApp.class.getClassLoader().getResourceAsStream("kompren_beforeCheckingforScopeRESOLVED.km"),"UTF-8").useDelimiter("\\A").next();
    }

}
