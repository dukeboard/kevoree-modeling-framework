package org.kevoree.modeling.api.slice;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.ModelSlicer;
import org.kevoree.modeling.api.ModelVisitor;
import org.kevoree.modeling.api.trace.ModelAddTrace;
import org.kevoree.modeling.api.trace.ModelTrace;
import org.kevoree.modeling.api.trace.TraceSequence;
import org.kevoree.modeling.api.util.CallBackChain;
import org.kevoree.modeling.api.util.Helper;

import java.util.*;

/*
 *  Special thanks to to #AngevinSacAVin
  * */

public class DefaultModelSlicer implements ModelSlicer {

    private void internal_prune(KObject elem, List<ModelTrace> traces, Map<Long, KObject> cache, Map<Long, KObject> parentMap, Callback<Throwable> callback) {
        //collect parent which as not be added already
        List<KObject> parents = new ArrayList<KObject>();
        final Callback<KObject> parentExplorer = new Callback<KObject>() {
            @Override
            public void on(KObject currentParent) {
                if (currentParent != null && parentMap.get(currentParent.uuid()) == null && cache.get(currentParent.uuid()) == null) {
                    parents.add(currentParent);
                    currentParent.parent(this);
                    callback.on(null);
                } else {
                    Collections.reverse(parents);
                    for (KObject parent : parents) {
                        if (parent.parentUuid() != null) {
                            traces.add(new ModelAddTrace(parent.parentUuid(), parent.referenceInParent(), parent.uuid(), parent.metaClass()));
                        }
                        traces.addAll(elem.traces(KObject.TraceRequest.ATTRIBUTES_ONLY));
                        parentMap.put(parent.uuid(), parent);
                    }
                    //Add attributes and references of pruned object
                    if (cache.get(elem.uuid()) == null && parentMap.get(elem.uuid()) == null) {
                        if (elem.parentUuid() != null) {
                            traces.add(new ModelAddTrace(elem.parentUuid(), elem.referenceInParent(), elem.uuid(), elem.metaClass()));
                        }
                        traces.addAll(elem.traces(KObject.TraceRequest.ATTRIBUTES_ONLY));
                    }
                    //We register this element as reachable
                    cache.put(elem.uuid(), elem);
                    //We continue to all reachable elements, potentially here we can exclude references
                    elem.graphVisit(new ModelVisitor() {
                        @Override
                        public VisitResult visit(KObject elem) {
                            if (cache.get(elem.uuid()) == null) {
                                //break potential loop
                                internal_prune(elem, traces, cache, parentMap, new Callback<Throwable>() {
                                    @Override
                                    public void on(Throwable throwable) {

                                    }
                                });
                            }
                            return VisitResult.CONTINUE;
                        }
                    }, new Callback<Throwable>() {
                        @Override
                        public void on(Throwable throwable) {
                            callback.on(null);
                        }
                    });
                }
            }
        };
        traces.add(new ModelAddTrace(elem.uuid(), null, elem.uuid(), elem.metaClass()));
        elem.parent(parentExplorer);
    }

    @Override
    public void slice(List<KObject> elems, Callback<TraceSequence> callback) {
        List<ModelTrace> traces = new ArrayList<ModelTrace>();
        Map<Long, KObject> tempMap = new HashMap<Long, KObject>();
        Map<Long, KObject> parentMap = new HashMap<Long, KObject>();
        KObject[] elemsArr = elems.toArray(new KObject[elems.size()]);
        Helper.forall(elemsArr, new CallBackChain<KObject>() {
            @Override
            public void on(KObject obj, Callback<Throwable> next) {
                internal_prune(obj, traces, tempMap, parentMap, next);
            }
        }, new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                for (Long toLinkKey : tempMap.keySet()) {
                    KObject toLink = tempMap.get(toLinkKey);
                    traces.addAll(toLink.traces(KObject.TraceRequest.REFERENCES_ONLY));
                }
                callback.on(new TraceSequence().populate(traces));
            }
        });
    }
}