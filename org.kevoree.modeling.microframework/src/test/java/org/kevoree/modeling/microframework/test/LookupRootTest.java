package org.kevoree.modeling.microframework.test;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.data.cdn.MemoryKContentDeliveryDriver;
import org.kevoree.modeling.microframework.test.cloud.*;

/**
 * Created by thomas on 06/01/15.
 */
public class LookupRootTest {

    @Test
    public void loadRootFromDbTest() {
//        MemoryKDataBase.DEBUG = true;

        final CloudModel cloudModel = new CloudModel();
        cloudModel.setDataBase(new MemoryKContentDeliveryDriver());
        cloudModel.connect(null);

        final CloudUniverse dimension0 = cloudModel.newUniverse();
        final CloudView t0 = dimension0.time(0l);

        // create node0 and element0 and link them
        final Node node0 = t0.createNode();
        final Element element0 = t0.createElement();
        node0.setElement(element0);

        t0.setRoot(node0, new Callback<Throwable>() {
            @Override

            public void on(Throwable throwable) {

                cloudModel.save(new Callback<Throwable>() {
                    @Override
                    public void on(Throwable aBoolean) {
                        cloudModel.discard(new Callback<Throwable>() {
                            @Override
                            public void on(Throwable aBoolean) {

                            }
                        });
                    }
                });

                final CloudView lookupView = dimension0.time(0l);
                cloudModel.storage().getRoot(lookupView, new Callback<KObject>() {
                    @Override
                    public void on(KObject kObject) {
                        Assert.assertNotNull(kObject);
                    }
                });

                lookupView.select("/", new Callback<KObject[]>() {
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
        cloudModel.setDataBase(db);
        cloudModel.connect(null);

        final CloudUniverse dimension0 = cloudModel.newUniverse();
        final CloudView t0 = dimension0.time(0l);

        // create node0 and element0 and link them
        final Node node0 = t0.createNode();
        final Element element0 = t0.createElement();
        node0.setElement(element0);

        t0.setRoot(node0, new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                cloudModel.save(new Callback<Throwable>() {
                    @Override
                    public void on(Throwable aBoolean) {
                        cloudModel.discard(new Callback<Throwable>() {
                            @Override
                            public void on(Throwable aBoolean) {

                            }
                        });
                    }
                });
            }
        });

        final CloudModel universe1 = new CloudModel();
        universe1.setDataBase(db);
        universe1.connect(null);
        final CloudUniverse cloudDimension1 = universe1.universe(dimension0.key());
        final CloudView cloudView1 = cloudDimension1.time(1l);

        cloudView1.select("/", new Callback<KObject[]>() {
            @Override
            public void on(KObject[] kObjects) {
                Assert.assertNotNull(kObjects[0]);
            }
        });

    }
}
