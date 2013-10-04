package org.kevoree.modeling.tests;

import org.kevoree.Operation;
import org.kevoree.loader.XMIModelLoader;
import org.kevoree.modeling.api.KMFContainer;
import org.kevoree.serializer.JSONModelSerializer;

import java.io.FileInputStream;
import java.io.FileNotFoundException;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 01/09/13
 * Time: 13:35
 */
public class JSONSaverTest {

    @org.junit.Test
    public void test() throws FileNotFoundException {
        XMIModelLoader loader = new XMIModelLoader();
        KMFContainer model = loader.loadModelFromStream(this.getClass().getClassLoader().getResourceAsStream("complexModel.kev")).get(0);

        JSONModelSerializer saver = new JSONModelSerializer();
        saver.serializeToStream(model, System.out);

        KMFContainer typeDef = model.findByID("typeDefinitions", "org.kevoree.library.javase.fileSystem.api.FileService");
        Operation ope = (Operation) typeDef.findByID("operations","getFileContent");

        System.out.println("ope"+ope);
        System.out.println(ope.getReturnType().getName());

    }

}
