package org.kevoree.modeling.sosym.eval.fsm;

import org.fsmsample.*;
import org.fsmsample.cloner.ModelCloner;
import org.fsmsample.container.KMFContainer;
import org.fsmsample.impl.DefaultFsmSampleFactory;
import org.fsmsample.loader.XMIModelLoader;
import org.fsmsample.serializer.ModelSerializer;
import org.fsmsample.serializer.XMIModelSerializer;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.lang.management.ManagementFactory;
import java.lang.management.MemoryMXBean;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 07/06/13
 * Time: 11:06
 */
public class KMFKotlinTest {

    private FsmSampleFactory factory = new DefaultFsmSampleFactory();
    private ModelCloner cloner = new ModelCloner();
    private XMIModelLoader loader = new XMIModelLoader();

    public void doTest(int stateNB, boolean flatBinary) throws IOException {
        MemoryMXBean beanMemory = ManagementFactory.getMemoryMXBean();
        System.out.println("===== STATES : " + stateNB + "=====");
        FSM model;
        if (flatBinary) {
            model = buildBinaryFsm(stateNB);
        } else {
            model = buildFlatFSM(stateNB);
        }
        /* Cleanup memory, not very precise but give an idea of fixed memory */
        System.gc();
        try {
            Thread.sleep(4000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        double mem = beanMemory.getHeapMemoryUsage().getUsed() / Math.pow(10, 6);
        System.out.println("FSM size: " + model.getOwnedState().size());
        System.out.println("Memory used: " + mem + " MB");

        FSM cloned = doClone(model);
        File tempFile = File.createTempFile("tempKMFBench", "xmi");
        doSave(cloned, tempFile);
        FSM reloaded = doLoad(tempFile);
        System.out.println("===== END STATES : " + stateNB + "=====");
        System.out.println("");
    }

    public FSM doClone(FSM model) {
        long cloneStart = System.nanoTime();
        cloner.setFsmSampleFactory(factory);
        FSM clonedModel = cloner.clone(model);
        long cloneEnd = System.nanoTime();
        String clonet = (cloneEnd - cloneStart) / Math.pow(10, 6) + "";
        System.out.println("Cloning time: " + clonet + " ms");
        return clonedModel;
    }

    public FSM doLoad(File modelFile) {
        long beforeLoad = System.nanoTime();
        FSM loaded = (FSM) loader.loadModelFromPath(modelFile).get(0);
        double loadTime = (System.nanoTime() - beforeLoad);
        String lt = "" + loadTime / Math.pow(10, 6);
        System.out.println("Load time: " + lt + " ms");
        return loaded;
    }

    public void doSave(FSM model, File modelFile) {
        ModelSerializer sav = new XMIModelSerializer();
        long marshalingStart = 0, marshalingEnd = 0;
        try {
            FileOutputStream os = new FileOutputStream(modelFile);
            marshalingStart = System.nanoTime();
            sav.serialize(model, os);
            marshalingEnd = System.nanoTime();
        } catch (Exception e) {
            e.printStackTrace();
        }
        String mt = (marshalingEnd - marshalingStart) / Math.pow(10, 6) + "";
        System.out.println("Marshaling time: " + mt + " ms");
    }

    public FSM buildFlatFSM(int STATES) throws IOException {
        long creationStart = System.nanoTime();
        FSM root = factory.createFSM();
        State initial = factory.createState();
        initial.setName("s0");
        root.setCurrentState(initial);
        root.setInitialState(initial);
        root.addOwnedState(initial);
        State s0 = initial;
        for (int i = 1; i < STATES; i++) {
            State s1 = factory.createState();
            s1.setName("s" + i);
            root.addOwnedState(s1);
            Transition t = factory.createTransition();
            /* */
            Action action2 = factory.createAction();
            action2.setName("action"+new Random().nextInt());
            t.setAction(action2);
            /* */
            t.setSource(s0); //Uses the set for one side
            s1.addIncomingTransition(t); //Uses the add for the other side
            t.setInput("ti" + i);
            t.setOutput("to" + i);
            s0 = s1;
            if (i % 100000 == 0) {
                System.out.println("" + i);
            }
        }
        long creationEnd = System.nanoTime();
        String ct = "" + (creationEnd - creationStart) / Math.pow(10, 6);
        System.out.println("Creation time: " + ct + " ms");
        return root;
    }

    public FSM buildBinaryFsm(int DEEP) throws IOException {
        List<State> previousLevel = new ArrayList<State>();
        long creationStart = System.nanoTime();
        FSM root = factory.createFSM();
        State initial = factory.createState();
        initial.setName("s0");
        root.setCurrentState(initial);
        root.setInitialState(initial);
        root.addOwnedState(initial);
        previousLevel.add(initial);
        int n = 1;
        for (int d = 1; d < DEEP; d++) {
            List<State> thisLevel = new ArrayList<State>();
            for (State s : previousLevel) {
                State leftState = factory.createState();
                State rightState = factory.createState();
                leftState.setName("s" + n++);
                rightState.setName("s" + n++);
                root.addOwnedState(leftState); //using add for one side
                rightState.setOwningFSM(root); //using add for the other side
                Transition leftTrans = factory.createTransition();

                Transition rightTrans = factory.createTransition();

                leftTrans.setSource(s);
                leftTrans.setTarget(leftState);
                s.addOutgoingTransition(rightTrans);
                rightState.addIncomingTransition(rightTrans);
                leftTrans.setInput("ti" + n);
                leftTrans.setOutput("to" + n);
                rightTrans.setInput("ti" + n);
                rightTrans.setOutput("to" + n);
                thisLevel.add(rightState);
                thisLevel.add(leftState);
            }
            previousLevel = thisLevel;
        }

        long creationEnd = System.nanoTime();
        String ct = "" + (creationEnd - creationStart) / Math.pow(10, 6);
        System.out.println("Creation time: " + ct + " ms");
        return root;
    }


    public static void main(String[] args) throws InterruptedException, IOException {
        KMFKotlinTest m = new KMFKotlinTest();
        m.doTest(100000, false); //warm up
        m.doTest(100000, false);
       // m.doTest(16, true);
       // m.doTest(17, true);
    }


}
