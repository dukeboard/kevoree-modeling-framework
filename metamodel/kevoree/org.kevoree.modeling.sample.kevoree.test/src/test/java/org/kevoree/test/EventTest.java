package org.kevoree.test;

import org.junit.Test;
import org.kevoree.ContainerNode;
import org.kevoree.ContainerRoot;
import org.kevoree.KevoreeFactory;
import org.kevoree.TypeDefinition;
import org.kevoree.impl.DefaultKevoreeFactory;
import org.kevoree.test.modelsync.ModelSync;

/**
 * Created by duke on 24/07/13.
 */
public class EventTest {

    @Test
    public void testEvent1() {

        KevoreeFactory factory = new DefaultKevoreeFactory();

        ContainerRoot modelM0 = factory.createContainerRoot();
        ContainerRoot modelM1 = factory.createContainerRoot();
        ModelSync sync = new ModelSync(modelM0, modelM1);

        //add node
        TypeDefinition typeDef = factory.createTypeDefinition();
        typeDef.setName("TD1");
        modelM0.addTypeDefinitions(typeDef);

        ContainerNode newNode = factory.createContainerNode();
        newNode.setName("testNode");
        modelM0.addNodes(newNode);


        System.out.println("M1 nodes size = " + modelM1.getNodes().size());
        assert (modelM1.getNodes().size() == 1);
        System.out.println("M0 nodes size = " + modelM0.getNodes().size());
        assert (modelM0.getNodes().size() == 1);

        assert (modelM1.getTypeDefinitions().size() == 1);
        assert (modelM0.getTypeDefinitions().size() == 1);

        assert (!modelM1.findTypeDefinitionsByID("TD1").equals(modelM0.findTypeDefinitionsByID("TD1")));

    }


}
