package org.kevoree.modeling.tests;

import org.junit.Assert;
import org.kevoree.ContainerRoot;
import org.kevoree.DictionaryAttribute;
import org.kevoree.TypeDefinition;
import org.kevoree.loader.JSONModelLoader;
import org.kevoree.loader.XMIModelLoader;
import org.kevoree.modeling.api.KMFContainer;
import org.kevoree.serializer.JSONModelSerializer;

import java.io.FileNotFoundException;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 01/09/13
 * Time: 13:35
 */
public class JSONLoadTest {

    @org.junit.Test
    public void test() throws FileNotFoundException {
        XMIModelLoader xmiLoader = new XMIModelLoader();
        JSONModelLoader jsonLoader = new JSONModelLoader();
        JSONModelSerializer jsonSerializer = new JSONModelSerializer();

        ContainerRoot fakeDomoModel = (ContainerRoot) xmiLoader.loadModelFromStream(this.getClass().getClassLoader().getResourceAsStream("fakeDomo_2.0.4-SNAPSHOT.kev")).get(0);
        for (TypeDefinition td : fakeDomoModel.getTypeDefinitions()) {
            System.out.println("TD: "+td.getDictionaryType().getGenerated_KMF_ID());
            for (DictionaryAttribute da : td.getDictionaryType().getAttributes()) {
                System.out.println("\tDA: "+da.getName());
            }
        }

        TypeDefinition xmiJavaSENodeTD = fakeDomoModel.findTypeDefinitionsByID("JavaSENode");
        int xmiSize = xmiJavaSENodeTD.getDictionaryType().getAttributes().size();
        System.out.println("From XMI, JavaSENode TD attributes size = " + xmiSize);

        String fakeDomoModelStr = jsonSerializer.serialize(fakeDomoModel);
        KMFContainer reloadedFakeDomoModel = jsonLoader.loadModelFromString(fakeDomoModelStr).get(0);

        TypeDefinition jsonJavaSENodeTD = ((ContainerRoot) reloadedFakeDomoModel).findTypeDefinitionsByID("JavaSENode");
        int jsonSize = jsonJavaSENodeTD.getDictionaryType().getAttributes().size();
        System.out.println("From JSON, JavaSENode TD attributes size = " + jsonSize);

        Assert.assertTrue(xmiSize > 0);
        Assert.assertTrue(jsonSize > 0);
        Assert.assertEquals(xmiSize, jsonSize);
    }

}
