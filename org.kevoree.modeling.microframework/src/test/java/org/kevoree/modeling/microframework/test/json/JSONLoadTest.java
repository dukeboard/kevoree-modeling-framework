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
        universe.connect(null);

        CloudUniverse dimension0 = universe.newUniverse();

        final int[] passed = new int[1];

        final CloudView time0 = dimension0.time(0l);
        time0.json().load("[\n" +
                "{\n" +
                "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\"\n" +
                "\t,\"@uuid\" : \"1\"\n" +
                "\t,\"@root\" : \"true\"\n" +
                "\t,\"name\" : \"root\"\n" +
                "\t,\"children\" : [\"2\",\"3\"]\n" +
                "}\n" +
                ",{\n" +
                "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\"\n" +
                "\t,\"@uuid\" : \"2\"\n" +
                "\t,\"name\" : \"n1\"\n" +
                "}\n" +
                ",{\n" +
                "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\"\n" +
                "\t,\"@uuid\" : \"3\"\n" +
                "\t,\"name\" : \"n2\"\n" +
                "}\n" +
                "]\n", new Callback<Throwable>() {
            @Override
            public void on(Throwable res) {
                time0.lookup(1l, new Callback<KObject>() {
                    @Override
                    public void on(KObject r) {
                        Assert.assertNotNull(r);
                        Assert.assertTrue(r.isRoot());
                        passed[0]++;
                    }
                });
                time0.lookup(2l, new Callback<KObject>() {
                    @Override
                    public void on(KObject r) {
                        Assert.assertNotNull(r);
                        passed[0]++;
                    }
                });

            }
        });

        Assert.assertEquals(passed[0], 2);

        time0.select("/", new Callback<KObject[]>() {
            @Override
            public void on(KObject[] kObjects) {
                time0.json().save(kObjects[0], new ThrowableCallback<String>() {
                    @Override
                    public void on(String s, Throwable error) {
                        Assert.assertEquals(s, "[\n" +
                                "{\n" +
                                "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" +
                                "\t\"@uuid\" : \"1\",\n" +
                                "\t\"@root\" : \"true\",\n" +
                                "\t\"name\":\"root\",\n" +
                                "\t\"children\": [\"2\",\"3\"],\n" +
                                "}\n" +
                                ",{\n" +
                                "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" +
                                "\t\"@uuid\" : \"2\",\n" +
                                "\t\"name\":\"n1\",\n" +
                                "}\n" +
                                ",{\n" +
                                "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" +
                                "\t\"@uuid\" : \"3\",\n" +
                                "\t\"name\":\"n2\",\n" +
                                "}\n" +
                                "]\n");
                    }
                });
            }
        });


    }

}
