package org.kevoree.modeling.tests;

import org.junit.Assert;
import org.kevoree.ContainerRoot;
import org.kevoree.DictionaryValue;
import org.kevoree.KevoreeFactory;
import org.kevoree.TypeDefinition;
import org.kevoree.compare.DefaultModelCompare;
import org.kevoree.impl.DefaultKevoreeFactory;
import org.kevoree.loader.JSONModelLoader;
import org.kevoree.loader.XMIModelLoader;
import org.kevoree.modeling.api.trace.TraceSequence;
import org.kevoree.serializer.JSONModelSerializer;

import java.io.FileNotFoundException;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 01/09/13
 * Time: 13:35
 */
public class JSONMergeTest {

    @org.junit.Test
    public void test() throws FileNotFoundException {
        XMIModelLoader xmiLoader = new XMIModelLoader();
        JSONModelLoader jsonLoader = new JSONModelLoader();
        JSONModelSerializer jsonSerializer = new JSONModelSerializer();
        DefaultModelCompare compare = new DefaultModelCompare();
        KevoreeFactory factory = new DefaultKevoreeFactory();
        ContainerRoot mergeModel = factory.createContainerRoot();

        ContainerRoot fakeDomoModel = (ContainerRoot) xmiLoader.loadModelFromStream(this.getClass().getClassLoader().getResourceAsStream("fakeDomo_2.0.4-SNAPSHOT.kev")).get(0);

        TypeDefinition fakeConsoleTD = fakeDomoModel.findTypeDefinitionsByID("FakeConsole");
        for (DictionaryValue dv : fakeConsoleTD.getDictionaryType().getDefaultValues()) {
            Assert.assertNotNull("DictionaryValue.getAttribute() shouldn't be null", dv.getAttribute());
        }

        TraceSequence mergeSeq = compare.merge(mergeModel, fakeDomoModel);
        mergeSeq.applyOn(mergeModel);

        fakeConsoleTD = mergeModel.findTypeDefinitionsByID("FakeConsole");
        for (DictionaryValue dv : fakeConsoleTD.getDictionaryType().getDefaultValues()) {
            Assert.assertNotNull("DictionaryValue.getAttribute() shouldn't be null", dv.getAttribute());
        }
    }

}
