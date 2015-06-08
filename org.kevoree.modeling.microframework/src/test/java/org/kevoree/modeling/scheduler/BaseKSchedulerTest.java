package org.kevoree.modeling.scheduler;

import org.junit.Test;
import org.kevoree.modeling.KCallback;
import org.kevoree.modeling.microframework.test.cloud.CloudModel;
import org.kevoree.modeling.microframework.test.cloud.CloudUniverse;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Node;
import org.kevoree.modeling.scheduler.impl.ExecutorServiceScheduler;

public abstract class BaseKSchedulerTest {

    public abstract KScheduler createScheduler();

    @Test
    public void test() {
        final CloudModel model = new CloudModel();
        model.setScheduler(createScheduler());

        model.connect(new KCallback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                CloudUniverse dimension0 = model.newUniverse();
                CloudView time0 = dimension0.time(0l);
                final Node root = time0.createNode();
                time0.setRoot(root,null);
                root.setName("root");
                Node n1 = time0.createNode();
                n1.setName("n1");
                Node n2 = time0.createNode();
                n2.setName("n2");
                root.addChildren(n1);
                root.addChildren(n2);
/*
                n1.inbounds().then(new Callback<KObject[]>() {
                    @Override
                    public void on(KObject[] kObjects) {
                        Assert.assertEquals(kObjects[0].uuid(), root.uuid());
                    }
                });
                n2.inbounds().then(new Callback<KObject[]>() {
                    @Override
                    public void on(KObject[] kObjects) {
                        Assert.assertEquals(kObjects[0].uuid(), root.uuid());
                    }
                });
                */
            }
        });


    }
}
