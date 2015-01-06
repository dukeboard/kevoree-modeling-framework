package org.kevoree.modeling.microframework.test;

import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.data.MemoryKDataBase;
import org.kevoree.modeling.microframework.test.cloud.*;

/**
 * Created by thomas on 06/01/15.
 */
public class LoadRootTest {
    private static final String DATABASE_FILE = "db";

    @Test
    public void loadRootFromMemoryTest() {
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
                        throwable.printStackTrace();
                    }
                });

                final CloudView lookupView = dimension0.time(0l);
                universe.storage().getRoot(lookupView, new Callback<KObject>() {
                    @Override
                    public void on(KObject kObject) {
                        System.out.println(kObject);
                    }
                });
            }
        });
    }

//    @Test
//    public void loadRootFromLevelDbTest() {
//        final CloudUniverse universe = new CloudUniverse();
//        universe.setDataBase(new Level());
//        universe.connect(null);
//
//        final CloudDimension dimension0 = universe.newDimension();
//        final CloudView t0 = dimension0.time(0l);
//
//        // create node0 and element0 and link them
//        final Node node0 = t0.createNode();
//        final Element element0 = t0.createElement();
//        node0.setElement(element0);
//
//        t0.setRoot(node0, new Callback<Throwable>() {
//            @Override
//            public void on(Throwable throwable) {
//                dimension0.save(new Callback<Throwable>() {
//                    @Override
//                    public void on(Throwable throwable) {
//                        throwable.printStackTrace();
//                    }
//                });
//
//                final CloudView lookupView = dimension0.time(0l);
//                universe.storage().getRoot(lookupView, new Callback<KObject>() {
//                    @Override
//                    public void on(KObject kObject) {
//                        System.out.println(kObject);
//                    }
//                });
//
//
//            }
//        });
//    }
}
