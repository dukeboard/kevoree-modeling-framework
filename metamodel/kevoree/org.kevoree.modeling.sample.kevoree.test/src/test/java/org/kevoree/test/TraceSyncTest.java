package org.kevoree.test;

import org.junit.Test;
import org.kevoree.ContainerNode;
import org.kevoree.ContainerRoot;
import org.kevoree.KevoreeFactory;
import org.kevoree.TypeDefinition;
import org.kevoree.cloner.ModelCloner;
import org.kevoree.events.ModelEvent;
import org.kevoree.events.ModelTreeListener;
import org.kevoree.impl.DefaultKevoreeFactory;
import org.kevoree.test.trace.Event2Trace;
import org.kevoree.test.trace.ModelTraceApplicator;
import org.kevoree.trace.ModelTrace;

import java.util.Collections;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 30/07/13
 * Time: 13:26
 */
public class TraceSyncTest {

    private ModelCloner cloner = new ModelCloner();
    private         KevoreeFactory factory = new DefaultKevoreeFactory();


    @Test
    public void testSyncViaTrace() {


        ContainerRoot modelM0 = factory.createContainerRoot();
        TypeDefinition typeDef = factory.createTypeDefinition();
        typeDef.setName("TD1");
        modelM0.addTypeDefinitions(typeDef);

        ContainerNode newNode = factory.createContainerNode();
        newNode.setName("testNode");
        modelM0.addNodes(newNode);

        final ContainerRoot modelM1 = cloner.clone(modelM0);


        modelM0.addModelTreeListener(new ModelTreeListener() {
            Event2Trace converter = new Event2Trace();
            ModelTraceApplicator applicator = new ModelTraceApplicator(modelM1);

            @Override
            public void elementChanged(ModelEvent modelEvent) {
                List<ModelTrace> traces = converter.convert(modelEvent);
                applicator.applyTraceOnModel(traces);
            }
        });


        ContainerNode newNode2 = factory.createContainerNode();
        newNode2.setName("newNode2");

        /* This test the creation of a new element */
        modelM0.addNodes(newNode2);

        assert(modelM1.findNodesByID("newNode2") != null);
        assert(modelM1.findNodesByID("newNode2") != newNode2);
        TypeDefinition remoteTD1M1 = modelM1.findTypeDefinitionsByID("TD1");

        newNode2.setTypeDefinition(typeDef); /* set un existing reference */
        assert(modelM1.findNodesByID("newNode2") != null);

        assert(modelM1.findTypeDefinitionsByID("TD1") != null);
        assert(modelM1.findTypeDefinitionsByID("TD1") == remoteTD1M1);    //check TD is not overriden
        assert(modelM1.findTypeDefinitionsByID("TD1") == modelM1.findNodesByID("newNode2").getTypeDefinition());

    }

}
