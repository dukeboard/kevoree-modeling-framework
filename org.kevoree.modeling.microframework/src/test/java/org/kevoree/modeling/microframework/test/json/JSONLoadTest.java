package org.kevoree.modeling.microframework.test.json;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.microframework.test.cloud.CloudUniverse;
import org.kevoree.modeling.microframework.test.cloud.CloudModel;
import org.kevoree.modeling.microframework.test.cloud.CloudView;

/**
 * Created by duke on 10/16/14.
 */
public class JSONLoadTest {

    @Test
    public void jsonTest() {

        CloudModel universe = new CloudModel();
        universe.connect();
        CloudUniverse dimension0 = universe.newUniverse();
        final int[] passed = new int[1];
        passed[0] = 0;
        final CloudView time0 = dimension0.time(0l);
        time0.json().load("[\n" +
                "{\"@meta\":\"org.kevoree.modeling.microframework.test.cloud.Node\",\"@uuid\":1,\"@root\":true,\"name\":\"root\",\"children\":[2,3]},\n" +
                "{\"@meta\":\"org.kevoree.modeling.microframework.test.cloud.Node\",\"@uuid\":2,\"name\":\"n1\"},\n" +
                "{\"@meta\":\"org.kevoree.modeling.microframework.test.cloud.Node\",\"@uuid\":3,\"name\":\"n2\"}\n" +
                "]\n").then(new Callback<Throwable>() {
            @Override
            public void on(Throwable res) {
                time0.lookup(1l).then(new Callback<KObject>() {
                    @Override
                    public void on(KObject r) {
                        Assert.assertNotNull(r);
                        //Assert.assertTrue(r.isRoot());
                        passed[0]++;
                    }
                });
                time0.lookup(2l).then(new Callback<KObject>() {
                    @Override
                    public void on(KObject r) {
                        Assert.assertNotNull(r);
                        passed[0]++;
                    }
                });

            }
        });

        Assert.assertEquals(passed[0], 2);

        time0.select("/").then(new Callback<KObject[]>() {
            @Override
            public void on(KObject[] kObjects) {

                time0.json().save(kObjects[0]).then(new Callback<String>() {
                    @Override
                    public void on(String s) {

                        Assert.assertEquals(s, "[\n" +
                                "{\"@meta\":\"org.kevoree.modeling.microframework.test.cloud.Node\",\"@uuid\":1,\"@root\":true,\"name\":\"root\",\"children\":[2,3]},\n" +
                                "{\"@meta\":\"org.kevoree.modeling.microframework.test.cloud.Node\",\"@uuid\":2,\"name\":\"n1\"},\n" +
                                "{\"@meta\":\"org.kevoree.modeling.microframework.test.cloud.Node\",\"@uuid\":3,\"name\":\"n2\"}\n" +
                                "]\n");
                    }
                });
            }
        });


    }

}
