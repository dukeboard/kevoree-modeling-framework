package org.kevoree.modeling.tests;

import org.junit.Assert;
import org.kevoree.ContainerRoot;
import org.kevoree.DictionaryValue;
import org.kevoree.TypeDefinition;
import org.kevoree.loader.JSONModelLoader;
import org.kevoree.loader.XMIModelLoader;
import org.kevoree.serializer.JSONModelSerializer;

import java.io.ByteArrayInputStream;
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
        TypeDefinition fakeConsoleTD = fakeDomoModel.findTypeDefinitionsByID("FakeConsole");
        for (DictionaryValue dv : fakeConsoleTD.getDictionaryType().getDefaultValues()) {
            Assert.assertNotNull("DictionaryValue.getAttribute() shouldn't be null", dv.getAttribute());
        }

        String fakeDomoModelStr = jsonSerializer.serialize(fakeDomoModel);

        //System.out.println(fakeDomoModelStr);

        //ByteArrayInputStream bais = new ByteArrayInputStream(fakeDomoModelStr.getBytes());
        ContainerRoot reloadedFakeDomoModel = (ContainerRoot) jsonLoader.loadModelFromString(fakeDomoModelStr).get(0);

        TypeDefinition fakeConsoleTDfromJSON = reloadedFakeDomoModel.findTypeDefinitionsByID("FakeConsole");
        for (DictionaryValue dv : fakeConsoleTDfromJSON.getDictionaryType().getDefaultValues()) {
            Assert.assertNotNull("DictionaryValue.getAttribute() shouldn't be null", dv.getAttribute());
        }
    }

}
