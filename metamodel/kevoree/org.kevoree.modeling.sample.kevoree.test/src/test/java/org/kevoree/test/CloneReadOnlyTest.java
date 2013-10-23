package org.kevoree.test;


import org.junit.Test;
import org.kevoree.ContainerRoot;
import org.kevoree.cloner.DefaultModelCloner;
import org.kevoree.loader.JSONModelLoader;
import org.kevoree.modeling.api.KMFContainer;
import org.kevoree.serializer.JSONModelSerializer;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 22/10/13
 * Time: 18:42
 */
public class CloneReadOnlyTest {

    @Test
    public void testT(){
        ContainerRoot model = (ContainerRoot) new JSONModelLoader().loadModelFromStream(this.getClass().getClassLoader().getResourceAsStream("bootstrapModel.json")).get(0);
        DefaultModelCloner cloner = new DefaultModelCloner();
        //KMFContainer newModel1 = (ContainerRoot) cloner.clone(model);
        KMFContainer newModel2 = (ContainerRoot) cloner.clone(model,true);
        JSONModelSerializer saver = new JSONModelSerializer();
        //String contentSaved = saver.serialize(newModel1);
        String contentSaved2 = saver.serialize(newModel2);

       // System.out.println(contentSaved);
       // System.out.println(contentSaved2);
        ContainerRoot casted = (ContainerRoot) newModel2;
        System.out.println(casted.getNodes().get(0).eContainer());



    }





}
