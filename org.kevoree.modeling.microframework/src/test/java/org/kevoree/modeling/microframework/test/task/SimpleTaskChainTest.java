package org.kevoree.modeling.microframework.test.task;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KModel;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KTask;
import org.kevoree.modeling.api.meta.PrimitiveMetaTypes;
import org.kevoree.modeling.api.reflexive.DynamicKModel;
import org.kevoree.modeling.api.reflexive.DynamicMetaModel;

/**
 * Created by duke on 20/01/15.
 */
public class SimpleTaskChainTest {

    @Test
    public void chainTest() {
        DynamicKModel dynamicKModel = new DynamicKModel();
        KTask rootTask = dynamicKModel.task();
        KTask fakePromise1 = dynamicKModel.task();
        KTask fakePromise2 = dynamicKModel.task();
        rootTask.wait(fakePromise1);
        rootTask.wait(fakePromise2);
        rootTask.done(new Callback() {
            @Override
            public void on(Object o) {
                Assert.assertEquals(rootTask.previousResults().get(fakePromise1), "Sample1");
                Assert.assertEquals(rootTask.previousResults().get(fakePromise2), "Sample2");
            }
        });
        fakePromise1.setResult("Sample1");
        fakePromise2.setResult("Sample2");
    }

    @Test
    public void injectedTest() {
        DynamicMetaModel metaModel = new DynamicMetaModel("DynamicMM");
        metaModel.createMetaClass("Sensor").addAttribute("name", PrimitiveMetaTypes.STRING);
        KModel dynamicKModel = metaModel.model();
        dynamicKModel.connect(null);
        KObject root = dynamicKModel.universe(0).time(0).create(metaModel.metaClass("Sensor"));
        root.set(root.metaClass().metaAttribute("name"), "MyRoot");
        dynamicKModel.universe(0).time(0).setRoot(root, null);

        KTask rootTask = dynamicKModel.task();
        KTask fakeSelectPromise = dynamicKModel.task();
        rootTask.wait(fakeSelectPromise);
        rootTask.done(new Callback() {
            @Override
            public void on(Object o) {
                //System.err.println(rootTask.previousResults().get(fakeSelectPromise));
                // Assert.assertEquals(rootTask.previousResults().get(fakeSelectPromise), "Sample1");
            }
        });
        dynamicKModel.universe(0).time(0).select("/", new Callback<KObject[]>() {
            @Override
            public void on(KObject[] kObjects) {
                fakeSelectPromise.setResult(kObjects);
            }
        });
    }

    @Test
    public void promiseTest() {
        DynamicMetaModel metaModel = new DynamicMetaModel("DynamicMM");
        metaModel.createMetaClass("Sensor").addAttribute("name", PrimitiveMetaTypes.STRING);
        KModel dynamicKModel = metaModel.model();
        dynamicKModel.connect(null);
        KObject root = dynamicKModel.universe(0).time(0).create(metaModel.metaClass("Sensor"));
        root.set(root.metaClass().metaAttribute("name"), "MyRoot");
        dynamicKModel.universe(0).time(0).setRoot(root, null);

        KTask rootTask = dynamicKModel.task();
        rootTask.wait(dynamicKModel.universe(0).time(0).taskSelect("/"));
        rootTask.wait(dynamicKModel.universe(0).time(0).taskSelect("/titi"));
        rootTask.done(new Callback() {
            @Override
            public void on(Object o) {

                //System.err.println(rootTask.previousResults().get(fakeSelectPromise));
                // Assert.assertEquals(rootTask.previousResults().get(fakeSelectPromise), "Sample1");
            }
        });

    }

}
