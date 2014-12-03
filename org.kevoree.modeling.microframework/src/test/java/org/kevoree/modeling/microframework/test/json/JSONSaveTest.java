package org.kevoree.modeling.microframework.test.json;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.microframework.test.cloud.CloudDimension;
import org.kevoree.modeling.microframework.test.cloud.CloudUniverse;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Node;

/**
 * Created by duke on 10/16/14.
 */
public class JSONSaveTest {

    @Test
    public void jsonTest() {
        CloudUniverse universe = new CloudUniverse();
        universe.connect(null);

        CloudDimension dimension0 = universe.newDimension();

        CloudView time0 = dimension0.time(0l);
        Node root = time0.createNode();
        time0.setRoot(root,null);
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
                "{\n" +
                "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" +
                "\t\"@uuid\" : \"1\",\n" +
                "\t\"@root\" : \"true\",\n" +
                "\t\"name\" : \"root\",\n" +
                "\t\"children\" : [\"2\",\"3\"],\n" +
                "}\n" +
                ",{\n" +
                "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" +
                "\t\"@uuid\" : \"2\",\n" +
                "\t\"name\" : \"n1\",\n" +
                "}\n" +
                ",{\n" +
                "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" +
                "\t\"@uuid\" : \"3\",\n" +
                "\t\"name\" : \"n2\",\n" +
                "}\n" +
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
