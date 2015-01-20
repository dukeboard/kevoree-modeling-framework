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
        universe.connect(null);
        CloudUniverse dimension0 = universe.newUniverse();
        CloudView time0 = dimension0.time(0l);
        Node root = time0.createNode();
        time0.setRoot(root, null);
        root.setName("root\nhello");
        final String[] result = new String[1];
        time0.json().save(root, new ThrowableCallback<String>() {
            @Override
            public void on(String model, Throwable err) {
                result[0] = model;
                if (err != null) {
                    err.printStackTrace();
                }
            }
        });
        Assert.assertEquals(result[0], "[\n" +
                "\t{\n" +
                "\t\t\"@meta\": \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" +
                "\t\t\"@uuid\": \"1\",\n" +
                "\t\t\"@root\": \"true\",\n" +
                "\t\t\"name\": \"root\\nhello\"\n" +
                "\t}\n" +
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
                "]\n", new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                if (throwable != null) {
                    throwable.printStackTrace();
                }
            }
        });
        time10.json().save(root, new ThrowableCallback<String>() {
            @Override
            public void on(String model, Throwable err) {
                result[0] = model;
                if (err != null) {
                    err.printStackTrace();
                }
            }
        });
        Assert.assertEquals(result[0], "[\n" +
                "\t{\n" +
                "\t\t\"@meta\": \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" +
                "\t\t\"@uuid\": \"1\",\n" +
                "\t\t\"@root\": \"true\",\n" +
                "\t\t\"name\": \"root\\nhello\"\n" +
                "\t}\n" +
                "]\n");

    }

    @Test
    public void jsonTest() {
        CloudModel universe = new CloudModel();
        universe.connect(null);
        CloudUniverse dimension0 = universe.newUniverse();

        CloudView time0 = dimension0.time(0l);
        Node root = time0.createNode();
        time0.setRoot(root, null);
        root.setName("root");
        Node n1 = time0.createNode();
        n1.setName("n1");
        Node n2 = time0.createNode();
        n2.setName("n2");
        root.addChildren(n1);
        root.addChildren(n2);


        final String[] result = new String[1];
        time0.json().save(root, new ThrowableCallback<String>() {
            @Override
            public void on(String model, Throwable err) {
                result[0] = model;
                if (err != null) {
                    err.printStackTrace();
                }
            }
        });
        String payloadResult = "[\n" +
                "\t{\n" +
                "\t\t\"@meta\": \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" +
                "\t\t\"@uuid\": \"1\",\n" +
                "\t\t\"@root\": \"true\",\n" +
                "\t\t\"name\": \"root\",\n" +
                "\t\t\"children\": [\"2\",\"3\"]\n" +
                "\t},\n" +
                "\t{\n" +
                "\t\t\"@meta\": \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" +
                "\t\t\"@uuid\": \"2\",\n" +
                "\t\t\"@parent\": \"1\",\n" +
                "\t\t\"@ref\": \"org.kevoree.modeling.microframework.test.cloud.Node@children\",\n" +
                "\t\t\"@inbounds\": [\"1\"],\n" +
                "\t\t\"name\": \"n1\"\n" +
                "\t},\n" +
                "\t{\n" +
                "\t\t\"@meta\": \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" +
                "\t\t\"@uuid\": \"3\",\n" +
                "\t\t\"@parent\": \"1\",\n" +
                "\t\t\"@ref\": \"org.kevoree.modeling.microframework.test.cloud.Node@children\",\n" +
                "\t\t\"@inbounds\": [\"1\"],\n" +
                "\t\t\"name\": \"n2\"\n" +
                "\t}\n" +
                "]\n";

        Assert.assertEquals(result[0], payloadResult);
        final String[] pathN2 = {null};
        n2.path(new Callback<String>() {
            @Override
            public void on(String p) {
                pathN2[0] = p;
            }
        });
        Assert.assertEquals("/children[name=n2]", pathN2[0]);
        final String[] pathN1 = {null};
        n1.path(new Callback<String>() {
            @Override
            public void on(String p) {
                pathN1[0] = p;
            }
        });
        Assert.assertEquals("/children[name=n1]", pathN1[0]);
        final String[] pathR = {null};
        root.path(new Callback<String>() {
            @Override
            public void on(String p) {
                pathR[0] = p;
            }
        });
        Assert.assertEquals("/", pathR[0]);


    }

}
