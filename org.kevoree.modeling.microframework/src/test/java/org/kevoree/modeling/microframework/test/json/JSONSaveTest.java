package org.kevoree.modeling.microframework.test.json;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.microframework.test.cloud.CloudUniverse;
import org.kevoree.modeling.microframework.test.cloud.CloudModel;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Node;

/**
 * Created by duke on 10/16/14.
 */
public class JSONSaveTest {

    @Test
    public void escapeJsonTest() {
        CloudModel universe = new CloudModel();
        universe.connect();
        CloudUniverse dimension0 = universe.newUniverse();
        CloudView time0 = dimension0.time(0l);
        Node root = time0.createNode();
        time0.setRoot(root);
        root.setName("root\nhello");
        final String[] result = new String[1];
        time0.json().save(root).then(new Callback<String>() {
            @Override
            public void on(String model) {
                result[0] = model;
            }
        });
        Assert.assertEquals(result[0], "[\n" +
                "{\"@meta\":\"org.kevoree.modeling.microframework.test.cloud.Node\",\"@uuid\":1,\"@root\":true,\"name\":\"root\\nhello\"}\n" +
                "]\n");

        CloudUniverse dimension1 = universe.newUniverse();
        CloudView time10 = dimension1.time(0l);
        time10.json().load("[\n" +
                "\t{\n" +
                "\t\t\"@meta\": \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" +
                "\t\t\"@uuid\": \"1\",\n" +
                "\t\t\"@root\": \"true\",\n" +
                "\t\t\"name\": \"root\\nhello\"\n" +
                "\t}\n" +
                "]\n").then(new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                if (throwable != null) {
                    throwable.printStackTrace();
                }
            }
        });
        time10.json().save(root).then(new Callback<String>() {
            @Override
            public void on(String model) {
                result[0] = model;
            }
        });
        Assert.assertEquals(result[0], "[\n" +
                "{\"@meta\":\"org.kevoree.modeling.microframework.test.cloud.Node\",\"@uuid\":1,\"@root\":true,\"name\":\"root\\nhello\"}\n" +
                "]\n");

    }

    @Test
    public void jsonTest() {
        CloudModel universe = new CloudModel();
        universe.connect();
        CloudUniverse dimension0 = universe.newUniverse();

        CloudView time0 = dimension0.time(0l);
        Node root = time0.createNode();
        time0.setRoot(root);
        root.setName("root");
        Node n1 = time0.createNode();
        n1.setName("n1");
        Node n2 = time0.createNode();
        n2.setName("n2");
        root.addChildren(n1);
        root.addChildren(n2);


        final String[] result = new String[1];
        time0.json().save(root).then(new Callback<String>() {
            @Override
            public void on(String model) {
                result[0] = model;
            }
        });
        String payloadResult = "[\n" +
                "{\"@meta\":\"org.kevoree.modeling.microframework.test.cloud.Node\",\"@uuid\":1,\"@root\":true,\"name\":\"root\",\"children\":[2,3]},\n" +
                "{\"@meta\":\"org.kevoree.modeling.microframework.test.cloud.Node\",\"@uuid\":2,\"@parent\":[1],\"@ref\":\"org.kevoree.modeling.microframework.test.cloud.Node@children\",\"@inbounds\":[1],\"name\":\"n1\"},\n" +
                "{\"@meta\":\"org.kevoree.modeling.microframework.test.cloud.Node\",\"@uuid\":3,\"@parent\":[1],\"@ref\":\"org.kevoree.modeling.microframework.test.cloud.Node@children\",\"@inbounds\":[1],\"name\":\"n2\"}\n" +
                "]\n";


        Assert.assertEquals(result[0], payloadResult);

    }

}
