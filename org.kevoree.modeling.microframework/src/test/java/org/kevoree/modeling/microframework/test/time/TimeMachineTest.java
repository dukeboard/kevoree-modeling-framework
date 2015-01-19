package org.kevoree.modeling.microframework.test.time;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.trace.TraceSequence;
import org.kevoree.modeling.api.util.TimeMachine;
import org.kevoree.modeling.microframework.test.cloud.CloudUniverse;
import org.kevoree.modeling.microframework.test.cloud.CloudModel;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Node;

/**
 * Created by duke on 12/12/14.
 */
public class TimeMachineTest {

    @Test
    public void timeMachineTest() {
        int[] counter = new int[1];
        counter[0] = 0;
        CloudModel model = new CloudModel();
        model.connect(new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                CloudUniverse universe = model.newUniverse();
                CloudView v0 = universe.time(0l);
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
                                counter[0]++;
                            }
                        });
                        timeMachine.set(n0);
                        timeMachine.set(n1);
                        timeMachine.set(n0);
                        timeMachine.jumpTime(1);
                        timeMachine.jumpTime(0);
                        n0.setName("n00");
                    }
                });
            }
        });
        Assert.assertEquals(6, counter[0]);
    }

}
