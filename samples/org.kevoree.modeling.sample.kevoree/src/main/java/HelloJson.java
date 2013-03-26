import org.kevoree.ContainerRoot;
import org.kevoree.loader.ModelLoader;
import org.kevoree.serializer.ModelJSONSerializer;
import org.kevoree.serializer.ModelSerializer;

import java.io.File;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 25/03/13
 * Time: 19:44
 */
public class HelloJson {

    public static void main(String[] args){
        System.out.println("HelloJSON");

        ModelLoader loader = new ModelLoader();
        ContainerRoot model = loader.loadModelFromPath(new File("/Users/duke/Documents/dev/dukeboard/kevoree-modeling-framework/samples/org.kevoree.modeling.sample.kevoree/src/resources/bootKloudNode1.kev")).get(0);

        System.out.println("ModelLoaded");

       // ModelSerializer saver = new ModelSerializer();
       // saver.serialize(model,System.out);

        ModelJSONSerializer saver2 = new ModelJSONSerializer();
        saver2.serialize(model,System.out);


    }


}
