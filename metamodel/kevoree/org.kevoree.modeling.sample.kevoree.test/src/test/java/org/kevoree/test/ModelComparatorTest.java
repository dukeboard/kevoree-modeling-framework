package org.kevoree.test;

import org.junit.Test;
import org.kevoree.ContainerNode;
import org.kevoree.ContainerRoot;
import org.kevoree.KevoreeFactory;
import org.kevoree.TypeDefinition;
import org.kevoree.cloner.ModelCloner;
import org.kevoree.compare.ModelCompare;
import org.kevoree.impl.DefaultKevoreeFactory;
import org.kevoree.trace.ModelTrace;

import java.util.List;

import static org.junit.Assert.*;

/**
 * Created by duke on 29/07/13.
 */
public class ModelComparatorTest {
    KevoreeFactory factory = new DefaultKevoreeFactory();
    ModelCloner cloner = new ModelCloner();
    ModelCompare compare = new ModelCompare();

    @Test
    public void testCompareDiff() {

        ContainerRoot modelM0 = factory.createContainerRoot();

        TypeDefinition typeDef = factory.createTypeDefinition();
        typeDef.setName("TD1");
        modelM0.addTypeDefinitions(typeDef);

        ContainerNode newNode = factory.createContainerNode();
        newNode.setName("testNode");
        modelM0.addNodes(newNode);

        ContainerRoot modelM1 = cloner.clone(modelM0);

        List<ModelTrace> traces = compare.diff(modelM0, modelM1);
        printTraces(traces);
        assert (traces.size() == 0);

        ContainerNode newNode2 = factory.createContainerNode();
        newNode2.setName("testNode2");
        newNode2.setHost(modelM1.findNodesByID("testNode"));
        modelM1.addNodes(newNode2);


        traces = compare.diff(modelM0, modelM1);
        printTraces(traces);



    }

    @Test
    public void testCompareInter() {

        ContainerRoot modelM0 = factory.createContainerRoot();
        TypeDefinition typeDef = factory.createTypeDefinition();
        typeDef.setName("TD1");
        modelM0.addTypeDefinitions(typeDef);

        ContainerNode newNode = factory.createContainerNode();
        newNode.setName("testNode");
        modelM0.addNodes(newNode);

        ContainerRoot modelM1 = cloner.clone(modelM0);

        ContainerNode newNode2 = factory.createContainerNode();
        newNode2.setName("testNode2");
        newNode2.setHost(modelM1.findNodesByID("testNode"));
        modelM1.addNodes(newNode2);

        List<ModelTrace> traces = compare.inter(modelM0, modelM1);
        for(ModelTrace trace : traces){
           if(trace.toString().equals(newNode2.getName())){
               fail("testNode2 must not be present");
           }
        }

        printTraces(traces);
    }

    private boolean lookupForTrace(List<ModelTrace> traces, String attName, String optionalContent) {
        for (ModelTrace trace : traces) {
            if(trace.toString().contains("refname : \""+attName+"\"")){
                if(optionalContent != null){
                    if(trace.toString().contains("content : \""+optionalContent+"\"") || trace.toString().contains("objPath : \""+optionalContent+"\"")){
                        return true;
                    }
                } else {
                    return true;
                }
            }

        }
        return false;
    }

    private void printTraces(List<ModelTrace> traces){
       for(ModelTrace trace : traces){
           System.out.println(trace);
       }
    }



}
