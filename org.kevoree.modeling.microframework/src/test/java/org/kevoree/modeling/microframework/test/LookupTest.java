package org.kevoree.modeling.microframework.test;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.data.cache.MultiLayeredMemoryCache;
import org.kevoree.modeling.api.data.cdn.MemoryKContentDeliveryDriver;
import org.kevoree.modeling.microframework.test.cloud.CloudUniverse;
import org.kevoree.modeling.microframework.test.cloud.CloudModel;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Node;

/**
 * Created by duke on 10/23/14.
 */
public class LookupTest {

    @Test
    public void lookupTest() throws Exception {

        // MemoryKContentDeliveryDriver.DEBUG = true;
        //  MultiLayeredMemoryCache.DEBUG = true;

        final CloudModel cloudModel = new CloudModel();
        cloudModel.connect();
        CloudUniverse dimension0 = cloudModel.newUniverse();
        CloudView t0 = dimension0.time(0l);
        final Node node = t0.createNode();
        node.setName("n0");
        t0.setRoot(node);
        //Assert.assertTrue(node.isRoot());
        cloudModel.manager().getRoot(t0, new Callback<KObject>() {
            @Override
            public void on(KObject resolvedRoot) {
                Assert.assertEquals(node, resolvedRoot);
            }
        });
        //Assert.assertTrue(node.isRoot());

        cloudModel.save().then(new Callback<Throwable>() {
            @Override
            public void on(Throwable error) {
                cloudModel.discard().then(new Callback<Throwable>() {
                    @Override
                    public void on(Throwable throwable) {

                        final CloudModel universe2 = new CloudModel();
                        universe2.setContentDeliveryDriver(cloudModel.manager().cdn());
                        CloudUniverse dimension0_2 = universe2.universe(dimension0.key());
                        final CloudView t0_2 = dimension0_2.time(0l);

                        universe2.manager().getRoot(t0_2, new Callback<KObject>() {
                            @Override
                            public void on(KObject resolvedRoot) {
                                Assert.assertEquals(node.uuid(), resolvedRoot.uuid());
                            }
                        });
                        t0_2.lookup(node.uuid()).then(new Callback<KObject>() {
                            @Override
                            public void on(final KObject resolved) {
                                Assert.assertNotNull(resolved);
                                t0_2.lookup(node.uuid()).then(new Callback<KObject>() {
                                    @Override
                                    public void on(KObject resolved2) {
                                        Assert.assertEquals(resolved, resolved2);
                                    }
                                });
                                //Assert.assertTrue(resolved.isRoot());
                            }
                        });
                    }
                });


            }
        });

    }

}
