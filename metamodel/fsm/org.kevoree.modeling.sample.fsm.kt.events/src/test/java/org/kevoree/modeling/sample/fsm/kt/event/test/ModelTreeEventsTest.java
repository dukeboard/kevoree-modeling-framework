package org.kevoree.modeling.sample.fsm.kt.event.test;/*
* Author : Gregory Nain (developer.name@uni.lu)
* Date : 05/07/13
*/

import org.fsmsample.*;
import org.fsmsample.events.*;
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

    //@Test
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

        fsm.addModelTreeListener(new ModelTreeListener() {
            @Override
            public void elementChanged(ModelEvent evt) {

                System.out.println("FSM::" +evt.toString());
                //assertEvent(evt, t0.path(), "name", ElementAttributeType.Attribute, EventType.Set, "t0");
                setNameT0_Fsm.release();
            }
        });

        s0.addModelTreeListener(new ModelTreeListener() {
            @Override
            public void elementChanged(ModelEvent evt) {

                System.out.println("S0::" +evt.toString());
               // assertEvent(evt, t0.path(), "name", ElementAttributeType.Attribute, EventType.Set, "t0");
                setNameT0_S0.release();
            }
        });

        t0.setName("t0");
        try {
            assertTrue("Event never received on Fsm", setNameT0_Fsm.tryAcquire(500, TimeUnit.MILLISECONDS));
            assertTrue("Event never received on S0.", setNameT0_S0.tryAcquire(500, TimeUnit.MILLISECONDS));
        } catch (InterruptedException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }


        fsm.removeAllModelTreeListeners();
        s0.removeAllModelTreeListeners();


        fsm.addModelTreeListener(new ModelTreeListener() {
            @Override
            public void elementChanged(ModelEvent evt) {

                //assertEvent(evt, t1.path(), "name", ElementAttributeType.Attribute, EventType.Set, "t1");
                setNameT1_Fsm.release();
            }
        });

        s0.addModelTreeListener(new ModelTreeListener() {
            @Override
            public void elementChanged(ModelEvent evt) {

                //assertEvent(evt, t1.path(), "name", ElementAttributeType.Attribute, EventType.Set, "t1");
                try {
                    setNameT1_S0.acquire();
                } catch (InterruptedException e) {
                    e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                }
            }
        });


        t1.setName("t1");
        try {
            assertTrue("Event never received on Fsm", setNameT1_Fsm.tryAcquire(500, TimeUnit.MILLISECONDS));
            assertTrue("Event received on S0.", setNameT1_S0.tryAcquire(500, TimeUnit.MILLISECONDS));
        } catch (InterruptedException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }






    }


}
