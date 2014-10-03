package org.kevoree.modeling.api.slice;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KFactory;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.ModelVisitor;
import org.kevoree.modeling.api.trace.ModelAddTrace;
import org.kevoree.modeling.api.trace.ModelTrace;
import org.kevoree.modeling.api.trace.TraceSequence;

import java.util.*;

public class DefaultModelSlicer {

    private KFactory factory;

    public DefaultModelSlicer(KFactory f) {
        this.factory = f;
    }

    public TraceSequence prune(List<KObject> elems) {
        List<ModelTrace> traces = new ArrayList<ModelTrace>();
        Map<String, KObject> tempMap = new HashMap<String, KObject>();
        Map<String, KObject> parentMap = new HashMap<String, KObject>();
        for (KObject elem : elems) {
            internal_prune(elem, traces, tempMap, parentMap);
        }
        for (String toLinkKey : tempMap.keySet()) {
            KObject toLink = tempMap.get(toLinkKey);
            traces.addAll(toLink.toTraces(false, true));
        }
        return new TraceSequence(factory).populate(traces);
    }

    private void internal_prune(KObject elem, List<ModelTrace> traces, Map<String, KObject> cache, Map<String, KObject> parentMap) {
        //collect parent which as not be added already
        List<KObject> parents = new ArrayList<KObject>();
        final Callback<KObject> parentExplorer = new Callback<KObject>() {
            @Override
            public void on(KObject currentParent) {
                if (currentParent != null && parentMap.get(currentParent.path()) == null && cache.get(currentParent.path()) == null) {
                    parents.add(currentParent);
                    currentParent.parent(this);
                } else {
                    Collections.reverse(parents);
                    for (KObject parent : parents) {
                        if (parent.eContainer() != null) {
                            traces.add(new ModelAddTrace(parent.eContainer().path(), parent.referenceInParent(), parent.path(), parent.metaClassName()));
                        }
                        traces.addAll(parent.toTraces(true, false));
                        parentMap.put(parent.path(), parent);
                    }
                    //Add attributes and references of pruned object
                    if (cache.get(elem.path()) == null && parentMap.get(elem.path()) == null) {
                        if (elem.eContainer() != null) {
                            traces.add(new ModelAddTrace(elem.eContainer().path(), elem.referenceInParent(), elem.path(), elem.metaClassName()));
                        }
                        traces.addAll(elem.toTraces(true, false));
                    }
                    //We register this element as reachable
                    cache.put(elem.path(), elem);
                    //We continue to all reachable elements, potentially here we can exclude references
                    elem.visitAll(new ModelVisitor() {
                        @Override
                        public void visit(KObject elem, String refNameInParent, KObject parent) {
                            if (cache.get(elem.path()) == null) {
                                //break potential loop
                                internal_prune(elem, traces, cache, parentMap);
                            }
                        }
                    });
                }
            }
        };
        elem.parent(parentExplorer);
    }

}