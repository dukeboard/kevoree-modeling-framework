package org.kevoree.modeling.microframework.test;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.data.cdn.MemoryKContentDeliveryDriver;
import org.kevoree.modeling.microframework.test.cloud.*;

public class LookupRootTest {

    @Test
    public void loadRootFromDbTest() {
//        MemoryKDataBase.DEBUG = true;

        final CloudModel cloudModel = new CloudModel();
        cloudModel.setContentDeliveryDriver(new MemoryKContentDeliveryDriver());
        cloudModel.connect();

        final CloudUniverse dimension0 = cloudModel.newUniverse();
        final CloudView t0 = dimension0.time(0l);

        // create node0 and element0 and link them
        final Node node0 = t0.createNode();
        final Element element0 = t0.createElement();
        node0.setElement(element0);

        t0.setRoot(node0).then(new Callback<Throwable>() {
            @Override

            public void on(Throwable throwable) {

                cloudModel.save().then(new Callback<Throwable>() {
                    @Override
                    public void on(Throwable aBoolean) {
                        cloudModel.discard().then(new Callback<Throwable>() {
                            @Override
                            public void on(Throwable aBoolean) {

                            }
                        });
                    }
                });

                final CloudView lookupView = dimension0.time(0l);
                cloudModel.manager().getRoot(lookupView.universe(),lookupView.now(), new Callback<KObject>() {
                    @Override
                    public void on(KObject kObject) {
                        Assert.assertNotNull(kObject);
                    }
                });

                lookupView.select("/").then(new Callback<KObject[]>() {
                    @Override
                    public void on(KObject[] kObjects) {
                        Assert.assertNotNull(kObjects[0]);
                    }
                });
            }
        });
    }


    @Test
    public void reloadRootFromDbTest() {
        final MemoryKContentDeliveryDriver db = new MemoryKContentDeliveryDriver();

        final CloudModel cloudModel = new CloudModel();
        cloudModel.setContentDeliveryDriver(db);
        cloudModel.connect();

        final CloudUniverse dimension0 = cloudModel.newUniverse();
        final CloudView t0 = dimension0.time(0l);

        // create node0 and element0 and link them
        final Node node0 = t0.createNode();
        final Element element0 = t0.createElement();
        node0.setElement(element0);



        t0.setRoot(node0).then(new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                cloudModel.save().then(new Callback<Throwable>() {
                    @Override
                    public void on(Throwable aBoolean) {
                        cloudModel.discard().then(new Callback<Throwable>() {
                            @Override
                            public void on(Throwable aBoolean) {

                            }
                        });
                    }
                });
            }
        });

        final CloudModel universe1 = new CloudModel();
        universe1.setContentDeliveryDriver(db);
        universe1.connect();
        final CloudUniverse cloudDimension1 = universe1.universe(dimension0.key());
        final CloudView cloudView1 = cloudDimension1.time(1l);

        cloudView1.select("/").then(new Callback<KObject[]>() {
            @Override
            public void on(KObject[] kObjects) {
                Assert.assertNotNull(kObjects[0]);
            }
        });

    }
}
