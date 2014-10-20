package org.kevoree.fsm.test;

import fsmsample.*;
import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.ModelVisitor;
import org.kevoree.modeling.api.data.MemoryKDataBase;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.concurrent.Semaphore;


/**
 * Created by gregory.nain on 16/10/2014.
 */
public class SaveXMITest {


    @Test
    public void saveXmiTest() {

        FSMUniverse fsmU = new FSMUniverse(new MemoryKDataBase());
        FSMDimension fsmDim = fsmU.create();
        FSMView localView = fsmDim.time(0L);

        FSM fsm = localView.createFSM();
        fsm.setName("NewFSM_1");
        localView.root(fsm);

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

        try {
            Path f = Files.createTempFile("XMISerialized", ".xmi");
            System.out.println("Serialization in " + f.toUri().toString());
            /*
                */
            localView.lookup(fsm.kid(), (root) -> {
                try {
                    System.out.println("Serialize !");
                    localView.createXMISerializer().serializeToStream(fsm, new FileOutputStream(f.toFile()), (error) -> {
                        if (error != null) {
                            error.printStackTrace();
                        }
                        sema.release();
                    });
                } catch (FileNotFoundException e) {
                    e.printStackTrace();
                }
            });

            try {
                sema.acquire();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            System.out.println("Loading !");
            FSMDimension fsmDim2 = fsmU.create();
            FSMView loadView = fsmDim2.time(0L);

            loadView.createXMILoader().loadModelFromStream(new FileInputStream(f.toFile()),new Callback<KObject>() {
                @Override
                public void on(KObject kObject) {
                    kObject.treeVisit(new ModelVisitor() {
                        @Override
                        public VisitResult visit(KObject elem) {
                            System.out.println(elem.kid());
                            return VisitResult.CONTINUE;
                        }
                    },(end)->{});
                    sema.release();
                }
            });
            try {
                sema.acquire();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
