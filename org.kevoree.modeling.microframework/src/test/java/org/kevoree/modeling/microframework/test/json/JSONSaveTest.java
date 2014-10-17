package org.kevoree.modeling.microframework.test.json;

import org.junit.Test;
import org.kevoree.modeling.api.data.MemoryKDataBase;
import org.kevoree.modeling.microframework.test.cloud.CloudDimension;
import org.kevoree.modeling.microframework.test.cloud.CloudUniverse;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Node;

import static org.junit.Assert.*;


/**
 * Created by duke on 10/16/14.
 */
public class JSONSaveTest {

    @Test
    public void jsonTest() {
        CloudUniverse universe = new CloudUniverse(new MemoryKDataBase());
        CloudDimension dimension0 = universe.create();
        CloudView time0 = dimension0.time(0l);
        Node root = time0.createNode();
        time0.root(root);
        root.setName("root");

        Node n1 = time0.createNode();
        n1.setName("n1");

        Node n2 = time0.createNode();
        n2.setName("n2");

        root.addChildren(n1);
        root.addChildren(n2);

        final String[] result = new String[1];
        time0.createJSONSerializer().serialize(root, (model) -> {
            result[0] = model;
        });

        String payloadResult = "[\n" +
                "{\n" +
                "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" +
                "\t\"@kid\" : \"1\",\n" +
                "\t\"name\":\"root\",\n" +
                "\t\"children\": [\"2\",\"3\"],\n" +
                "}\n" +
                ",{\n" +
                "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" +
                "\t\"@kid\" : \"2\",\n" +
                "\t\"name\":\"n1\",\n" +
                "}\n" +
                ",{\n" +
                "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" +
                "\t\"@kid\" : \"3\",\n" +
                "\t\"name\":\"n2\",\n" +
                "}\n" +
                "]\n";

        assertEquals(result[0], payloadResult);


    }

}
