package org.kevoree.modeling.test.datastore;

import geometry.GeometryUniverse;
import geometry.GeometryView;
import geometry.Library;
import org.kevoree.modeling.api.KEvent;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.data.DefaultKStore;
import org.kevoree.modeling.api.data.MemoryKDataBase;
import org.kevoree.modeling.databases.websocket.WebSocketDataBase;
import org.kevoree.modeling.databases.websocket.WebSocketKBroker;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

/**
 * Created by gregory.nain on 10/11/14.
 */
public class MainServerTest {


    public static void main(String[] args) {

        ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();

        MemoryKDataBase actualDataBase = new MemoryKDataBase();
        WebSocketDataBase wsDbWrapper = new WebSocketDataBase(actualDataBase, 23664);

        GeometryUniverse geoUniverse = new GeometryUniverse(actualDataBase);
        geoUniverse.storage().setEventBroker(new WebSocketKBroker(geoUniverse.storage().getEventBroker(), true));

        String[] colors = new String[]{"red", "green", "blue"};

        geoUniverse.dimension(0, (dimension)->{
            GeometryView geoFactory = dimension.time(Long.MIN_VALUE);
            geoFactory.select("/", results -> {
                if (results == null || results.length == 0) {
                    Library lib = geoFactory.createLibrary();
                    geoFactory.setRoot(lib);
                    lib.addShapes(geoFactory.createShape().setName("ShapeR").setColor(colors[0]));
                    lib.addShapes(geoFactory.createShape().setName("ShapeG").setColor(colors[1]));
                    lib.addShapes(geoFactory.createShape().setName("ShapeB").setColor(colors[2]));

                    lib.eachShapes(shape->{
                        shape.listen((event->{
                        System.out.println(shape.getName() + "=>" + shape.getColor());
                        }));
                    }, error->error.printStackTrace());
                    dimension.save(Utils.DefaultPrintStackTraceCallback);
                }
            });
        });



        Runnable task = new Runnable() {
            int turn = 0, i = 0;
            public void run() {
                geoUniverse.dimension(0, (dimension)->{
                    GeometryView geoFactory = dimension.time(Long.MIN_VALUE);
                    geoFactory.select("/", results -> {
                        if(results == null || results.length == 0) {
                            System.err.println("Root not found");
                        } else {
                            Library root = (Library) results[0];
                            i++;
                            System.out.println("Rolling colors");
                            root.eachShapes((shape)->{
                                i++;
                                shape.setColor(colors[(turn + i)%3]);
                            },error->{
                                if(error != null) {
                                    error.printStackTrace();
                                }
                                turn++;
                            });
                            dimension.save(Utils.DefaultPrintStackTraceCallback);
                        }
                    });
                });
            }
        };
        executor.scheduleWithFixedDelay(task, 5000, 5000, TimeUnit.MILLISECONDS);
    }
}
