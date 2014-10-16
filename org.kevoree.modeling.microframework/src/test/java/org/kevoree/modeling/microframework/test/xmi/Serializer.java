package org.kevoree.modeling.microframework.test.xmi;

import org.junit.Test;
import org.kevoree.modeling.api.data.MemoryDataStore;
import org.kevoree.modeling.microframework.test.cloud.*;

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


            CloudUniverse universe = new CloudUniverse(new MemoryDataStore());
            CloudDimension dimension0 = universe.create();
            CloudView t0 = dimension0.time(0l);
            Node nodeT0 = t0.createNode();
            nodeT0.setName("node0");
            String t0Path = nodeT0.path();
           /*
            t0.root(nodeT0,(ok)->{s.release();});
            s.acquire();
           */
            Element child0 = t0.createElement();
            nodeT0.setElement(child0, (ok) -> {
                s.release();
            });
            s.acquire();
            Node nodeT1 = t0.createNode();
            nodeT1.setName("n1");
            nodeT0.addChildren(nodeT1, (ok) -> {
                s.release();
            });
            s.acquire();



            t0.lookup(t0Path, (root) -> {
                try {
                    t0.createXMISerializer().serializeToStream(root, new FileOutputStream(new File("XMISerialized.xmi")), (error) -> {
                        if(error != null) {
                            error.printStackTrace();
                        }
                        s.release();
                    });
                } catch (FileNotFoundException e) {
                    e.printStackTrace();
                }
            });
            s.acquire();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

}
