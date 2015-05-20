package org.kevoree.modeling.microframework.test.scheduler;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.scheduler.ExecutorServiceScheduler;
import org.kevoree.modeling.microframework.test.cloud.CloudModel;
import org.kevoree.modeling.microframework.test.cloud.CloudUniverse;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Node;

/**
 * Created by duke on 23/01/15.
 */
public class SchedulerTest {

    @Test
    public void test() {
        final CloudModel model = new CloudModel();
        model.setScheduler(new ExecutorServiceScheduler());
        model.connect().then(new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                CloudUniverse dimension0 = model.newUniverse();
                CloudView time0 = dimension0.time(0l);
                final Node root = time0.createNode();
                time0.setRoot(root);
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
