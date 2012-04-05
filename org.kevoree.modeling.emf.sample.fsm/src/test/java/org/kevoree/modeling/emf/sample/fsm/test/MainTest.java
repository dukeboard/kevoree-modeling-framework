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
import org.junit.Test;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.PrintWriter;
import java.lang.management.ManagementFactory;
import java.lang.management.MemoryMXBean;

import static org.junit.Assert.assertTrue;


public class MainTest {

    @Test
    public void loadTest() {
        MemoryMXBean beanMemory = ManagementFactory.getMemoryMXBean();
        //double mem = beanMemory.getHeapMemoryUsage().getUsed() / Math.pow(10,6)  ;

        long start = System.currentTimeMillis();

        FSM root = FsmSampleFactory.createFSM();
        State initial = FsmSampleFactory.createState();
        initial.setName("s0");
        //initial.setOwningFSM(root);
        root.setCurrentState(initial);
        root.setInitialState(initial);
        root.addOwnedState(initial);



        State s0 = initial;


        for (int i = 1; i<100000 ;i++){
            //if(i% 1000 == 0){System.out.println(i);}
            State  s1 = FsmSampleFactory.createState();
            s1.setName("s"+i);
            root.addOwnedState(s1);
            //s1.setOwningFSM(root);
            Transition t = FsmSampleFactory.createTransition();
            t.setSource(s0);
            t.setTarget(s1);
            t.setInput("ti" +i);
            t.setInput("to" +i);
            s0.addOutgoingTransition(t);
            s1.addIncomingTransition(t);
            s0 = s1;
        }

        long end = System.currentTimeMillis();

        System.err.println("time to create in ms "+ (end - start));

        ModelSerializer sav = new ModelSerializer();
        PrintWriter pr;
        try {
            pr = new PrintWriter(new FileOutputStream(new File("toto.xmi")));

            pr.print(sav.serialize(root));
            pr.flush();
            pr.close();
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        //end = System.currentTimeMillis();

        System.err.println("time to sav in ms "+ (System.currentTimeMillis()- end));
        System.gc();
        try{
            Thread.sleep(4000);
        } catch(InterruptedException e) {
            e.printStackTrace();
        }
        double mem =   beanMemory.getHeapMemoryUsage().getUsed() / Math.pow(10,6)  ;
        System.err.println("memory used in MB "+ mem);

        long beforeLoad = System.nanoTime();
        FSM loaded = FSMLoader.loadModel(new File("toto.xmi")).get();
        double  loadTime = (System.nanoTime() - beforeLoad ) / Math.pow(10,6);

        System.out.println("time to load in ms "+ loadTime);
        System.out.println("Initial State: "+ loaded.getInitialState());
        System.out.println("FSM size: " + loaded.getOwnedState().size());

        assertTrue("Loading time overpassed 1second for " + loaded.getOwnedState().size() + " elements", loadTime < 1000);

    }
    
    
    public static void main(String[] args) throws InterruptedException {
        MainTest m = new MainTest();
        m.loadTest();
    }
}
