package org.kevoree.modeling.tests;

import org.junit.Test;
import org.kevoree.*;
import org.kevoree.loader.JSONModelLoader;
import org.kevoree.modeling.api.KMFContainer;
import org.kevoree.serializer.JSONModelSerializer;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 06/08/13
 * Time: 19:05
 */
public class JSONTest {

    @Test
    public void test() throws FileNotFoundException {
         System.out.println("Hello");

        JSONModelLoader loader = new JSONModelLoader();
        ContainerRoot model = (ContainerRoot) loader.loadModelFromStream(this.getClass().getClassLoader().getResourceAsStream("temp.json")).get(0);

        DictionaryType dicAttType = (DictionaryType) model.findByPath("typeDefinitions[MiniCloudNode]/dictionaryType[19024801375806419736]");
       // System.out.println("att="+dicAttType.findByPath("attributes[logLevel]"));

        Object elem = model.findByPath("typeDefinitions[MiniCloudNode]/dictionaryType[19024801375806419736]/attributes[logLevel]");
        System.out.println("========="+elem);

        for(ContainerNode node : model.getNodes()){
             Dictionary dic = node.getDictionary();
             for(DictionaryValue val : dic.getValues()){
                 System.out.println("val=>"+val.getAttribute().path());
             }
        }


       // JSONModelSerializer saver = new JSONModelSerializer();
       // saver.serialize(model,System.out);


    }

}
