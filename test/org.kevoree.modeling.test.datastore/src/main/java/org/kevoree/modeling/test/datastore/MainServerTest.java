package org.kevoree.modeling.test.datastore;

import geometry.*;
import geometry.meta.MetaLibrary;
import geometry.meta.MetaShape;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KOperation;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.memory.cache.KCacheEntry;
import org.kevoree.modeling.api.memory.cdn.MemoryKContentDeliveryDriver;
import org.kevoree.modeling.api.memory.manager.AccessMode;
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
        //MemoryKContentDeliveryDriver.DEBUG = true;

        GeometryModel geoModel = new GeometryModel();
        geoModel.setContentDeliveryDriver(new WebSocketWrapper(geoModel.manager().cdn(), 23664));


        geoModel.setOperation(MetaLibrary.OP_ADDSHAPE, new KOperation() {
            public void on(KObject source, Object[] params, Callback<Object> result) {
                GeometryUniverse dimension = geoModel.universe(0);
                GeometryView geoFactory = dimension.time(originOfTime);
                geoFactory.getRoot(new Callback<KObject>() {
                    @Override
                    public void on(KObject kObject) {
                        if (kObject != null) {
                            Library lib = (Library) kObject;
                            lib.addShapes(geoFactory.createShape().setName("Shape" + params[0]).setColor("grey"));
                            geoModel.save(Utils.DefaultPrintStackTraceCallback);

                            System.out.println("Shape added by operation");
                            result.on("true");
                        } else {
                            System.out.println("Shape not added, root not found");
                            result.on("false");
                        }
                    }
                });
            }
        });



        geoModel.connect(new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                if (throwable != null) {
                    throwable.printStackTrace();
                } else {
                    GeometryUniverse dimension = geoModel.universe(0);
                    GeometryView geoFactory = dimension.time(originOfTime);
                    geoFactory.getRoot(new Callback<KObject>() {
                        @Override
                        public void on(KObject kObject) {
                            if (kObject == null) {
                                Library lib = geoFactory.createLibrary();
                                KCacheEntry libEntry = ((AbstractKObject)lib)._manager.entry(lib, AccessMode.READ);
                                long[] uuids = (long[]) libEntry.get(MetaLibrary.REF_SHAPES.index());
                                geoFactory.setRoot(lib,new Callback<Throwable>() {
                                    @Override
                                    public void on(Throwable throwable) {
                                        if(throwable != null) {
                                            throwable.printStackTrace();
                                        }
                                    }
                                });
                                for (int i = 0; i < 200; i++) {
                                    lib.addShapes(geoFactory.createShape().setName("ShapeO" + i).setColor(colors[i % 3]));
                                }
                                geoModel.save(Utils.DefaultPrintStackTraceCallback);

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
                try {
                    GeometryUniverse dimension = geoModel.universe(0);
                    GeometryView geoFactory = dimension.time(originOfTime);
                    geoFactory.getRoot(new Callback<KObject>() {
                        @Override
                        public void on(KObject kObject) {
                            if (kObject == null) {
                                System.err.println("Root not found");
                            } else {
                                Library root = (Library) kObject;
                                KCacheEntry entry = ((AbstractKObject)root)._manager.entry(root, AccessMode.READ);
                                root.getShapes((shapes) -> {
                                    System.out.println("Shapes:" + shapes.length);
                                    if (shapes != null) {
                                        for (Shape shape : shapes) {
                                            i++;
                                            shape.setColor(colors[(turn + i) % 3]);
                                        }
                                    }
                                });
                                i = 0;
                                geoModel.save(Utils.DefaultPrintStackTraceCallback);
                            }
                        }
                    });
                    turn++;
                }catch(Throwable e) {
                    e.printStackTrace();
                }
            }
        };
        executor.scheduleWithFixedDelay(task, 3000, 2000, TimeUnit.MILLISECONDS);
    }
}
