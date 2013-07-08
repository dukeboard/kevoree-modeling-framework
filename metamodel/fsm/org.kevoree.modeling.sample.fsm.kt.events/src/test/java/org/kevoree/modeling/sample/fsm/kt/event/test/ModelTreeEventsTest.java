package org.kevoree.modeling.sample.fsm.kt.event.test;/*
* Author : Gregory Nain (developer.name@uni.lu)
* Date : 05/07/13
*/

import org.fsmsample.*;
import org.fsmsample.events.ModelElementListener;
import org.fsmsample.events.ModelEvent;
import org.fsmsample.events.ModelTreeListener;
import org.fsmsample.impl.DefaultFsmSampleFactory;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class ModelTreeEventsTest {

    FsmSampleFactory factory = new DefaultFsmSampleFactory();
    Semaphore setAttribute = new Semaphore(0);
    Semaphore unsetAttribute = new Semaphore(0);
    Semaphore setReference = new Semaphore(0);
    Semaphore unsetReference = new Semaphore(0);
    Semaphore addReference = new Semaphore(0);
    Semaphore removeReference = new Semaphore(0);
    Semaphore addContainment = new Semaphore(0);
    Semaphore removeContainment = new Semaphore(0);
    Semaphore addAllReference = new Semaphore(0);
    Semaphore removeAllReference = new Semaphore(0);
    Semaphore addAllContainment = new Semaphore(0);
    Semaphore removeAllContainment = new Semaphore(0);


    private void assertEvent(ModelEvent evt, String expectedPath, String expectedElementAttributeName, ModelEvent.ElementAttributeType expectedElementAttributeType,ModelEvent.EventType expectedEventType, Object expectedValue ) {
        assertTrue("Source is not correct. Expected:" + expectedPath + " Was:" + evt.getSourcePath() , evt.getSourcePath().equals(expectedPath));
        assertTrue("ElementAttributeName not correct. Expected: "+expectedElementAttributeName+" Was:" + evt.getElementAttributeName(), evt.getElementAttributeName().equals(expectedElementAttributeName));
        assertTrue("ElementAttributeType not correct. Expected: "+expectedElementAttributeType.name()+" Was:" + evt.getElementAttributeType().name(), evt.getElementAttributeType()==expectedElementAttributeType);
        assertTrue("EventType is not correct. Expected:" +expectedEventType.name()+" Was:" + evt.getType().name(), evt.getType() == expectedEventType);
        assertTrue("Event Value is not correct. Expected:" +expectedValue+" Was:" + evt.getValue(), evt.getValue()==expectedValue);
    }

    private void assertEventWithList(ModelEvent evt, String expectedPath, String expectedElementAttributeName, ModelEvent.ElementAttributeType expectedElementAttributeType,ModelEvent.EventType expectedEventType, List<? extends Object> expectedValues ) {
        assertTrue("Source is not correct. Expected:" + expectedPath + " Was:" + evt.getSourcePath() , evt.getSourcePath().equals(expectedPath));
        assertTrue("ElementAttributeName not correct. Expected: "+expectedElementAttributeName+" Was:" + evt.getElementAttributeName(), evt.getElementAttributeName().equals(expectedElementAttributeName));
        assertTrue("ElementAttributeType not correct. Expected: "+expectedElementAttributeType.name()+" Was:" + evt.getElementAttributeType().name(), evt.getElementAttributeType()==expectedElementAttributeType);
        assertTrue("EventType is not correct. Expected:" +expectedEventType.name()+" Was:" + evt.getType().name(), evt.getType() == expectedEventType);
        assertTrue("Event Value is not correct. Expected:" +expectedValues+" Was:" + evt.getValue(), ((List)evt.getValue()).containsAll(expectedValues));
    }

    @Test
    public void setAttributeTest() {
        final FSM fsm = factory.createFSM();
        fsm.setName("fsm");
        final State s0 = factory.createState();
        s0.setName("s0");
        final State s1 = factory.createState();
        s1.setName("s1");
        final Transition t0 = factory.createTransition();
        t0.setName("t0");
        final Transition t1 = factory.createTransition();
        t1.setName("t1");
        final Action a0 = factory.createAction();
        a0.setName("a0");

        fsm.addOwnedState(s0);

        fsm.addModelTreeListener(new ModelTreeListener() {
            @Override
            public void elementChanged(ModelEvent evt) {
                System.out.println("FSM-Tree::" + evt.toString());
            }
        });

        s0.addModelTreeListener(new ModelTreeListener() {
            @Override
            public void elementChanged(ModelEvent evt) {
                System.out.println("State0-Tree::" + evt.toString());
            }
        });

        s0.addOutgoingTransition(t0);
        s1.setOwningFSM(fsm);
        t1.setSource(s1);
        t0.setAction(a0);

    }

}
