package org.kevoree.modeling.GC4MDE;

import org.kermeta.language.loader.ModelLoader;
import org.kermeta.language.loader.XMIModelLoader;
import org.kermeta.language.serializer.JSONModelSerializer;
import org.kermeta.language.serializer.ModelSerializer;
import org.kermeta.language.structure.Metamodel;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 15/04/13
 * Time: 11:00
 */
public class SimpleLoopApp {

    public static final int nbModel = 10;

    public static void main(String[] args) {
        System.out.println("Load and lost 3000 Kermeta Model");
        ModelLoader loader = new XMIModelLoader();
        long before = System.currentTimeMillis();

        for (int i = 0; i < nbModel; i++) {
            List<Metamodel> models = loader.loadModelFromStream(SimpleLoopApp.class.getClassLoader().getResourceAsStream("test_hello_beforeCheckingforScopeRESOLVED.km"));
            if (i % 100 == 0) {
                System.out.println("i=" + i);
            }
        }

        long after = System.currentTimeMillis();

        System.out.println("Time spend : " + (after - before) + " ms ");
        System.out.println("Time spend per model (avg) : " + ((after - before) / nbModel) + " ms ");

        ModelSerializer saver = new JSONModelSerializer();
        saver.serialize(loader.loadModelFromStream(SimpleLoopApp.class.getClassLoader().getResourceAsStream("test_hello_beforeCheckingforScopeRESOLVED.km")).get(0),System.out);
    }

}
