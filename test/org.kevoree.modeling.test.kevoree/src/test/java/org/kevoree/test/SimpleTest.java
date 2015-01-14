package org.kevoree.test;

import org.KevoreeUniverse;
import org.junit.Test;
import org.kevoree.ContainerNode;
import org.kevoree.ContainerRoot;
import org.kevoree.modeling.api.data.MemoryKDataBase;

/**
 * Created by duke on 14/01/15.
 */
public class SimpleTest {

    @Test
    public void helloTest() {

        MemoryKDataBase.DEBUG = true;

        KevoreeUniverse universe = new KevoreeUniverse();
        universe.connect(null);
        ContainerRoot root = universe.dimension(0).time(0).createContainerRoot();
        universe.dimension(0).time(0).setRoot(root, null);
        System.out.println(root.timeTree().last());

        ContainerNode node = universe.dimension(0).time(0).createContainerNode();
        node.setName("node0");
        root.addNodes(node);

        universe.dimension(0).save(null);

    }

}
