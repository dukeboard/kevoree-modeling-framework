package org.kevoree.test;

import org.junit.Test;
import org.kevoree.ContainerNode;
import org.kevoree.DeployUnit;
import org.kevoree.KevoreeFactory;
import org.kevoree.impl.ContainerNodeImpl;
import org.kevoree.impl.DefaultKevoreeFactory;
import org.kevoree.impl.DeployUnitImpl;
import org.kevoree.trace.ModelTrace;

import java.util.List;

/**
 * Created by duke on 26/07/13.
 */
public class TraceSetGeneratorTest {

    @Test
    public void settest() {

        KevoreeFactory factory = new DefaultKevoreeFactory();

        DeployUnitImpl du0 = (DeployUnitImpl) factory.createDeployUnit();
        du0.setUnitName("model");
        du0.setGroupName("modelGroup");
        du0.setVersion("v1");

        DeployUnitImpl du1 = (DeployUnitImpl) factory.createDeployUnit();
        du1.setUnitName("model");
        du1.setGroupName("modelGroup");
        du1.setVersion("v2");

        List<ModelTrace> traces = du0.generateDiffTraces(null, false);
        assert(lookupForTrace(traces,"unitName"));
        assert(lookupForTrace(traces,"groupName"));
        assert(lookupForTrace(traces,"version"));

        List<ModelTrace> traces2 = du0.generateDiffTraces(du1, false);
        assert(lookupForTrace(traces2,"version"));
        assert(!lookupForTrace(traces2,"unitName"));
        assert(!lookupForTrace(traces2,"groupName"));

        List<ModelTrace> traces3 = du0.generateDiffTraces(du1, true);
        assert(!lookupForTrace(traces3,"version"));
        assert(lookupForTrace(traces3,"unitName"));
        assert(lookupForTrace(traces3,"groupName"));


    }

    private boolean lookupForTrace(List<ModelTrace> traces, String attName) {
        for (ModelTrace trace : traces) {
              if(trace.toString().contains("refname : \""+attName+"\"")){
                  return true;
              }
        }
        return false;
    }


}
