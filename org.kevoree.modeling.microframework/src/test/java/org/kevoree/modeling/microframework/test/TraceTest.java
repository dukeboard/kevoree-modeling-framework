package org.kevoree.modeling.microframework.test;

import org.junit.Test;
import org.kevoree.modeling.api.ModelCompare;
import org.kevoree.modeling.api.data.MemoryKDataBase;
import org.kevoree.modeling.microframework.test.cloud.CloudDimension;
import org.kevoree.modeling.microframework.test.cloud.CloudUniverse;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Node;

/**
 * Created by duke on 10/16/14.
 */
public class TraceTest {

    @Test
    public void traceTest() {
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

        ModelCompare compare = time0.createModelCompare();
/*
        compare.inter(root,root,(seq)->{
           System.err.println(seq);
        });
*/

    }

}