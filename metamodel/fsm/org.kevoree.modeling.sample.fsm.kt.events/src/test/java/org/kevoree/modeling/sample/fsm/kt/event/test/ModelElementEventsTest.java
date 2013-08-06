package org.kevoree.modeling.sample.fsm.kt.event.test;/*
* Author : Gregory Nain (developer.name@uni.lu)
* Date : 05/07/13
*/

import org.fsmsample.FSM;
import org.fsmsample.FsmSampleFactory;
import org.fsmsample.State;
import org.fsmsample.Transition;
import org.fsmsample.impl.DefaultFsmSampleFactory;
import org.kevoree.modeling.api.util.ActionType;
import org.kevoree.modeling.api.util.ElementAttributeType;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;

import org.kevoree.modeling.api.events.*;



import static org.junit.Assert.assertTrue;

public class ModelElementEventsTest {

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

        final Transition t0 = factory.createTransition();
        final String value = "inputValue";
        t0.setName("t0");
        t0.addModelElementListener(new ModelElementListener() {
            @Override
            public void elementChanged(ModelEvent evt) {
                assertEvent(evt, t0.path(), "input", ElementAttributeType.instance$.getATTRIBUTE(), ActionType.instance$.getSET(), value);
                setAttribute.release();
            }
        });
        t0.setInput(value);
        try {
            assertTrue("Event never received.", setAttribute.tryAcquire(500, TimeUnit.MILLISECONDS));
        } catch (InterruptedException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
    }

    @Test
    public void unsetAttributeTest() {
        final Transition t0 = factory.createTransition();
        final String value = null;
        t0.setName("t0");
        t0.addModelElementListener(new ModelElementListener() {
            @Override
            public void elementChanged(ModelEvent evt) {
                assertEvent(evt, t0.path(), "input", ElementAttributeType.instance$.getATTRIBUTE(), ActionType.instance$.getSET(), value);
                unsetAttribute.release();
            }
        });
        t0.setInput(value);
        try {
            assertTrue("Event never received.", unsetAttribute.tryAcquire(500, TimeUnit.MILLISECONDS));
        } catch (InterruptedException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
    }

    @Test
    public void setReferenceTest() {
        final Transition t0 = factory.createTransition();
        final State s0 = factory.createState();
        t0.setName("t0");
        t0.addModelElementListener(new ModelElementListener() {
            @Override
            public void elementChanged(ModelEvent evt) {
                assertEvent(evt, t0.path(), "source", ElementAttributeType.instance$.getREFERENCE(), ActionType.instance$.getSET(), s0);
                setReference.release();
            }
        });
        t0.setSource(s0);
        try {
            assertTrue("Event never received.", setReference.tryAcquire(500, TimeUnit.MILLISECONDS));
        } catch (InterruptedException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
    }

    @Test
    public void unsetReferenceTest() {
        final Transition t0 = factory.createTransition();
        final State s0 = factory.createState();
        s0.setName("s0");

        t0.setName("t0");
        t0.setSource(s0);
        t0.addModelElementListener(new ModelElementListener() {
            @Override
            public void elementChanged(ModelEvent evt) {
                assertEvent(evt, t0.path(), "source", ElementAttributeType.instance$.getREFERENCE(), ActionType.instance$.getSET(), null);
                unsetReference.release();
            }
        });
        t0.setSource(null);
        try {
            assertTrue("Event never received.", unsetReference.tryAcquire(500, TimeUnit.MILLISECONDS));
        } catch (InterruptedException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
    }

    @Test
    public void addAllReferenceTest() {
        final State s0 = factory.createState();
        final Transition t0 = factory.createTransition();
        final Transition t1 = factory.createTransition();
        s0.setName("s0");
        s0.setVersion("v.1.0.2");
        t0.setName("t0");
        t1.setName("t1");
        final ArrayList<Transition> transitionsList = new ArrayList<Transition>();
        transitionsList.add(t0);
        transitionsList.add(t1);
        s0.addModelElementListener(new ModelElementListener() {
            @Override
            public void elementChanged(ModelEvent evt) {
                assertEventWithList(evt, s0.path(), "incomingTransition", ElementAttributeType.instance$.getREFERENCE(), ActionType.instance$.getADD_ALL(), transitionsList);
                addAllReference.release();
            }
        });
        s0.addAllIncomingTransition(transitionsList);
        try {
            assertTrue("Event never received.", addAllReference.tryAcquire(500, TimeUnit.MILLISECONDS));
        } catch (InterruptedException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
    }

    @Test
    public void removeAllReferenceTest() {
        final State s0 = factory.createState();
        final Transition t0 = factory.createTransition();
        final Transition t1 = factory.createTransition();
        s0.setName("s0");
        s0.setVersion("v.1.0.2");
        t0.setName("t0");
        t1.setName("t1");
        final ArrayList<Transition> transitionsList = new ArrayList<Transition>();
        transitionsList.add(t0);
        transitionsList.add(t1);
        s0.addAllIncomingTransition(transitionsList);
        s0.addModelElementListener(new ModelElementListener() {
            @Override
            public void elementChanged(ModelEvent evt) {
                assertEventWithList(evt, s0.path(), "incomingTransition", ElementAttributeType.instance$.getREFERENCE(), ActionType.instance$.getREMOVE_ALL(), transitionsList);
                removeAllReference.release();
            }
        });
        s0.removeAllIncomingTransition();
        try {
            assertTrue("Event never received.", removeAllReference.tryAcquire(500, TimeUnit.MILLISECONDS));
        } catch (InterruptedException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
    }

    @Test
    public void addAllContainmentTest() {
        final State s0 = factory.createState();
        final Transition t0 = factory.createTransition();
        final Transition t1 = factory.createTransition();
        s0.setName("s0");
        s0.setVersion("v.1.0.2");
        t0.setName("t0");
        t1.setName("t1");
        final ArrayList<Transition> transitionsList = new ArrayList<Transition>();
        transitionsList.add(t0);
        transitionsList.add(t1);
        s0.addModelElementListener(new ModelElementListener() {
            @Override
            public void elementChanged(ModelEvent evt) {
                assertEventWithList(evt, s0.path(), "outgoingTransition", ElementAttributeType.instance$.getCONTAINMENT(), ActionType.instance$.getADD_ALL(), transitionsList);
                addAllContainment.release();
            }
        });
        s0.addAllOutgoingTransition(transitionsList);
        try {
            assertTrue("Event never received.", addAllContainment.tryAcquire(500, TimeUnit.MILLISECONDS));
        } catch (InterruptedException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
    }

    @Test
    public void removeAllContainmentTest() {
        final State s0 = factory.createState();
        final Transition t0 = factory.createTransition();
        final Transition t1 = factory.createTransition();
        s0.setName("s0");
        s0.setVersion("v.1.0.2");
        t0.setName("t0");
        t1.setName("t1");
        final ArrayList<Transition> transitionsList = new ArrayList<Transition>();
        transitionsList.add(t0);
        transitionsList.add(t1);
        s0.addAllOutgoingTransition(transitionsList);
        s0.addModelElementListener(new ModelElementListener() {
            @Override
            public void elementChanged(ModelEvent evt) {
                assertEventWithList(evt, s0.path(), "outgoingTransition", ElementAttributeType.instance$.getCONTAINMENT(), ActionType.instance$.getREMOVE_ALL(), transitionsList);
                removeAllContainment.release();
            }
        });
        s0.removeAllOutgoingTransition();
        try {
            assertTrue("Event never received.", removeAllContainment.tryAcquire(500, TimeUnit.MILLISECONDS));
        } catch (InterruptedException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }

    }

    @Test
    public void addReferenceTest() {
        final State s0 = factory.createState();
        final Transition t0 = factory.createTransition();
        s0.setName("s0");
        s0.setVersion("v.1.0.2");
        t0.setName("t0");
        s0.addModelElementListener(new ModelElementListener() {
            @Override
            public void elementChanged(ModelEvent evt) {
                assertEvent(evt, s0.path(), "incomingTransition", ElementAttributeType.instance$.getREFERENCE(), ActionType.instance$.getADD(), t0);
                addReference.release();
            }
        });
        s0.addIncomingTransition(t0);
        try {
            assertTrue("Event never received.", addReference.tryAcquire(500, TimeUnit.MILLISECONDS));
        } catch (InterruptedException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
    }

    @Test
    public void removeReferenceTest() {
        final State s0 = factory.createState();
        final Transition t0 = factory.createTransition();
        s0.setName("s0");
        s0.setVersion("v.1.0.2");
        t0.setName("t0");
        s0.addIncomingTransition(t0);
        s0.addModelElementListener(new ModelElementListener() {
            @Override
            public void elementChanged(ModelEvent evt) {
                assertEvent(evt, s0.path(), "incomingTransition", ElementAttributeType.instance$.getREFERENCE(), ActionType.instance$.getREMOVE(), t0);
                removeReference.release();
            }
        });
        s0.removeIncomingTransition(t0);
        try {
            assertTrue("Event never received.", removeReference.tryAcquire(500, TimeUnit.MILLISECONDS));
        } catch (InterruptedException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
    }

    @Test
    public void addContainmentTest() {
        final State s0 = factory.createState();
        final Transition t0 = factory.createTransition();
        s0.setName("s0");
        s0.setVersion("v.1.0.2");
        t0.setName("t0");

        s0.addModelElementListener(new ModelElementListener() {
            @Override
            public void elementChanged(ModelEvent evt) {
                assertEvent(evt, s0.path(), "outgoingTransition", ElementAttributeType.instance$.getCONTAINMENT(), ActionType.instance$.getADD(), t0);
                addContainment.release();
            }
        });
        s0.addOutgoingTransition(t0);
        try {
            assertTrue("Event never received.", addContainment.tryAcquire(500, TimeUnit.MILLISECONDS));
        } catch (InterruptedException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
    }

    @Test
    public void removeContainmentTest() {
        final State s0 = factory.createState();
        final Transition t0 = factory.createTransition();
        s0.setName("s0");
        s0.setVersion("v.1.0.2");
        t0.setName("t0");
        s0.addOutgoingTransition(t0);
        s0.addModelElementListener(new ModelElementListener() {
            @Override
            public void elementChanged(ModelEvent evt) {
                assertEvent(evt, s0.path(), "outgoingTransition", ElementAttributeType.instance$.getCONTAINMENT(), ActionType.instance$.getREMOVE(), t0);
                removeContainment.release();
            }
        });
        s0.removeOutgoingTransition(t0);
        try {
            assertTrue("Event never received.", removeContainment.tryAcquire(500, TimeUnit.MILLISECONDS));
        } catch (InterruptedException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }

    }

}
