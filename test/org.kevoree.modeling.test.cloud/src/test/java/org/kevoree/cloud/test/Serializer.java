package org.kevoree.cloud.test;

import cloud.*;
import org.junit.Test;
import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.data.MemoryKDataBase;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.concurrent.Semaphore;


/**
 * Created by gregory.nain on 16/10/2014.
 */
public class Serializer {



    @Test
    public void serializeTest() throws InterruptedException {
        try {
            Semaphore s = new Semaphore(0);

            CloudUniverse universe = new CloudUniverse();
            universe.newDimension(new Callback<CloudDimension>() {
                @Override
                public void on(CloudDimension dimension0) {
                    CloudView t0 = dimension0.time(0l);
                    Node nodeT0 = t0.createNode();
                    nodeT0.setName("node0");
                    t0.setRoot(nodeT0);

                    Element child0 = t0.createElement();
                    nodeT0.setElement(child0);

                    Node nodeT1 = t0.createNode();
                    nodeT1.setName("n1");
                    nodeT0.addChildren(nodeT1);



                    t0.lookup(nodeT0.uuid(), (root) -> {
                        t0.xmi().save(root,  (result, error) -> {
                            if (error != null) {
                                error.printStackTrace();
                            }
                            s.release();
                        });
                    });
                }
            });
            s.acquire();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

}
