package org.kevoree.modeling.microframework.test.storage;

import org.junit.Test;
import org.kevoree.modeling.microframework.test.cloud.CloudDimension;
import org.kevoree.modeling.microframework.test.cloud.CloudUniverse;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Node;

/**
 * Created by duke on 28/11/14.
 */
public class ParentStorageTest {

    @Test
    public void slideTest() {
        CloudUniverse universe = new CloudUniverse();
        CloudDimension dimension0 = universe.newDimension();
        CloudView time0 = dimension0.time(0l);

        Node root = time0.createNode();
        root.setName("root");
        time0.setRoot(root);

        Node n1 = time0.createNode();
        n1.setName("n1");

        Node n2 = time0.createNode();
        n2.setName("n2");

        root.addChildren(n1);
        root.addChildren(n2);

        System.err.println(n1.parentUuid());

        dimension0.discard(null);

        time0.

    }

}
