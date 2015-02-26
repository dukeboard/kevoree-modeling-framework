package org.kevoree.modeling.test.datastore;

import geometry.*;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.databases.websocket.WebSocketWrapper;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

/**
 * Created by gregory.nain on 10/11/14.
 */
public class MainServerTest {
    public static String[] colors = new String[]{"red", "green", "blue"};

    public static void main(String[] args) {

        Long originOfTime = 0L;

        ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();

        GeometryModel geoModel = new GeometryModel();
        geoModel.setContentDeliveryDriver(new WebSocketWrapper(geoModel.manager().cdn(), 23664));

        geoModel.connect().then(new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                if (throwable != null) {
                    throwable.printStackTrace();
                } else {
                    GeometryUniverse dimension = geoModel.universe(0);
                    GeometryView geoFactory = dimension.time(originOfTime);
                    geoFactory.getRoot().then(new Callback<KObject>() {
                        @Override
                        public void on(KObject kObject) {
                            if (kObject == null) {
                                Library lib = geoFactory.createLibrary();
                                geoFactory.setRoot(lib).then(new Callback<Throwable>() {
                                    @Override
                                    public void on(Throwable throwable) {
                                        if(throwable != null) {
                                            throwable.printStackTrace();
                                        }
                                    }
                                });
                                for (int i = 0; i < 3; i++) {
                                    lib.addShapes(geoFactory.createShape().setName("ShapeO" + i).setColor(colors[i % 3]));
                                }
                                geoModel.save().then(Utils.DefaultPrintStackTraceCallback);

                                System.out.println("Base model committed");
                            }
                        }
                    });
                }
            }
        });



/*

        Semaphore s = new Semaphore(0);
        try {
            s.acquire();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        */

        Runnable task = new Runnable() {
            int turn = 0, i = 0;

            public void run() {
                GeometryUniverse dimension = geoModel.universe(0);
                GeometryView geoFactory = dimension.time(originOfTime);
                geoFactory.getRoot().then(new Callback<KObject>() {
                    @Override
                    public void on(KObject kObject) {
                        if (kObject == null) {
                            System.err.println("Root not found");
                        } else {
                            Library root = (Library) kObject;
                            root.getShapes().then((shapes) -> {
                                if (shapes != null) {
                                    for (Shape shape : shapes) {
                                        i++;
                                        shape.setColor(colors[(turn + i) % 3]);
                                    }
                                }
                            });
                            geoModel.save().then(Utils.DefaultPrintStackTraceCallback);
                        }
                    }
                });
                turn++;
            }
        };
        executor.scheduleWithFixedDelay(task, 8000, 2000, TimeUnit.MILLISECONDS);
    }
}
