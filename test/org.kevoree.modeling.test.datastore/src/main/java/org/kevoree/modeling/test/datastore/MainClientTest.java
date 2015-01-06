package org.kevoree.modeling.test.datastore;

import geometry.GeometryUniverse;
import org.kevoree.modeling.api.KEvent;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.databases.websocket.WebSocketBroker;
import java.util.concurrent.Semaphore;

/**
 * Created by gregory.nain on 10/11/14.
 */
public class MainClientTest {


    public static void main(String[] args) {

        Semaphore s = new Semaphore(0);

        GeometryUniverse geoUniverse = new GeometryUniverse();
        geoUniverse.storage().setEventBroker(new WebSocketBroker("localhost", 23665));

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
