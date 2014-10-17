package org.kevoree.modeling.microframework.test.json;

import org.junit.Test;
import org.kevoree.modeling.api.ModelLoader;
import org.kevoree.modeling.api.ModelVisitor;
import org.kevoree.modeling.api.data.MemoryDataStore;
import org.kevoree.modeling.microframework.test.cloud.CloudDimension;
import org.kevoree.modeling.microframework.test.cloud.CloudUniverse;
import org.kevoree.modeling.microframework.test.cloud.CloudView;

/**
 * Created by duke on 10/16/14.
 */
public class JSONLoadTest {

    @Test
    public void jsonTest() {
        CloudUniverse universe = new CloudUniverse(new MemoryDataStore());
        CloudDimension dimension0 = universe.create();
        CloudView time0 = dimension0.time(0l);
        ModelLoader loader = time0.createJSONLoader();

        loader.loadModelFromString("[\n" +
                "{\n" +
                "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" +
                "\t\"@path\" : \"/\",\n" +
                "\t\"name\":\"root\",\n" +
                "\t\"children\": [\"/children[name=n2]\",\"/children[name=n1]\"] \n" +
                "}\n" +
                ",{\n" +
                "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" +
                "\t\"@path\" : \"/children[name=n2]\",\n" +
                "\t\"name\":\"n2\" \n" +
                "}\n" +
                ",{\n" +
                "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" +
                "\t\"@path\" : \"/children[name=n1]\",\n" +
                "\t\"name\":\"n1\" \n" +
                "}\n" +
                "]", (res) -> {

            time0.lookup("/", (r) -> {
                System.err.println(r);
                r.treeVisit((elem, v) -> {
                    System.err.println(elem);
                    v.on(ModelVisitor.Result.CONTINUE);
                }, null);
            });

        });
    }

}
