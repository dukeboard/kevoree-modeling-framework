package org.kevoree.modeling.sosym.eval.fsm;

import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;
import org.eclipse.emf.ecore.util.EcoreUtil;
import org.eclipse.emf.ecore.xmi.impl.XMIResourceFactoryImpl;
import org.emf.fsmSample.FSM;
import org.emf.fsmSample.FsmSampleFactory;
import org.emf.fsmSample.State;
import org.emf.fsmSample.Transition;

import java.io.File;
import java.io.IOException;
import java.lang.management.ManagementFactory;
import java.lang.management.MemoryMXBean;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 07/06/13
 * Time: 11:03
 */
public class EclipseTest {

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
        URI fileURI = URI.createFileURI(tempFile.getAbsolutePath());
        doSave(cloned, fileURI);
        FSM reloaded = doLoad(fileURI);
        tempFile.delete();
        System.out.println("===== END STATES : " + stateNB + "=====");
        System.out.println("");
    }


    public FSM doLoad(URI fileURI) {
        ResourceSet resourceSet = new ResourceSetImpl();
        resourceSet.getResourceFactoryRegistry().getExtensionToFactoryMap().put(Resource.Factory.Registry.DEFAULT_EXTENSION, new XMIResourceFactoryImpl());
        long beforeLoad = System.nanoTime();
        Resource resource = resourceSet.getResource(fileURI, true);
        EObject myModelObject = resource.getContents().get(0);
        double loadTime = (System.nanoTime() - beforeLoad);// / Math.pow(10,6);
        String lt = "" + loadTime / Math.pow(10, 6);
        System.out.println("Load time: " + lt + " ms");
        return (FSM) myModelObject;
    }

    public void doSave(EObject model, URI fileURI) {
        Resource resource = new XMIResourceFactoryImpl().createResource(fileURI);
        resource.getContents().add(model);
        long marshalingStart;
        long marshalingEnd;
        marshalingStart = System.nanoTime();
        try {
            resource.save(Collections.EMPTY_MAP);
        } catch (IOException e) {
            e.printStackTrace();
        }
        marshalingEnd = System.nanoTime();
        String mt = (marshalingEnd - marshalingStart) / Math.pow(10, 6) + "";
        System.out.println("Marshaling time: " + mt + " ms");
    }

    public FSM doClone(FSM model) {
        long beforeClone = System.nanoTime();
        EObject cloned = EcoreUtil.copy(model);
        double cloneTime = (System.nanoTime() - beforeClone);
        String ct2 = "" + cloneTime / Math.pow(10, 6);
        System.out.println("Clone time: " + ct2 + " ms");
        return (FSM) cloned;
    }


    public FSM buildFlatFSM(int STATES) throws IOException {
        long creationStart = System.nanoTime();
        FSM root = FsmSampleFactory.eINSTANCE.createFSM();
        State initial = FsmSampleFactory.eINSTANCE.createState();
        initial.setName("s0");
        root.setCurrentState(initial);
        root.setInitialState(initial);
        root.getOwnedState().add(initial);
        State s0 = initial;
        for (int i = 1; i < STATES; i++) {
            State s1 = FsmSampleFactory.eINSTANCE.createState();
            s1.setName("s" + i);
            root.getOwnedState().add(s1);
            //s1.setOwningFSM(root);
            Transition t = FsmSampleFactory.eINSTANCE.createTransition();
            t.setSource(s0);
            t.setTarget(s1);
            t.setInput("ti" + i);
            t.setOutput("to" + i);
            s0.getOutgoingTransition().add(t);
            s1.getIncomingTransition().add(t);
            s0 = s1;
        }
        long creationEnd = System.nanoTime();
        String ct = "" + (creationEnd - creationStart) / Math.pow(10, 6);
        System.out.println("Creation time: " + ct + " ms");
        return root;
    }

    public FSM buildBinaryFsm(int DEEP) throws IOException {
        List<State> previousLevel = new ArrayList<State>();
        long creationStart = System.nanoTime();
        FSM root = FsmSampleFactory.eINSTANCE.createFSM();
        State initial = FsmSampleFactory.eINSTANCE.createState();
        initial.setName("s0");
        root.setCurrentState(initial);
        root.setInitialState(initial);
        root.getOwnedState().add(initial);
        previousLevel.add(initial);
        int n = 1;
        for (int d = 1; d < DEEP; d++) {
            List<State> thisLevel = new ArrayList<State>();
            for (State s : previousLevel) {
                State leftState = FsmSampleFactory.eINSTANCE.createState();
                State rightState = FsmSampleFactory.eINSTANCE.createState();
                leftState.setName("s" + n++);
                rightState.setName("s" + n++);
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
        String ct = "" + (creationEnd - creationStart) / Math.pow(10, 6);
        System.out.println("Creation time: " + ct + " ms");
        return root;
    }


    public static void main(String[] args) throws InterruptedException, IOException {
        EclipseTest m = new EclipseTest();
        m.doTest(100000, false); //warm up
        m.doTest(100000, false);
        //m.doTest(16, true);
        //m.doTest(17, true);
    }

}
