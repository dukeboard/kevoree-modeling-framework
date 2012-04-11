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
package org.kevoree.modeling.emf.sample.fsm.test;

import org.fsmSample.FSM;
import org.fsmSample.FsmSampleFactory;
import org.fsmSample.State;
import org.fsmSample.Transition;
import org.fsmSample.loader.FSMLoader;
import org.fsmSample.serializer.ModelSerializer;

import java.io.*;
import java.lang.management.ManagementFactory;
import java.lang.management.MemoryMXBean;
import java.util.ArrayList;
import java.util.List;


public class MainWOOppositeTest {

    //@Test
    public void flatFsmTest(PrintWriter statPr,int STATES) throws IOException {
        MemoryMXBean beanMemory = ManagementFactory.getMemoryMXBean();

        System.out.println("===== STATES : " + STATES + "=====");

        long creationStart = System.nanoTime();

        FSM root = FsmSampleFactory.createFSM();
        State initial = FsmSampleFactory.createState();
        initial.setName("s0");
        initial.setOwningFSM(root);
        root.setCurrentState(initial);
        root.setInitialState(initial);
        root.addOwnedState(initial);

       State s0 = initial;

        for (int i = 1; i<STATES ;i++){

            State  s1 = FsmSampleFactory.createState();
            s1.setName("s"+i);
            root.addOwnedState(s1);
            s1.setOwningFSM(root);
            Transition t = FsmSampleFactory.createTransition();
            t.setSource(s0);
            t.setTarget(s1);
            t.setInput("ti" +i);
            t.setOutput("to" +i);
            s0.addOutgoingTransition(t);
            s1.addIncomingTransition(t);
            s0 = s1;
        }

        long creationEnd = System.nanoTime();

        System.gc();
        try{
            Thread.sleep(4000);
        } catch(InterruptedException e) {
            e.printStackTrace();
        }

        double mem = beanMemory.getHeapMemoryUsage().getUsed() / Math.pow(10,6)  ;

        System.out.println("FSM size: " + root.getOwnedState().size());
        statPr.print(root.getOwnedState().size() + ";");

        System.out.println("Memory used: "+ mem + " MB");
        statPr.print((mem + ";").replace(".",","));

        String ct = "" + (creationEnd - creationStart)/ Math.pow(10,6);
        System.out.println("Creation time: "+ ct + " ms");
        statPr.print(ct.replace(".",",") + ";");
        ModelSerializer sav = new ModelSerializer();

        File tempFile = File.createTempFile("tempKMFBench","xmi");
      //  tempFile.deleteOnExit();

        PrintWriter pr;
        long marshalingStart=0, marshalingEnd=0;

        try {
            pr = new PrintWriter(new FileOutputStream(tempFile));
            marshalingStart = System.nanoTime();
            pr.print(sav.serialize(root));
            marshalingEnd = System.nanoTime();
            pr.flush();
            pr.close();
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        //end = System.currentTimeMillis();
        String mt = (marshalingEnd - marshalingStart)/ Math.pow(10,6) + "";
        System.out.println("Marshaling time: "+ mt + " ms");
        statPr.print(mt.replace(".",",") + ";");

        long beforeLoad = System.nanoTime();
        FSM loaded = FSMLoader.loadModel(tempFile).get();
        double loadTime = (System.nanoTime() - beforeLoad );// / Math.pow(10,6);
        String lt = "" + loadTime/ Math.pow(10,6);
        System.out.println("Load time: "+ lt + " ms");
        statPr.println(lt.replace(".",","));
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

        FSM root = FsmSampleFactory.createFSM();
        State initial = FsmSampleFactory.createState();
        initial.setName("s0");
        initial.setOwningFSM(root);
        root.setCurrentState(initial);
        root.setInitialState(initial);
        root.addOwnedState(initial);

        previousLevel.add(initial);
        int n = 1;
        for (int d = 1; d<DEEP ;d++){
            List<State> thisLevel = new ArrayList<State>();

            for(State s : previousLevel) {
                State  leftState = FsmSampleFactory.createState();
                State  rightState = FsmSampleFactory.createState();
                leftState.setName("s"+ n++);
                rightState.setName("s"+ n++);
                root.addOwnedState(leftState);
                root.addOwnedState(rightState);
                leftState.setOwningFSM(root);
                rightState.setOwningFSM(root);
                Transition leftTrans = FsmSampleFactory.createTransition();
                Transition rightTrans = FsmSampleFactory.createTransition();
                leftTrans.setSource(s);
                rightTrans.setSource(s);
                leftTrans.setTarget(leftState);
                rightTrans.setTarget(rightState);
                leftTrans.setInput("ti" + n);
                leftTrans.setOutput("to" + n);
                rightTrans.setInput("ti" + n);
                rightTrans.setOutput("to" + n);
                s.addOutgoingTransition(rightTrans);
                rightState.addIncomingTransition(rightTrans);
                s.addOutgoingTransition(leftTrans);
                rightState.addIncomingTransition(leftTrans);
                thisLevel.add(rightState);
                thisLevel.add(leftState);
            }

            previousLevel = thisLevel;

        }

        long creationEnd = System.nanoTime();

        System.gc();
        try{
            Thread.sleep(4000);
        } catch(InterruptedException e) {
            e.printStackTrace();
        }

        double mem = beanMemory.getHeapMemoryUsage().getUsed() / Math.pow(10,6)  ;
        System.out.println("Memory used: "+ mem + " MB");
        statPr.print((mem + ";").replace(".",","));

        System.out.println("FSM size: " + root.getOwnedState().size());
        statPr.print(root.getOwnedState().size() + ";");

        String ct = "" + (creationEnd - creationStart)/ Math.pow(10,6);
        System.out.println("Creation time: "+ ct + " ms");
        statPr.print(ct.replace(".",",") + ";");
        ModelSerializer sav = new ModelSerializer();

        File tempFile = File.createTempFile("tempKMFBench","xmi");
        //tempFile.deleteOnExit();

        PrintWriter pr;
        long marshalingStart=0, marshalingEnd=0;

        try {
            pr = new PrintWriter(new FileOutputStream(tempFile));
            marshalingStart = System.nanoTime();
            pr.print(sav.serialize(root));
            marshalingEnd = System.nanoTime();
            pr.flush();
            pr.close();
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        //end = System.currentTimeMillis();
        String mt = (marshalingEnd - marshalingStart)/ Math.pow(10,6) + "";
        System.out.println("Marshaling time: "+ mt + " ms");
        statPr.print(mt.replace(".",",") + ";");

        long beforeLoad = System.nanoTime();
        FSM loaded = FSMLoader.loadModel(tempFile).get();
        double loadTime = (System.nanoTime() - beforeLoad );// / Math.pow(10,6);
        String lt = "" + loadTime/ Math.pow(10,6);
        System.out.println("Load time: "+ lt + " ms");
        statPr.println(lt.replace(".",","));
        statPr.flush();
        //System.out.println("Initial State: "+ loaded.getInitialState());

        //assertTrue("Loading time overpassed 1second for " + loaded.getOwnedState().size() + " elements", loadTime < 1000);

       // tempFile.delete();

        System.out.println("===== END DEEP :" + DEEP + "=====");
        System.out.println("");
    }
    
    
    public static void main(String[] args) throws InterruptedException, IOException {
        MainWOOppositeTest m = new MainWOOppositeTest();


        //=====  Flat FSM test //

        File f = File.createTempFile("KMF_FLAT_FSM_No_Opposite_TEST-" + System.currentTimeMillis(),".csv");
        PrintWriter pr = new PrintWriter(f);
        pr.println("States;Memory;Creation;Marshaling;Loading");
        m.flatFsmTest(pr,25000);
        m.flatFsmTest(pr,750000);
        pr.flush();
        pr.close();
        /*
        int step = 25000;
        for(int i = 1 ; i*step <= 750000;i++) {
            m.flatFsmTest(pr, i*step);
        }
        pr.flush();
        pr.close();

        System.out.println("results in " + f.getAbsolutePath());

       //=====  BinaryTreeLike FSM test //

        File f2 = File.createTempFile("KMF_BINARY_FSM_No_Opposite_TEST-" + System.currentTimeMillis(),".csv");
        PrintWriter pr2 = new PrintWriter(f2);
        pr2.println("Deep;Memory;States;Creation;Marshaling;Loading");
        for(int i = 1 ; Math.pow(2,i)<750000;i++) {
            m.binaryFsmTest(pr2,i);
        }
        pr2.flush();
        pr2.close();

        System.out.println("results in " + f.getAbsolutePath());
*/
    }
}
