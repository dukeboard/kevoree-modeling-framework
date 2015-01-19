package org.kevoree.modeling.test.datastore;

import geometry.*;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KEvent;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.event.DefaultKEvent;
import org.kevoree.modeling.databases.websocket.WebSocketBroker;
import org.kevoree.modeling.databases.websocket.WebSocketDataBaseWrapper;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.Semaphore;
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
        WebSocketDataBaseWrapper wsDbWrapper = new WebSocketDataBaseWrapper(geoModel.storage().dataBase(), 23664);
        geoModel.setDataBase(wsDbWrapper);
        WebSocketBroker wsb = new WebSocketBroker("0.0.0.0", 23665);
        geoModel.setEventBroker(wsb);

        geoModel.connect(new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                if (throwable != null) {
                    throwable.printStackTrace();
                } else {
                    GeometryUniverse dimension = geoModel.universe(0);
                    GeometryView geoFactory = dimension.time(originOfTime);
                    geoFactory.select("/", results -> {
                        if (results == null || results.length == 0) {
                            Library lib = geoFactory.createLibrary();
                            geoFactory.setRoot(lib, new Callback<Throwable>() {
                                @Override
                                public void on(Throwable throwable) {
                                    if (throwable != null) {
                                        throwable.printStackTrace();
                                    }
                                }
                            });
                            for (int i = 0; i < 3; i++) {
                                lib.addShapes(geoFactory.createShape().setName("ShapeO" + i).setColor(colors[i % 3]));

                            }


                            dimension.save(Utils.DefaultPrintStackTraceCallback);

                            System.out.println("Base model committed");
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
                geoFactory.select("/", results -> {
                    if (results == null || results.length == 0) {
                        System.err.println("Root not found");
                    } else {
                        Library root = (Library) results[0];
                        root.eachShapes((shapes) -> {
                            if (shapes != null) {
                                for (Shape shape : shapes) {
                                    i++;
                                    shape.setColor(colors[(turn + i) % 3]);
                                }
                            }
                        });
                        dimension.saveUnload(Utils.DefaultPrintStackTraceCallback);
                    }
                });
                turn++;
            }
        };
        executor.scheduleWithFixedDelay(task, 8000, 2000, TimeUnit.MILLISECONDS);
    }
}
