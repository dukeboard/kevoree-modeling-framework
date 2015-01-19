package org.kevoree.modeling.microframework.test.traces;

import org.junit.Test;
import org.kevoree.modeling.microframework.test.cloud.CloudUniverse;
import org.kevoree.modeling.microframework.test.cloud.CloudModel;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Node;

/**
 * Created by duke on 10/16/14.
 */
public class TraceTest {

    @Test
    public void traceTest() {

        //MemoryKDataBase.DEBUG = true;

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

    }

}
