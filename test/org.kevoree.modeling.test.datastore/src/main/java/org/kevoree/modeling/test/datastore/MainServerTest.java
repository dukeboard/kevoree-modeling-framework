package org.kevoree.modeling.test.datastore;

import geometry.GeometryUniverse;
import geometry.GeometryView;
import geometry.Library;
import org.kevoree.modeling.api.KEvent;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.data.DefaultKStore;
import org.kevoree.modeling.api.data.MemoryKDataBase;
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

        GeometryUniverse geoUniverse = new GeometryUniverse(new MemoryKDataBase());
        geoUniverse.storage().setEventBroker(new WebSocketKBroker(geoUniverse.storage().getEventBroker(), true));

        geoUniverse.listen(new ModelListener() {
            @Override
            public void on(KEvent evt) {
                System.out.println("Event:" + evt.toJSON());
            }
        });

        geoUniverse.dimension(0, (dimension)->{
            GeometryView geoFactory = dimension.time(Long.MIN_VALUE);
            geoFactory.select("/", results -> {
                if (results == null || results.length == 0) {
                    Library lib = geoFactory.createLibrary();
                    geoFactory.setRoot(lib);
                    dimension.save(Utils.DefaultPrintStackTraceCallback);
                }
            });
        });



        Runnable task = new Runnable() {
            int index = 0;
            public void run() {
                System.out.println("TaskRun");
                geoUniverse.dimension(0, (dimension)->{
                    System.out.println("Got Dimension: key:" + dimension.key());
                    GeometryView geoFactory = dimension.time(Long.MIN_VALUE);
                    System.out.println("Got Factory time:" + geoFactory.now());
                    geoFactory.select("/", results -> {
                        System.out.println("Got Root");
                        if(results == null || results.length == 0) {
                            System.err.println("Root not found");
                        } else {
                            System.out.println("Creating shape " + "Shape"+index);
                            Library root = (Library) results[0];
                            System.out.println("Reading Shapes size");
                            int prevSize =root.sizeOfShapes();
                            System.out.println("Adding shape");
                            root.addShapes(geoFactory.createShape().setName("Shape"+index));
                            index++;
                            System.out.println("Saving Size: "+prevSize+" -> " + root.sizeOfShapes());
                            dimension.saveUnload(Utils.DefaultPrintStackTraceCallback);
                            System.out.println("Saved");
                        }
                    });
                });
                System.out.println("TaskFinish");
            }
        };
        executor.scheduleWithFixedDelay(task, 5000, 5000, TimeUnit.MILLISECONDS);
    }
}
