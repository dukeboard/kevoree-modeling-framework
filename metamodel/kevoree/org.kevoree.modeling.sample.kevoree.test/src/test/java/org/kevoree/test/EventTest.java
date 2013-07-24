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

        assert (modelM1.getTypeDefinitions().size() == 1);
        assert (modelM0.getTypeDefinitions().size() == 1);
        assert (!modelM0.findTypeDefinitionsByID("TD1").equals(modelM1.findTypeDefinitionsByID("TD1")));

        ContainerNode newNode = factory.createContainerNode();
        newNode.setName("testNode");
        modelM0.addNodes(newNode);

        assert (modelM1.getNodes().size() == 1);
        assert (modelM0.getNodes().size() == 1);
        assert (!modelM0.findNodesByID("testNode").equals(modelM1.findNodesByID("testNode")));


        assert (modelM0.getTypeDefinitions().contains(typeDef));
        assert (!modelM1.findTypeDefinitionsByID("TD1").equals(modelM0.findTypeDefinitionsByID("TD1")));
        newNode.setTypeDefinition(typeDef);


        ContainerNode mirorNode = modelM1.findNodesByID("testNode");
        TypeDefinition M1mirrorTD = mirorNode.getTypeDefinition();

        assert (!M1mirrorTD.equals(typeDef));
        assert (M1mirrorTD.eContainer().equals(modelM1));

        /* change key WTF :-) */
        newNode.setName("newName");
        assert (mirorNode.getName().equals(newNode.getName()));

        /* check and fix reindex */


        newNode.setTypeDefinition(null);
        modelM0.removeNodes(newNode);


    }


}
