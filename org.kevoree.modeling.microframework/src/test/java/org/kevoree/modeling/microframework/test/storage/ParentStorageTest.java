package org.kevoree.modeling.microframework.test.storage;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.data.cache.MultiLayeredMemoryCache;
import org.kevoree.modeling.api.data.cdn.MemoryKContentDeliveryDriver;
import org.kevoree.modeling.microframework.test.cloud.CloudUniverse;
import org.kevoree.modeling.microframework.test.cloud.CloudModel;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Node;
import org.kevoree.modeling.microframework.test.cloud.meta.MetaNode;

/**
 * Created by duke on 28/11/14.
 */
public class ParentStorageTest {

    @Test
    public void discardTest() {

        CloudModel cloudModel = new CloudModel();
        cloudModel.connect();
        //model.connect(null);

        CloudUniverse dimension0 = cloudModel.newUniverse();
        final CloudView time0 = dimension0.time(0l);

        Node root = time0.createNode();
        root.setName("root");
        time0.setRoot(root);

        final Node n1 = time0.createNode();
        n1.setName("n1");

        Node n2 = time0.createNode();
        n2.setName("n2");

        root.addChildren(n1);
        root.addChildren(n2);

        Long val = 1L;

        Assert.assertTrue(n1.parentUuid() == val);
        try {
            root.getChildren(null);
        } catch (Exception e) {
            Assert.assertNull(e);
        }
        //We clear the cache

        cloudModel.discard().then(new Callback<Throwable>() {
            @Override
            public void on(Throwable aBoolean) {
                time0.lookup(n1.uuid()).then(new Callback<KObject>() {
                    @Override
                    public void on(KObject r_n1) {
                        Assert.assertNull(r_n1);
                    }
                });
            }
        });

        /*
        try {
            root.eachChildren(null);
            Assert.assertNull(root);
        } catch (Exception e) {
            Assert.assertNotNull(e);
        }*/


    }

    @Test
    public void parentTest() {

     //   MultiLayeredMemoryCache.DEBUG = true;
        //MemoryKContentDeliveryDriver.DEBUG = true;

        final CloudModel cloudModel = new CloudModel();
        cloudModel.connect();

        CloudUniverse dimension0 = cloudModel.newUniverse();
        CloudView time0 = dimension0.time(0l);

        Node root = time0.createNode();
        root.setName("root");
        time0.setRoot(root);

        Node n1 = time0.createNode();
        n1.setName("n1");

        Node n2 = time0.createNode();
        n2.setName("n2");

        root.addChildren(n1);
        root.addChildren(n2);
        Long val = 1L;
        Assert.assertTrue(n1.parentUuid() == val);
        Assert.assertEquals(n1.referenceInParent(), MetaNode.REF_CHILDREN);


        n1.inbounds().then(new Callback<KObject[]>() {
            @Override
            public void on(KObject[] kObjects) {
                Assert.assertEquals(1, kObjects.length);
            }
        });

        try {
            root.getChildren(null);
        } catch (Exception e) {
            Assert.assertNull(e);
        }
        //We clear the cache

        cloudModel.save().then(new Callback<Throwable>() {
            @Override
            public void on(Throwable aBoolean) {
                cloudModel.discard().then(new Callback<Throwable>() {
                    @Override
                    public void on(Throwable aBoolean) {

                    }
                });
            }
        });

        time0.lookup(n1.uuid()).then(new Callback<KObject>() {
            @Override
            public void on(KObject r_n1) {
                Assert.assertNotNull(r_n1.parentUuid());
                Assert.assertNotNull(r_n1.referenceInParent());
                r_n1.inbounds().then(new Callback<KObject[]>() {
                    @Override
                    public void on(KObject[] kObjects) {
                        Assert.assertEquals(1, kObjects.length);
                    }
                });
            }
        });
    }

}
