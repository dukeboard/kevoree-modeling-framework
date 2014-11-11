package org.kevoree.modeling.test.datastore;

import geometry.GeometryUniverse;
import geometry.GeometryView;
import geometry.Library;
import org.kevoree.modeling.api.KEvent;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.data.MemoryKDataBase;
import org.kevoree.modeling.databases.websocket.WebSocketKBroker;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;

/**
 * Created by gregory.nain on 10/11/14.
 */
public class MainClientTest {


    public static void main(String[] args) {

        Semaphore s = new Semaphore(0);

        GeometryUniverse geoUniverse = new GeometryUniverse(new MemoryKDataBase());
        geoUniverse.storage().setEventBroker(new WebSocketKBroker(geoUniverse.storage().getEventBroker(), false, "localhost", WebSocketKBroker.DEFAULT_PORT));

        geoUniverse.listen(new ModelListener() {
            @Override
            public void on(KEvent evt) {
                System.out.println("Event:" + evt.toJSON());
            }
        });
        try {
            s.acquire();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        Runtime.getRuntime().addShutdownHook(new Thread(new Runnable() {
            @Override
            public void run() {
                s.release();
            }
        }));

    }
}
