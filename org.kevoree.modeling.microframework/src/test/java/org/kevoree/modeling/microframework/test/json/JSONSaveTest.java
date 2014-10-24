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
        universe.newDimension((dimension0)->{
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
                    "\t\"@uuid\" : \"1\",\n" +
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
                    "]\n";

            assertEquals(result[0], payloadResult);
            final String[] pathN2 = {null};
            n2.path((p) -> {
                pathN2[0] = p;
            });
            assertEquals("/children[name=n2]", pathN2[0]);
            final String[] pathN1 = {null};
            n1.path((p) -> {
                pathN1[0] = p;
            });
            assertEquals("/children[name=n1]", pathN1[0]);
            final String[] pathR = {null};
            root.path((p) -> {
                pathR[0] = p;
            });
            assertEquals("/", pathR[0]);
        });
    }

}
