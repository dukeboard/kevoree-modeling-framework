package org.kevoree.modeling.microframework.test.json;

import org.junit.Test;
import org.kevoree.modeling.api.ModelLoader;
import org.kevoree.modeling.api.data.MemoryKDataBase;
import org.kevoree.modeling.microframework.test.cloud.CloudDimension;
import org.kevoree.modeling.microframework.test.cloud.CloudUniverse;
import org.kevoree.modeling.microframework.test.cloud.CloudView;

/**
 * Created by duke on 10/16/14.
 */
public class JSONLoadTest {

    @Test
    public void jsonTest() {
        CloudUniverse universe = new CloudUniverse(new MemoryKDataBase());
        CloudDimension dimension0 = universe.create();
        CloudView time0 = dimension0.time(0l);
        ModelLoader loader = time0.createJSONLoader();
        loader.loadModelFromString("[\n" +
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
                "]", (res) -> {



            time0.lookup(1l, (r) -> {
                System.err.println(r);
            });


        });
    }

}
