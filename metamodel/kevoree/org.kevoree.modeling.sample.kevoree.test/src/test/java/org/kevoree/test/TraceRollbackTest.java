package org.kevoree.test;

import jet.runtime.typeinfo.JetValueParameter;
import org.junit.Test;
import org.kevoree.ContainerNode;
import org.kevoree.ContainerRoot;
import org.kevoree.KevoreeFactory;
import org.kevoree.cloner.DefaultModelCloner;
import org.kevoree.compare.DefaultModelCompare;
import org.kevoree.impl.DefaultKevoreeFactory;
import org.kevoree.modeling.api.ModelCloner;
import org.kevoree.modeling.api.compare.ModelCompare;
import org.kevoree.modeling.api.events.ModelElementListener;
import org.kevoree.modeling.api.events.ModelEvent;
import org.kevoree.modeling.api.trace.Event2Trace;
import org.kevoree.modeling.api.trace.ModelTrace;
import org.kevoree.modeling.api.trace.TraceSequence;
import org.kevoree.modeling.api.util.ModelTracker;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by duke on 26/07/13.
 */
public class TraceRollbackTest {

    @Test
    public void difftest() {

        KevoreeFactory factory = new DefaultKevoreeFactory();
        ModelCompare compare = new DefaultModelCompare();
        ModelCloner cloner = new DefaultModelCloner();
        final Event2Trace converter = new Event2Trace(compare);

        ContainerRoot model = factory.createContainerRoot();

        ContainerNode node1 = factory.createContainerNode();
        node1.setName("node1");
        model.addNodes(node1);

        ContainerRoot backup = cloner.clone(model);


        ModelTracker tracker = new ModelTracker(compare);
        tracker.track(model);

        ContainerNode node2 = factory.createContainerNode();
        node2.setName("node2");
        model.addNodes(node2);

        tracker.undo();

        assert (compare.diff(model, backup).getTraces().size() == 0);

    }

}
