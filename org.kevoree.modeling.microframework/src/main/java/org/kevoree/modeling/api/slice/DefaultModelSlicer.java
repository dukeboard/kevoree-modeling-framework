package org.kevoree.modeling.api.slice;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.ModelSlicer;
import org.kevoree.modeling.api.ModelVisitor;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.trace.ModelAddTrace;
import org.kevoree.modeling.api.trace.ModelTrace;
import org.kevoree.modeling.api.trace.TraceSequence;
import org.kevoree.modeling.api.util.Helper;

import java.util.*;

/*
 *  Special thanks to to #AngevinSacAVin
  * */

public class DefaultModelSlicer implements ModelSlicer {

    private void internal_prune(KObject elem, List<ModelTrace> traces, Map<String, KObject> cache, Map<String, KObject> parentMap, Callback<Throwable> callback) {
        //collect parent which as not be added already
        List<KObject> parents = new ArrayList<KObject>();
        final Callback<KObject> parentExplorer = new Callback<KObject>() {
            @Override
            public void on(KObject currentParent) {
                if (currentParent != null && parentMap.get(currentParent.path()) == null && cache.get(currentParent.path()) == null) {
                    parents.add(currentParent);
                    currentParent.parent(this);
                    callback.on(null);
                } else {
                    Collections.reverse(parents);
                    for (KObject parent : parents) {
                        if (parent.parentPath() != null) {
                            traces.add(new ModelAddTrace(parent.parentPath(), parent.referenceInParent().metaName(), parent.path(), parent.metaClass().metaName()));
                        }
                        traces.addAll(parent.toTraces(true, false));
                        parentMap.put(parent.path(), parent);
                    }
                    //Add attributes and references of pruned object
                    if (cache.get(elem.path()) == null && parentMap.get(elem.path()) == null) {
                        if (elem.parentPath() != null) {
                            traces.add(new ModelAddTrace(elem.parentPath(), elem.referenceInParent().metaName(), elem.path(), elem.metaClass().metaName()));
                        }
                        traces.addAll(elem.toTraces(true, false));
                    }
                    //We register this element as reachable
                    cache.put(elem.path(), elem);
                    //We continue to all reachable elements, potentially here we can exclude references
                    elem.graphVisit(new ModelVisitor() {
                        @Override
                        public void visit(KObject elem, Callback<Result> visitor) {
                            if (cache.get(elem.path()) == null) {
                                //break potential loop
                                internal_prune(elem, traces, cache, parentMap, (t) -> {
                                });
                            }
                            visitor.on(Result.CONTINUE);
                        }
                    }, (t) -> {
                        callback.on(null);
                    });
                }
            }
        };
        elem.parent(parentExplorer);
    }

    @Override
    public void slice(List<KObject> elems, Callback<TraceSequence> callback) {
        List<ModelTrace> traces = new ArrayList<ModelTrace>();
        Map<String, KObject> tempMap = new HashMap<String, KObject>();
        Map<String, KObject> parentMap = new HashMap<String, KObject>();
        KObject[] elemsArr = elems.toArray(new KObject[elems.size()]);
        Helper.forall(elemsArr, (obj, next) -> {
            internal_prune(obj, traces, tempMap, parentMap, next);
        }, (t) -> {
            for (String toLinkKey : tempMap.keySet()) {
                KObject toLink = tempMap.get(toLinkKey);
                traces.addAll(toLink.toTraces(false, true));
            }
            callback.on(new TraceSequence().populate(traces));
        });
    }
}