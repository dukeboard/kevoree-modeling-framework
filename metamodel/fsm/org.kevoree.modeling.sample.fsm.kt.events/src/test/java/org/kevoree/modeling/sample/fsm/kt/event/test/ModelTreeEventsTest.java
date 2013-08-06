package org.kevoree.modeling.sample.fsm.kt.event.test;/*
* Author : Gregory Nain (developer.name@uni.lu)
* Date : 05/07/13
*/

import org.fsmsample.*;
import org.fsmsample.impl.DefaultFsmSampleFactory;
import org.kevoree.modeling.api.util.ActionType;
import org.kevoree.modeling.api.util.ElementAttributeType;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.kevoree.modeling.api.events.*;


public class ModelTreeEventsTest {

    FsmSampleFactory factory = new DefaultFsmSampleFactory();
    Semaphore setNameT0_Fsm = new Semaphore(0);
    Semaphore setNameT0_S0 = new Semaphore(0);

    Semaphore setNameT1_Fsm = new Semaphore(0);
    Semaphore setNameT1_S0 = new Semaphore(1);


    private void assertEvent(ModelEvent evt, String expectedPath, String expectedElementAttributeName, int expectedElementAttributeType, int expectedEventType, Object expectedValue ) {
        assertTrue("Source is not correct. Expected:" + expectedPath + " Was:" + evt.getSourcePath() , evt.getSourcePath().equals(expectedPath));
        assertTrue("ElementAttributeName not correct. Expected: "+expectedElementAttributeName+" Was:" + evt.getElementAttributeName(), evt.getElementAttributeName().equals(expectedElementAttributeName));
        assertTrue("ElementAttributeType not correct. Expected: "+expectedElementAttributeType+" Was:" + evt.getElementAttributeType(), evt.getElementAttributeType()==expectedElementAttributeType);
        assertTrue("EventType is not correct. Expected:" +expectedEventType+" Was:" + evt.getType(), evt.getType() == expectedEventType);
        assertTrue("Event Value is not correct. Expected:" +expectedValue+" Was:" + evt.getValue(), evt.getValue()==expectedValue);
    }

    private void assertEventWithList(ModelEvent evt, String expectedPath, String expectedElementAttributeName, int expectedElementAttributeType, int expectedEventType, List<? extends Object> expectedValues ) {
        assertTrue("Source is not correct. Expected:" + expectedPath + " Was:" + evt.getSourcePath() , evt.getSourcePath().equals(expectedPath));
        assertTrue("ElementAttributeName not correct. Expected: "+expectedElementAttributeName+" Was:" + evt.getElementAttributeName(), evt.getElementAttributeName().equals(expectedElementAttributeName));
        assertTrue("ElementAttributeType not correct. Expected: "+expectedElementAttributeType+" Was:" + evt.getElementAttributeType(), evt.getElementAttributeType()==expectedElementAttributeType);
        assertTrue("EventType is not correct. Expected:" +expectedEventType+" Was:" + evt.getType(), evt.getType() == expectedEventType);
        assertTrue("Event Value is not correct. Expected:" +expectedValues+" Was:" + evt.getValue(), ((List)evt.getValue()).containsAll(expectedValues));
    }

    @Test
    public void setAttributeTest() {
        final FSM fsm = factory.createFSM();
        fsm.setName("fsm");
        final State s0 = factory.createState();
        s0.setName("s0");
        s0.setVersion("v1.2.0");
        final State s1 = factory.createState();
        s1.setName("s1");
        s1.setVersion("v1.0.1-SNAPSHOT");
        final Transition t0 = factory.createTransition();
        t0.setName("tt0");
        final Transition t1 = factory.createTransition();
        t1.setName("tt1");

        fsm.addOwnedState(s0);
        fsm.addOwnedState(s1);
        s0.addOutgoingTransition(t0);
        s1.addOutgoingTransition(t1);
        final String originalT0Path = t0.path();
        final String originalT1Path = t1.path();

        fsm.addModelTreeListener(new ModelElementListener() {
            @Override
            public void elementChanged(ModelEvent evt) {

                System.out.println("FSM::" +evt.toString());
                if(evt.getSourcePath().equals(originalT0Path) && evt.getType() == ActionType.instance$.getSET() && evt.getElementAttributeName().equals("name")) {
                    assertEvent(evt, originalT0Path, "name", ElementAttributeType.instance$.getATTRIBUTE(), ActionType.instance$.getSET(), "t0");
                    setNameT0_Fsm.release();
                }
            }
        });

        s0.addModelTreeListener(new ModelElementListener() {
            @Override
            public void elementChanged(ModelEvent evt) {

                System.out.println("S0::" +evt.toString());
                if(evt.getSourcePath().equals(originalT0Path) && evt.getType() == ActionType.instance$.getSET() && evt.getElementAttributeName().equals("name")) {
                    assertEvent(evt, originalT0Path, "name", ElementAttributeType.instance$.getATTRIBUTE(), ActionType.instance$.getSET(), "t0");
                    setNameT0_S0.release();
                }

            }
        });

        t0.setName("t0");
        try {
            assertTrue("Event never received on Fsm::T0", setNameT0_Fsm.tryAcquire(800, TimeUnit.MILLISECONDS));
            assertTrue("Event never received on S0::T0.", setNameT0_S0.tryAcquire(800, TimeUnit.MILLISECONDS));
        } catch (InterruptedException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }


        fsm.removeAllModelTreeListeners();
        s0.removeAllModelTreeListeners();


        fsm.addModelTreeListener(new ModelElementListener() {
            @Override
            public void elementChanged(ModelEvent evt) {

                if(evt.getSourcePath().equals(originalT1Path) && evt.getType() == ActionType.instance$.getSET() && evt.getElementAttributeName().equals("name")) {
                    assertEvent(evt, originalT1Path, "name", ElementAttributeType.instance$.getATTRIBUTE(), ActionType.instance$.getSET(), "t1");
                    setNameT1_Fsm.release();
                }
            }
        });

        s0.addModelTreeListener(new ModelElementListener() {
            @Override
            public void elementChanged(ModelEvent evt) {

                //assertEvent(evt, t1.path(), "name", ElementAttributeType.Attribute, EventType.Set, "t1");
                try {
                    if(evt.getSourcePath().equals(originalT1Path) && evt.getType() == ActionType.instance$.getSET() && evt.getElementAttributeName().equals("name")) {
                        assertEvent(evt, originalT1Path, "name", ElementAttributeType.instance$.getATTRIBUTE(), ActionType.instance$.getSET(), "t1");
                        setNameT1_S0.acquire();
                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                }
            }
        });


        t1.setName("t1");
        try {
            assertTrue("Event never received on Fsm::T1", setNameT1_Fsm.tryAcquire(800, TimeUnit.MILLISECONDS));
            assertTrue("Event received on S0::T1", setNameT1_S0.tryAcquire(800, TimeUnit.MILLISECONDS));
        } catch (InterruptedException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }






    }


}
