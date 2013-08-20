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
package org.kevoree.modeling.emf.sample.fsm.test;

import fsmSample.FSM;
import fsmSample.FsmSampleFactory;
import fsmSample.FsmSamplePackage;
import fsmSample.State;
import fsmSample.Transition;

import java.io.*;
import java.lang.management.ManagementFactory;
import java.lang.management.MemoryMXBean;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;
import org.eclipse.emf.ecore.xmi.impl.XMIResourceFactoryImpl;


public class MainTest {

	//@Test
	public void flatFsmTest(PrintWriter statPr,int STATES) throws IOException {
		MemoryMXBean beanMemory = ManagementFactory.getMemoryMXBean();

		System.out.println("===== STATES : " + STATES + "=====");

		long creationStart = System.nanoTime();

		FSM root = FsmSampleFactory.eINSTANCE.createFSM();
		State initial = FsmSampleFactory.eINSTANCE.createState();
		initial.setName("s0");
		//initial.setOwningFSM(root);
		root.setCurrentState(initial);
		root.setInitialState(initial);
		root.getOwnedState().add(initial);

		State s0 = initial;

		for (int i = 1; i<STATES ;i++){

			State  s1 = FsmSampleFactory.eINSTANCE.createState();
			s1.setName("s"+i);
			root.getOwnedState().add(s1);
			//s1.setOwningFSM(root);
			Transition t = FsmSampleFactory.eINSTANCE.createTransition();
			t.setSource(s0);
			t.setTarget(s1);
			t.setInput("ti" +i);
			t.setOutput("to" +i);
			s0.getOutgoingTransition().add(t);
			s1.getIncomingTransition().add(t);
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


		File tempFile = File.createTempFile("tempKMFBench","xmi");
		tempFile.deleteOnExit();

		URI fileURI = URI.createFileURI(tempFile.getAbsolutePath());
		Resource resource = new XMIResourceFactoryImpl().createResource(fileURI);
		resource.getContents().add( root );

		long marshalingStart=0, marshalingEnd=0;

		marshalingStart = System.nanoTime();
		try {
			resource.save(Collections.EMPTY_MAP);
		} catch (IOException e) {
			e.printStackTrace();
		} 
		marshalingEnd = System.nanoTime();


		//end = System.currentTimeMillis();
		String mt = (marshalingEnd - marshalingStart)/ Math.pow(10,6) + "";
		System.out.println("Marshaling time: "+ mt + " ms");
		statPr.print(mt.replace(".",",") + ";");

		
		// Create a resource set.
		ResourceSet resourceSet = new ResourceSetImpl();

		// Register the default resource factory -- only needed for stand-alone!
		resourceSet.getResourceFactoryRegistry().getExtensionToFactoryMap().put(
		    Resource.Factory.Registry.DEFAULT_EXTENSION, new XMIResourceFactoryImpl());
		
		// Register the package -- only needed for stand-alone!
		// You find the correct name of the package in the generated model code
		FsmSamplePackage fsmPackage = FsmSamplePackage.eINSTANCE;

	
		long beforeLoad = System.nanoTime();
		// Demand load the resource for this file, here the actual loading is done.
		Resource resource2 = resourceSet.getResource(fileURI, true);
		EObject myModelObject = resource.getContents().get(0);
		double loadTime = (System.nanoTime() - beforeLoad );// / Math.pow(10,6);
		String lt = "" + loadTime/ Math.pow(10,6);
		System.out.println("Load time: "+ lt + " ms");
		statPr.println(lt.replace(".",","));
		statPr.flush();
		//System.out.println("Initial State: "+ loaded.getInitialState());

		//assertTrue("Loading time overpassed 1second for " + loaded.getOwnedState().size() + " elements", loadTime < 1000);

		tempFile.delete();

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

		FSM root = FsmSampleFactory.eINSTANCE.createFSM();
		State initial = FsmSampleFactory.eINSTANCE.createState();
		initial.setName("s0");
		//initial.setOwningFSM(root);
		root.setCurrentState(initial);
		root.setInitialState(initial);
		root.getOwnedState().add(initial);

		previousLevel.add(initial);
		int n = 1;
		for (int d = 1; d<DEEP ;d++){
			List<State> thisLevel = new ArrayList<State>();

			for(State s : previousLevel) {
				State  leftState = FsmSampleFactory.eINSTANCE.createState();
				State  rightState = FsmSampleFactory.eINSTANCE.createState();
				leftState.setName("s"+ n++);
				rightState.setName("s"+ n++);
				root.getOwnedState().add(leftState);
				root.getOwnedState().add(rightState);
				//s1.setOwningFSM(root);
				Transition leftTrans = FsmSampleFactory.eINSTANCE.createTransition();
				Transition rightTrans = FsmSampleFactory.eINSTANCE.createTransition();
				leftTrans.setSource(s);
				rightTrans.setSource(s);
				leftTrans.setTarget(leftState);
				rightTrans.setTarget(rightState);
				leftTrans.setInput("ti" + n);
				leftTrans.setOutput("to" + n);
				rightTrans.setInput("ti" + n);
				rightTrans.setOutput("to" + n);
				s.getOutgoingTransition().add(rightTrans);
				rightState.getIncomingTransition().add(rightTrans);
				s.getOutgoingTransition().add(leftTrans);
				rightState.getIncomingTransition().add(leftTrans);
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
	
		File tempFile = File.createTempFile("tempKMFBench","xmi");
		tempFile.deleteOnExit();

		URI fileURI = URI.createFileURI(tempFile.getAbsolutePath());
		Resource resource = new XMIResourceFactoryImpl().createResource(fileURI);
		resource.getContents().add( root );
		
		
		long marshalingStart=0, marshalingEnd=0;

		marshalingStart = System.nanoTime();
		try {
			resource.save(Collections.EMPTY_MAP);
		} catch (IOException e) {
			e.printStackTrace();
		} 
		marshalingEnd = System.nanoTime();


		//end = System.currentTimeMillis();
		String mt = (marshalingEnd - marshalingStart)/ Math.pow(10,6) + "";
		System.out.println("Marshaling time: "+ mt + " ms");
		statPr.print(mt.replace(".",",") + ";");

		
		// Create a resource set.
		ResourceSet resourceSet = new ResourceSetImpl();

		// Register the default resource factory -- only needed for stand-alone!
		resourceSet.getResourceFactoryRegistry().getExtensionToFactoryMap().put(
		    Resource.Factory.Registry.DEFAULT_EXTENSION, new XMIResourceFactoryImpl());
		
		// Register the package -- only needed for stand-alone!
		// You find the correct name of the package in the generated model code
		FsmSamplePackage fsmPackage = FsmSamplePackage.eINSTANCE;

	
		long beforeLoad = System.nanoTime();
		// Demand load the resource for this file, here the actual loading is done.
		Resource resource2 = resourceSet.getResource(fileURI, true);
		EObject myModelObject = resource.getContents().get(0);
		double loadTime = (System.nanoTime() - beforeLoad );// / Math.pow(10,6);
		String lt = "" + loadTime/ Math.pow(10,6);
		System.out.println("Load time: "+ lt + " ms");
		statPr.println(lt.replace(".",","));
		statPr.flush();
		//System.out.println("Initial State: "+ loaded.getInitialState());

		//assertTrue("Loading time overpassed 1second for " + loaded.getOwnedState().size() + " elements", loadTime < 1000);

		tempFile.delete();

		System.out.println("===== END DEEP :" + DEEP + "=====");
		System.out.println("");
	}


	public static void main(String[] args) throws InterruptedException, IOException {
		MainTest m = new MainTest();


		//=====  Flat FSM test //

		File f = File.createTempFile("EMF_FLAT_FSM_NO_OPPOSITE_TEST-" + System.currentTimeMillis(),".csv");
		PrintWriter pr = new PrintWriter(f);
		pr.println("States;Memory;Creation;Marshaling;Loading");
		int step = 25000;
		for(int i = 1 ; i*step <= 500000;i++) {
			m.flatFsmTest(pr, i*step);
		}
		pr.flush();
		pr.close();

		System.out.println("results in " + f.getAbsolutePath());

		//=====  BinaryTreeLike FSM test //

		File f2 = File.createTempFile("EMF_BINARY_FSM_NO_OPPOSITE_TEST-" + System.currentTimeMillis(),".csv");
		PrintWriter pr2 = new PrintWriter(f2);
		pr2.println("Deep;Memory;States;Creation;Marshaling;Loading");
		for(int i = 1 ; Math.pow(2,i)<500000;i++) {
			m.binaryFsmTest(pr2,i);
		}
		pr2.flush();
		pr2.close();

		System.out.println("results in " + f2.getAbsolutePath());

	}
}
