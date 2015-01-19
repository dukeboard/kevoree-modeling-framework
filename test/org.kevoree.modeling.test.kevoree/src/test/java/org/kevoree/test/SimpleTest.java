package org.kevoree.test;

import org.KevoreeModel;
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

        KevoreeModel model = new KevoreeModel();
        model.connect(null);
        ContainerRoot root = model.universe(0).time(0).createContainerRoot();
        model.universe(0).time(0).setRoot(root, null);
        System.out.println(root.timeTree().last());

        ContainerNode node = model.universe(0).time(0).createContainerNode();
        node.setName("node0");
        root.addNodes(node);

        model.universe(0).save(null);

    }

}
