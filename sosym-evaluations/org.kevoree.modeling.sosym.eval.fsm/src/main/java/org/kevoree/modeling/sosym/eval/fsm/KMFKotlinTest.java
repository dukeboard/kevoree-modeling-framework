package org.kevoree.modeling.sosym.eval.fsm;

import org.fsmsample.FSM;
import org.fsmsample.FsmSampleFactory;
import org.fsmsample.State;
import org.fsmsample.Transition;
import org.fsmsample.cloner.ModelCloner;
import org.fsmsample.impl.DefaultFsmSampleFactory;
import org.fsmsample.loader.XMIModelLoader;
import org.fsmsample.serializer.ModelSerializer;
import org.fsmsample.serializer.XMIModelSerializer;

import java.io.*;
import java.lang.management.ManagementFactory;
import java.lang.management.MemoryMXBean;
import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 07/06/13
 * Time: 11:06
 */
public class KMFKotlinTest {

    FsmSampleFactory factory = new DefaultFsmSampleFactory();// PersistentFsmSampleFactory(new File("/tmp/fsmTestDb" + System.currentTimeMillis()));


    //@Test
    public void flatFsmTest(int STATES) throws IOException {
        MemoryMXBean beanMemory = ManagementFactory.getMemoryMXBean();
        System.out.println("===== STATES : " + STATES + "=====");
        long creationStart = System.nanoTime();
        FSM root = factory.createFSM();
        State initial = factory.createState();
        initial.setName("s0");
        //initial.setOwningFSM(root);
        root.setCurrentState(initial);
        root.setInitialState(initial);
        root.addOwnedState(initial);

        State s0 = initial;

        for (int i = 1; i < STATES; i++) {

            State s1 = factory.createState();
            s1.setName("s" + i);
            root.addOwnedState(s1);
            Transition t = factory.createTransition();
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

        System.gc();
        try {
            Thread.sleep(4000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        double mem = beanMemory.getHeapMemoryUsage().getUsed() / Math.pow(10, 6);

        System.out.println("FSM size: " + root.getOwnedState().size());
       // statPr.print(root.getOwnedState().size() + ";");

        System.out.println("Memory used: " + mem + " MB");
       // statPr.print((mem + ";").replace(".", ","));

        String ct = "" + (creationEnd - creationStart) / Math.pow(10, 6);
        System.out.println("Creation time: " + ct + " ms");
      //  statPr.print(ct.replace(".", ",") + ";");


        long cloneStart = 0, cloneEnd = 0;

        ModelCloner cloner = new ModelCloner();
        cloner.setFsmSampleFactory(factory);
        cloneStart = System.nanoTime();
        cloner.clone(root);
        cloneEnd = System.nanoTime();

        String clonet = (cloneEnd - cloneStart) / Math.pow(10, 6) + "";
        System.out.println("Cloning time: " + clonet + " ms");


        ModelSerializer sav = new XMIModelSerializer();

        File tempFile = File.createTempFile("tempKMFBench", "xmi");
        //  tempFile.deleteOnExit();

        long marshalingStart = 0, marshalingEnd = 0;

        try {
            FileOutputStream os = new FileOutputStream(tempFile);
            //ByteArrayOutputStream os = new ByteArrayOutputStream();

            //PrintWriter pr = new PrintWriter(os);

            marshalingStart = System.nanoTime();
            sav.serialize(root, os);
            //pr.println(sav.serialize(root));
            marshalingEnd = System.nanoTime();
            //pr.flush();
            //pr.close();
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        //end = System.currentTimeMillis();
        String mt = (marshalingEnd - marshalingStart) / Math.pow(10, 6) + "";
        System.out.println("Marshaling time: " + mt + " ms");
        //statPr.print(mt.replace(".", ",") + ";");

        long beforeLoad = System.nanoTime();
        FSM loaded = (FSM) new XMIModelLoader().loadModelFromPath(tempFile).get(0);
        double loadTime = (System.nanoTime() - beforeLoad);// / Math.pow(10,6);
        String lt = "" + loadTime / Math.pow(10, 6);
        System.out.println("Load time: " + lt + " ms");
       // statPr.println(lt.replace(".", ","));
       // statPr.flush();
        //System.out.println("Initial State: "+ loaded.getInitialState());

        //assertTrue("Loading time overpassed 1second for " + loaded.getOwnedState().size() + " elements", loadTime < 1000);

        // tempFile.delete();

        System.out.println("===== END STATES : " + STATES + "=====");
        System.out.println("");

    }

    //@Test
    public void binaryFsmTest(PrintWriter statPr, int DEEP) throws IOException {
        MemoryMXBean beanMemory = ManagementFactory.getMemoryMXBean();

        System.out.println("===== DEEP : " + DEEP + "=====");
        statPr.print(DEEP + ";");

        //double mem = beanMemory.getHeapMemoryUsage().getUsed() / Math.pow(10,6)  ;
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

        System.gc();
        try {
            Thread.sleep(4000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        double mem = beanMemory.getHeapMemoryUsage().getUsed() / Math.pow(10, 6);
        System.out.println("Memory used: " + mem + " MB");
        statPr.print((mem + ";").replace(".", ","));

        System.out.println("FSM size: " + root.getOwnedState().size());
        statPr.print(root.getOwnedState().size() + ";");

        String ct = "" + (creationEnd - creationStart) / Math.pow(10, 6);
        System.out.println("Creation time: " + ct + " ms");
        statPr.print(ct.replace(".", ",") + ";");
        ModelSerializer sav = new XMIModelSerializer();

        File tempFile = File.createTempFile("tempKMFBench", "xmi");
        tempFile.deleteOnExit();

        long marshalingStart = 0, marshalingEnd = 0;

        try {
            FileOutputStream os = new FileOutputStream(tempFile);
            marshalingStart = System.nanoTime();
            sav.serialize(root, os);
            marshalingEnd = System.nanoTime();
            //pr.flush();
            //pr.close();
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        //end = System.currentTimeMillis();
        String mt = (marshalingEnd - marshalingStart) / Math.pow(10, 6) + "";
        System.out.println("Marshaling time: " + mt + " ms");
        statPr.print(mt.replace(".", ",") + ";");

        long beforeLoad = System.nanoTime();
        FSM loaded = (FSM) new XMIModelLoader().loadModelFromPath(tempFile).get(0);
        double loadTime = (System.nanoTime() - beforeLoad);// / Math.pow(10,6);
        String lt = "" + loadTime / Math.pow(10, 6);
        System.out.println("Load time: " + lt + " ms");
        statPr.println(lt.replace(".", ","));
        statPr.flush();
        tempFile.delete();

        System.out.println("===== END DEEP :" + DEEP + "=====");
        System.out.println("");
    }


    public static void main(String[] args) throws InterruptedException, IOException {
        KMFKotlinTest m = new KMFKotlinTest();
        //=====  Flat FSM test //
        int step = 50000;
        for (int i = 1; i * step <= 100000; i++) {
            m.flatFsmTest(/*pr,*/ i * step);
        }

        //=====  BinaryTreeLike FSM test //
        /*
        File f2 = File.createTempFile("KMF_BINARY_FSM_No_Opposite_TEST-" + System.currentTimeMillis(), ".csv");
        PrintWriter pr2 = new PrintWriter(f2);
        pr2.println("Deep;Memory;States;Creation;Marshaling;Loading");
        for (int i = 1; Math.pow(2, i) < 750000; i++) {
            m.binaryFsmTest(pr2, i);
        }
        pr2.flush();
        pr2.close();
        System.out.println("results in " + f.getAbsolutePath());
        */
    }


}
