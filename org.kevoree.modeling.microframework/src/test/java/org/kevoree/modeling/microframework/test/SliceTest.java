package org.kevoree.modeling.microframework.test;

import org.junit.Test;
import org.kevoree.modeling.api.ModelSlicer;
import org.kevoree.modeling.api.data.MemoryKDataBase;
import org.kevoree.modeling.microframework.test.cloud.CloudDimension;
import org.kevoree.modeling.microframework.test.cloud.CloudUniverse;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Node;

import java.util.Arrays;

/**
 * Created by duke on 10/16/14.
 */
public class SliceTest {

    @Test
    public void slideTest() {
        CloudUniverse universe = new CloudUniverse(new MemoryKDataBase());
        universe.newDimension((dimension0)->{
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

            ModelSlicer slicer = time0.createModelSlicer();
            slicer.slice(Arrays.asList(root), (seq) -> {
                System.err.println(seq);
            });
        });


    }

}
