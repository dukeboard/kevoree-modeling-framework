package org.kevoree.modeling.microframework.test.xmi;

import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.data.MemoryKDataBase;
import org.kevoree.modeling.microframework.test.cloud.*;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;


/**
 * Created by gregory.nain on 16/10/2014.
 */
public class Serializer {


    @Test
    public void serializeTest() throws InterruptedException {

        CloudUniverse universe = new CloudUniverse(new MemoryKDataBase());
        universe.newDimension(new Callback<CloudDimension>() {
            @Override
            public void on(CloudDimension dimension0) {
                final CloudView t0 = dimension0.time(0l);
                Node nodeT0 = t0.createNode();
                nodeT0.setName("node0");
           /*
           */
                t0.setRoot(nodeT0);
                Element child0 = t0.createElement();
                nodeT0.setElement(child0);
                Node nodeT1 = t0.createNode();
                nodeT1.setName("n1");
                nodeT0.addChildren(nodeT1);

                t0.lookup(nodeT0.uuid(), new Callback<KObject>() {
                    @Override
                    public void on(KObject root) {
                        try {
                            t0.createXMISerializer().serializeToStream(root, new FileOutputStream(new File("XMISerialized.xmi")), new Callback<Throwable>() {
                                @Override
                                public void on(Throwable error) {
                                    if (error != null) {
                                        error.printStackTrace();
                                    }
                                }
                            });
                        } catch (FileNotFoundException e) {
                            e.printStackTrace();
                        }
                    }
                });
            }
        });

    }

}
