package org.kevoree.modeling.api.compare;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.trace.ModelAddTrace;
import org.kevoree.modeling.api.trace.ModelRemoveTrace;
import org.kevoree.modeling.api.trace.ModelTrace;
import org.kevoree.modeling.api.trace.TraceSequence;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by duke on 26/07/13.
 */

public class DefaultModelCompare implements ModelCompare {
    private KView factory;

    public DefaultModelCompare(KView factory) {
        this.factory = factory;
    }

    @Override
    public void diff(KObject origin, KObject target, Callback<TraceSequence> callback) {
        internal_diff(origin, target, false, false, callback);
    }

    @Override
    public void merge(KObject origin, KObject target, Callback<TraceSequence> callback) {
        internal_diff(origin, target, false, true, callback);
    }

    @Override
    public void inter(KObject origin, KObject target, Callback<TraceSequence> callback) {
        internal_diff(origin, target, true, false, callback);
    }

    private void internal_diff(KObject origin, KObject target, boolean inter, boolean merge, Callback<TraceSequence> callback) {
        List<ModelTrace> traces = new ArrayList<ModelTrace>();
        List<ModelTrace> tracesRef = new ArrayList<ModelTrace>();
        Map<String, KObject> objectsMap = new HashMap<String, KObject>();
        traces.addAll(origin.createTraces(target, inter, merge, false, true));
        tracesRef.addAll(origin.createTraces(target, inter, merge, true, false));
        origin.treeVisit(new ModelVisitor() {
            @Override
            public void visit(KObject elem, Callback<Result> visitor) {
                objectsMap.put(elem.path(), elem);
                visitor.on(Result.CONTINUE);
            }
        }, new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                if (throwable != null) {
                    throwable.printStackTrace();
                    callback.on(null);
                } else {
                    target.treeVisit(new ModelVisitor() {
                        @Override
                        public void visit(KObject elem, Callback<Result> visitor) {
                            String childPath = elem.path();
                            if (objectsMap.containsKey(childPath)) {
                                if (inter) {
                                    //TODO
                                    MetaReference currentReference = null;
                                    traces.add(new ModelAddTrace(elem.parentPath(), currentReference, elem.path(), elem.metaClass()));
                                }
                                traces.addAll(objectsMap.get(childPath).createTraces(elem, inter, merge, false, true));
                                tracesRef.addAll(objectsMap.get(childPath).createTraces(elem, inter, merge, true, false));
                                objectsMap.remove(childPath); //drop from to process elements
                            } else {
                                if (!inter) {
                                    //TODO
                                    MetaReference currentReference = null;
                                    traces.add(new ModelAddTrace(elem.parentPath(), currentReference, elem.path(), elem.metaClass()));
                                    traces.addAll(elem.createTraces(elem, true, merge, false, true));
                                    tracesRef.addAll(elem.createTraces(elem, true, merge, true, false));
                                }
                            }
                            visitor.on(Result.CONTINUE);
                        }
                    }, new Callback<Throwable>() {
                        @Override
                        public void on(Throwable throwable) {
                            if (throwable != null) {
                                throwable.printStackTrace();
                                callback.on(null);
                            } else {
                                traces.addAll(tracesRef); //references should be deleted before, deletion of elements
                                if (!inter && !merge) {
                                    //if diff
                                    for (String diffChildKey : objectsMap.keySet()) {
                                        KObject diffChild = objectsMap.get(diffChildKey);
                                        String src = diffChild.parentPath();
                                        traces.add(new ModelRemoveTrace(src, diffChild.referenceInParent(), diffChild.path()));
                                    }
                                }
                                callback.on(new TraceSequence().populate(traces));
                            }
                        }
                    });
                }
            }
        });
    }

}
