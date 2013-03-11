/**
 * Licensed under the GNU LESSER GENERAL PUBLIC LICENSE, Version 3, 29 June 2007;
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * 	http://www.gnu.org/licenses/lgpl-3.0.txt
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Authors:
 * 	Fouquet Francois
 * 	Nain Gregory
 */
package org.kevoree.modeling.sample.fsm.test;

import org.fsmSample.FSM;
import org.fsmSample.FsmSampleFactory;
import org.fsmSample.State;
import org.fsmSample.Transition;
import org.fsmSample.cloner.ModelCloner;
import org.fsmSample.impl.DefaultFsmSampleFactory;
import org.fsmSample.loader.ModelLoader;
import org.fsmSample.persistency.mdb.PersistentFsmSampleFactory;
import org.fsmSample.serializer.ModelSerializer;
import java.io.*;
import java.lang.management.ManagementFactory;
import java.lang.management.MemoryMXBean;
import java.util.ArrayList;
import java.util.List;

public class MainTest {

    FsmSampleFactory factory = new PersistentFsmSampleFactory(new File("/tmp/fsmTestDb" + System.currentTimeMillis()));


    //@Test
    public void flatFsmTest(PrintWriter statPr, int STATES) throws IOException {
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
        statPr.print(root.getOwnedState().size() + ";");

        System.out.println("Memory used: " + mem + " MB");
        statPr.print((mem + ";").replace(".", ","));

        String ct = "" + (creationEnd - creationStart) / Math.pow(10, 6);
        System.out.println("Creation time: " + ct + " ms");
        statPr.print(ct.replace(".", ",") + ";");


        long cloneStart = 0, cloneEnd = 0;

        ModelCloner cloner = new ModelCloner();
        cloner.setFsmSampleFactory(factory);
        cloneStart = System.nanoTime();
        cloner.clone(root);
        cloneEnd = System.nanoTime();

        String clonet = (cloneEnd - cloneStart) / Math.pow(10, 6) + "";
        System.out.println("Cloning time: " + clonet + " ms");


        ModelSerializer sav = new ModelSerializer();

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
        statPr.print(mt.replace(".", ",") + ";");

        long beforeLoad = System.nanoTime();
        FSM loaded = new ModelLoader().loadModelFromPath(tempFile).get(0);
        double loadTime = (System.nanoTime() - beforeLoad);// / Math.pow(10,6);
        String lt = "" + loadTime / Math.pow(10, 6);
        System.out.println("Load time: " + lt + " ms");
        statPr.println(lt.replace(".", ","));
        statPr.flush();
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
        ModelSerializer sav = new ModelSerializer();

        File tempFile = File.createTempFile("tempKMFBench", "xmi");
        //tempFile.deleteOnExit();

        long marshalingStart = 0, marshalingEnd = 0;

        try {

            FileOutputStream os = new FileOutputStream(tempFile);
            //PrintWriter pr = new PrintWriter(os);

            marshalingStart = System.nanoTime();
            sav.serialize(root, os);
            //pr.println(sav.serialize(root));
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
        FSM loaded = new ModelLoader().loadModelFromPath(tempFile).get(0);
        double loadTime = (System.nanoTime() - beforeLoad);// / Math.pow(10,6);
        String lt = "" + loadTime / Math.pow(10, 6);
        System.out.println("Load time: " + lt + " ms");
        statPr.println(lt.replace(".", ","));
        statPr.flush();
        //System.out.println("Initial State: "+ loaded.getInitialState());

        //assertTrue("Loading time overpassed 1second for " + loaded.getOwnedState().size() + " elements", loadTime < 1000);

        // tempFile.delete();

        System.out.println("===== END DEEP :" + DEEP + "=====");
        System.out.println("");
    }


    public static void main(String[] args) throws InterruptedException, IOException {
        MainTest m = new MainTest();


        //=====  Flat FSM test //

        File f = File.createTempFile("KMF_FLAT_FSM_No_Opposite_TEST-" + System.currentTimeMillis(), ".csv");
        PrintWriter pr = new PrintWriter(f);
        pr.println("States;Memory;Creation;Marshaling;Loading");
        int step = 250000;
        for (int i = 1; i * step <= 250000; i++) {
            m.flatFsmTest(pr, i * step);
        }
        pr.flush();
        pr.close();

        System.out.println("results in " + f.getAbsolutePath());

        //=====  BinaryTreeLike FSM test //

        File f2 = File.createTempFile("KMF_BINARY_FSM_No_Opposite_TEST-" + System.currentTimeMillis(), ".csv");
        PrintWriter pr2 = new PrintWriter(f2);
        pr2.println("Deep;Memory;States;Creation;Marshaling;Loading");
        for (int i = 1; Math.pow(2, i) < 750000; i++) {
            m.binaryFsmTest(pr2, i);
        }
        pr2.flush();
        pr2.close();

        System.out.println("results in " + f.getAbsolutePath());

    }
}
