/**
 * Licensed under the GNU LESSER GENERAL PUBLIC LICENSE, Version 3, 29 June 2007;
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.gnu.org/licenses/lgpl-3.0.txt
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Authors:
 * Fouquet Francois
 * Nain Gregory
 */
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

import org.fsmsample.FSM;
import org.fsmsample.FsmSampleFactory;
import org.fsmsample.State;
import org.fsmsample.Transition;
import org.fsmsample.loader.ModelLoader;
import org.fsmsample.serializer.ModelSerializer;

import java.io.*;
import java.lang.management.ManagementFactory;
import java.lang.management.MemoryMXBean;
import java.util.ArrayList;
import java.util.List;

public class PersistencyPerfomanceTest {

    File dbFolder = new File("/tmp/fsmTestDb" + System.currentTimeMillis());
    FsmSampleFactory factory = null;// new PersistentFsmSampleFactory(dbFolder);


    //@Test
    public void flatFsmTest(PrintWriter statPr, int STATES) throws IOException {
        MemoryMXBean beanMemory = ManagementFactory.getMemoryMXBean();

        System.out.println("===== STATES : " + STATES + "=====");
        String pathToFirst = "", pathToHalf = "", pathToEnd ="", pathToFSM;

        long creationStart = System.nanoTime();



        FSM root = factory.createFSM();
        pathToFSM = root.path();
        State initial = factory.createState();
        initial.setName("s0");
        //initial.setOwningFSM(root);
        root.setCurrentState(initial);
        root.setInitialState(initial);
        root.addOwnedState(initial);

        State s0 = initial;
        pathToFirst = s0.path();

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

            if(i== STATES/2) {
                pathToHalf = s0.path();
            } else if (i == (STATES-1)) {
                pathToEnd = s0.path();
            }

            if(i%100000==0) {
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
        statPr.print(root.getOwnedState().size() + ";");

        System.out.println("Memory used: " + mem + " MB");
        statPr.print((mem + ";").replace(".", ","));

        String ct = "" + (creationEnd - creationStart) / Math.pow(10, 6);
        System.out.println("Creation time: " + ct + " ms");
        statPr.print(ct.replace(".", ",") + ";");



        FsmSampleFactory newFactory = null;// new PersistentFsmSampleFactory(dbFolder);

        FSM rootTyped = newFactory.createFSM();


        long getFirstStart = System.nanoTime();
        Object o = rootTyped.findByPath(pathToFirst);
        long getFirstEnd = System.nanoTime();
        assert(o != null && o instanceof State);
        System.out.println("Got first in "+ (getFirstEnd - getFirstStart) +" ns");

        long getMiddleStart = System.nanoTime();
        o = rootTyped.findByPath(pathToHalf);
        long getMiddleStop = System.nanoTime();
        assert(o != null && o instanceof State);
        System.out.println("Got half in "+ (getMiddleStop - getMiddleStart) +" ns");

        long getLastStart = System.nanoTime();
        o = rootTyped.findByPath(pathToEnd);
        long getLastStop = System.nanoTime();
        assert(o != null && o instanceof State);
        assert(o.equals(root.findByPath(pathToEnd)));
        System.out.println("Got last in "+ (getLastStop - getLastStart) +" ns");


      System.out.println("===== END STATES : " + STATES + "=====");

    }


    public static void main(String[] args) throws InterruptedException, IOException {
        PersistencyPerfomanceTest m = new PersistencyPerfomanceTest();


        //=====  Flat FSM test //

        File f = File.createTempFile("KMF_FLAT_FSM_No_Opposite_TEST-" + System.currentTimeMillis(), ".csv");
        PrintWriter pr = new PrintWriter(f);
        pr.println("States;Memory;Creation;Marshaling;Loading");

        m.flatFsmTest(pr, 10000);

        pr.flush();
        pr.close();
        System.out.println("results in " + f.getAbsolutePath());


    }
}
