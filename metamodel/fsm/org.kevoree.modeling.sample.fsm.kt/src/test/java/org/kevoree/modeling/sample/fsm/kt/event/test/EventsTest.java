package org.kevoree.modeling.sample.fsm.kt.event.test;/*
* Author : Gregory Nain (developer.name@uni.lu)
* Date : 05/07/13
*/

import org.fsmsample.FSM;
import org.fsmsample.FsmSampleFactory;
import org.fsmsample.State;
import org.fsmsample.Transition;
import org.fsmsample.events.ModelElementListener;
import org.fsmsample.events.ModelEvent;
import org.fsmsample.events.ModelTreeListener;
import org.fsmsample.impl.DefaultFsmSampleFactory;
import org.junit.Test;

public class EventsTest {

    @Test
    public void baseTest() {
        FsmSampleFactory factory = new DefaultFsmSampleFactory();

        FSM fsm = factory.createFSM();

        fsm.addModelElementListener(new ModelElementListener() {
            @Override
            public void elementChanged(ModelEvent evt) {
                System.out.println("FSM Element Listener:\n\tsrc: " + evt.getSourcePath()
                        + "\n\ttype:" + evt.getType().name()
                        + "\n\telementAttributeType:" + evt.getElementAttributeType().name()
                        + "\n\telementAttributeName:" + evt.getElementAttributeName()
                        + "\n\tvalue:" + evt.getValue());
            }
        });

        fsm.addModelTreeListener(new ModelTreeListener() {
            @Override
            public void elementChanged(ModelEvent evt) {
                System.out.println("FSM Tree Listener:\n\tsrc: " + evt.getSourcePath()
                        + "\n\ttype:" + evt.getType().name()
                        + "\n\telementAttributeType:" + evt.getElementAttributeType().name()
                        + "\n\telementAttributeName:" + evt.getElementAttributeName()
                        + "\n\tvalue:" + evt.getValue());
            }
        });


        State s0 = factory.createState();
        fsm.addOwnedState(s0);

        Transition t0 = factory.createTransition();
        s0.addOutgoingTransition(t0);


    }




}
