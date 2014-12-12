package org.kevoree.modeling.microframework.test.time;

import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.trace.TraceSequence;
import org.kevoree.modeling.api.util.TimeMachine;
import org.kevoree.modeling.microframework.test.cloud.CloudDimension;
import org.kevoree.modeling.microframework.test.cloud.CloudUniverse;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Node;

/**
 * Created by duke on 12/12/14.
 */
public class TimeMachineTest {

    @Test
    public void timeMachineTest() {
        CloudUniverse universe = new CloudUniverse();
        CloudDimension dimension = universe.newDimension();
        CloudView v0 = dimension.time(0l);
        Node n0 = v0.createNode();
        n0.setName("n0");

        n0.jump(1l, new Callback<Node>() {
            @Override
            public void on(Node n1) {
                n1.setName("n1");
                TimeMachine timeMachine = new TimeMachine();
                timeMachine.init(true, new Callback<TraceSequence>() {
                    @Override
                    public void on(TraceSequence traceSequence) {

                        System.err.println(traceSequence);
                    }
                });
                timeMachine.set(n0);
                timeMachine.set(n1);
                timeMachine.set(n0);
                timeMachine.jumpTime(1);
                timeMachine.jumpTime(0);
            }
        });
    }

}
