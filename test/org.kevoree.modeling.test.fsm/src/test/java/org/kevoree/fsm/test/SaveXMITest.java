package org.kevoree.fsm.test;

import fsmsample.*;
import org.junit.Test;
import org.kevoree.modeling.api.*;

import java.util.concurrent.Semaphore;

public class SaveXMITest {


    @Test
    public void saveXmiTest() {

        FSMModel fsmU = new FSMModel();
        fsmU.connect();
        FSMUniverse fsmDim = fsmU.newUniverse();
        FSMView localView = fsmDim.time(0L);

        FSM fsm = localView.createFSM();
        fsm.setName("NewFSM_1");
        localView.setRoot(fsm);

        State s1 = localView.createState();
        s1.setName("State1");
        fsm.addOwnedState(s1);
        fsm.setInitialState(s1);
        fsm.setCurrentState(s1);

        State s2 = localView.createState();
        s2.setName("State2");
        fsm.addOwnedState(s2);
        fsm.setFinalState(s2);

        Action a1 = localView.createAction();
        a1.setName("Action1");

        Transition t1 = localView.createTransition();
        t1.setName("Trans1");
        s1.addOutgoingTransition(t1);
        s2.addIncomingTransition(t1);

        t1.setAction(a1);

        Semaphore sema = new Semaphore(0);
        String[] model = new String[1];

        localView.lookup(fsm.uuid()).then((root) -> {
            System.out.println("Serialize !");
            localView.xmi().save(fsm).then(new Callback<String>() {
                @Override
                public void on(String s) {
                    model[0] = s;
                    sema.release();
                }
            });

        });

        try {
            sema.acquire();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("Model:" + model[0]);

        System.out.println("Loading !");
        FSMUniverse fsmDim2 = fsmU.newUniverse();
        FSMView loadView = fsmDim2.time(0L);
        loadView.xmi().load(model[0]).then(new Callback<Throwable>() {
            @Override
            public void on(Throwable error) {
                System.out.println("Loaded");
                if (error != null) {
                    error.printStackTrace();
                } else {
                    loadView.select("/").then(new Callback<KObject[]>() {
                        @Override
                        public void on(KObject[] kObjects) {
                            System.out.println("Roots:" + kObjects.length);
                            if (kObjects.length == 1) {

                                KObject kObject = kObjects[0];
                                kObject.visit(new ModelVisitor() {
                                    @Override
                                    public VisitResult visit(KObject elem) {
                                        System.out.println(elem.uuid());
                                        return VisitResult.CONTINUE;
                                    }
                                }, VisitRequest.CONTAINED);
                                sema.release();
                            }
                        }
                    });
                }
            }
        });
        try {
            sema.acquire();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}