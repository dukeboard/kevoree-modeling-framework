package org.kevoree.modeling.microframework.test.task;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.KCurrentTask;
import org.kevoree.modeling.api.KJob;
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

        fakePromise1.setJob(new KJob() {
            @Override
            public void run(KCurrentTask currentTask) {
                currentTask.addTaskResult("Sample1");
            }
        });
        KTask fakePromise2 = dynamicKModel.task();
        fakePromise2.setJob(new KJob() {
            @Override
            public void run(KCurrentTask currentTask) {
                currentTask.addTaskResult("Sample2");
            }
        });

        rootTask.wait(fakePromise1);
        rootTask.wait(fakePromise2);

        final int[] calls = new int[1];

        rootTask.setJob(new KJob() {
            @Override
            public void run(KCurrentTask currentTask) {
                Assert.assertEquals(currentTask.resultByTask(fakePromise1), "Sample1");
                Assert.assertEquals(currentTask.resultByTask(fakePromise2), "Sample2");
                calls[0] = 1;
            }
        });
        //mimic select behavior
        fakePromise1.ready();
        fakePromise2.ready();

        rootTask.ready();

        Assert.assertEquals(calls[0], 1);

    }

    @Test
    public void chain2Test() {
        DynamicKModel dynamicKModel = new DynamicKModel();
        KTask rootTask = dynamicKModel.task();
        KTask fakePromise1 = dynamicKModel.task();

        fakePromise1.setJob(new KJob() {
            @Override
            public void run(KCurrentTask currentTask) {
                currentTask.addTaskResult("Sample1");
            }
        });
        KTask fakePromise2 = dynamicKModel.task();
        fakePromise2.setJob(new KJob() {
            @Override
            public void run(KCurrentTask currentTask) {
                currentTask.addTaskResult("Sample2");
            }
        });

        rootTask.wait(fakePromise1);
        rootTask.wait(fakePromise2);

        final int[] calls = new int[1];

        rootTask.setJob(new KJob() {
            @Override
            public void run(KCurrentTask currentTask) {
                Assert.assertEquals(currentTask.resultByTask(fakePromise1), "Sample1");
                Assert.assertEquals(currentTask.resultByTask(fakePromise2), "Sample2");
                calls[0] = 1;
            }
        });

        rootTask.ready();

        //mimic select behavior
        fakePromise1.ready();
        fakePromise2.ready();

        Assert.assertEquals(calls[0], 1);

    }

    @Test
    public void promiseTest() {
        DynamicMetaModel metaModel = new DynamicMetaModel("DynamicMM");
        metaModel.createMetaClass("Sensor").addAttribute("name", PrimitiveMetaTypes.STRING);
        KModel dynamicKModel = metaModel.model();
        dynamicKModel.connect();
        KObject root = dynamicKModel.universe(0).time(0).create(metaModel.metaClass("Sensor"));
        root.set(root.metaClass().metaAttribute("name"), "MyRoot");
        dynamicKModel.universe(0).time(0).setRoot(root);

        KTask rootTask = dynamicKModel.task();
        KTask previousSelect = dynamicKModel.universe(0).time(0).select("/");
        rootTask.wait(previousSelect);
        KTask previousSelect2 = dynamicKModel.universe(0).time(0).select("/titi");
        rootTask.wait(previousSelect2);
        final int[] res = new int[1];
        final Object[] res2 = new Object[2];
        rootTask.setJob(new KJob() {
            @Override
            public void run(KCurrentTask currentTask) {
                res[0] = currentTask.resultKeys().length;
                res2[0] = currentTask.resultByTask(previousSelect);
                res2[1] = currentTask.resultByTask(previousSelect2);
            }
        });
        rootTask.ready();

        Assert.assertEquals(res[0], 2);
        Assert.assertTrue(res2[0] != null);
        Assert.assertTrue(res2[1] != null);

        Assert.assertTrue(((KObject[])res2[0]).length == 1);
        Assert.assertTrue(((KObject[])res2[1]).length == 0);


    }

}
