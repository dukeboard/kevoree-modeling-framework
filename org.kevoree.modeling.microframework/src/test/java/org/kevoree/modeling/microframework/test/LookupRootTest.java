package org.kevoree.modeling.microframework.test;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.data.MemoryKDataBase;
import org.kevoree.modeling.microframework.test.cloud.*;

/**
 * Created by thomas on 06/01/15.
 */
public class LookupRootTest {

    @Test
    public void loadRootFromDbTest() {
//        MemoryKDataBase.DEBUG = true;

        final CloudUniverse universe = new CloudUniverse();
        universe.setDataBase(new MemoryKDataBase());
        universe.connect(null);

        final CloudDimension dimension0 = universe.newDimension();
        final CloudView t0 = dimension0.time(0l);

        // create node0 and element0 and link them
        final Node node0 = t0.createNode();
        final Element element0 = t0.createElement();
        node0.setElement(element0);

        t0.setRoot(node0, new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                dimension0.save(new Callback<Throwable>() {
                    @Override
                    public void on(Throwable throwable) {
                        Assert.assertNull(throwable);
                    }
                });

                final CloudView lookupView = dimension0.time(0l);
                universe.storage().getRoot(lookupView, new Callback<KObject>() {
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
        final MemoryKDataBase db = new MemoryKDataBase();

        final CloudUniverse universe = new CloudUniverse();
        universe.setDataBase(db);
        universe.connect(null);

        final CloudDimension dimension0 = universe.newDimension();
        final CloudView t0 = dimension0.time(0l);

        // create node0 and element0 and link them
        final Node node0 = t0.createNode();
        final Element element0 = t0.createElement();
        node0.setElement(element0);

        t0.setRoot(node0, new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                dimension0.save(new Callback<Throwable>() {
                    @Override
                    public void on(Throwable throwable) {
                        Assert.assertNull(throwable);
                    }
                });
            }
        });

        final CloudUniverse universe1 = new CloudUniverse();
        universe1.setDataBase(db);
        universe1.connect(null);
        final CloudDimension cloudDimension1 = universe1.newDimension();
        final CloudView cloudView1 = cloudDimension1.time(1l);

        cloudView1.select("/", new Callback<KObject[]>() {
            @Override
            public void on(KObject[] kObjects) {
                System.out.println(kObjects[0]);
            }
        });

    }
}
