package org.kevoree.modeling.api.compare;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.trace.*;
import org.kevoree.modeling.api.util.Converters;

import java.util.*;

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
        Map<Long, KObject> objectsMap = new HashMap<Long, KObject>();
        traces.addAll(internal_createTraces(origin, target, inter, merge, false, true));
        tracesRef.addAll(internal_createTraces(origin, target, inter, merge, true, false));
        origin.treeVisit(new ModelVisitor() {
            @Override
            public VisitResult visit(KObject elem) {
                objectsMap.put(elem.kid(), elem);
                return VisitResult.CONTINUE;
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
                        public VisitResult visit(KObject elem) {
                            Long childPath = elem.kid();
                            if (objectsMap.containsKey(childPath)) {
                                if (inter) {
                                    //TODO
                                    MetaReference currentReference = null;
                                    traces.add(new ModelAddTrace(elem.parentKID(), currentReference, elem.kid(), elem.metaClass()));
                                }
                                traces.addAll(internal_createTraces(objectsMap.get(childPath), elem, inter, merge, false, true));
                                tracesRef.addAll(internal_createTraces(objectsMap.get(childPath), elem, inter, merge, true, false));
                                objectsMap.remove(childPath); //drop from to process elements
                            } else {
                                if (!inter) {
                                    //TODO
                                    MetaReference currentReference = null;
                                    traces.add(new ModelAddTrace(elem.parentKID(), currentReference, elem.kid(), elem.metaClass()));
                                    traces.addAll(internal_createTraces(elem, elem, true, merge, false, true));
                                    tracesRef.addAll(internal_createTraces(elem, elem, true, merge, true, false));
                                }
                            }
                            return VisitResult.CONTINUE;
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
                                    for (Long diffChildKey : objectsMap.keySet()) {
                                        KObject diffChild = objectsMap.get(diffChildKey);
                                        Long src = diffChild.parentKID();
                                        traces.add(new ModelRemoveTrace(src, diffChild.referenceInParent(), diffChild.kid()));
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

    public List<ModelTrace> internal_createTraces(KObject current, KObject sibling, boolean inter, boolean merge, boolean references, boolean attributes) {
        List<ModelTrace> traces = new ArrayList<ModelTrace>();
        Map<MetaAttribute, String> values = new HashMap<MetaAttribute, String>();
        if (attributes) {
            if (current != null) {
                current.visitAttributes((att, value) -> {
                    values.put(att, Converters.convFlatAtt(value));
                });
            }
            if (sibling != null) {
                sibling.visitAttributes((att, value) -> {
                    String flatAtt2 = Converters.convFlatAtt(value);
                    String flatAtt1 = values.get(att);
                    boolean isEquals = true;
                    if (flatAtt1 == null) {
                        if (flatAtt2 == null) {
                            isEquals = true;
                        } else {
                            isEquals = false;
                        }
                    } else {
                        isEquals = flatAtt1.equals(flatAtt2);
                    }
                    if (isEquals) {
                        if (inter) {
                            traces.add(new ModelSetTrace(current.kid(), att, flatAtt2));
                        }
                    } else {
                        if (!inter) {
                            traces.add(new ModelSetTrace(current.kid(), att, flatAtt2));
                        }
                    }
                    values.remove(att);
                });
            }
            if (!inter && !merge && !values.isEmpty()) {
                for (MetaAttribute hashLoopRes : values.keySet()) {
                    traces.add(new ModelSetTrace(current.kid(), hashLoopRes, null));
                    values.remove(hashLoopRes);
                }
            }
        }
        Map<MetaReference, Object> valuesRef = new HashMap<MetaReference, Object>();
        if (references) {
            for (int i = 0; i < current.metaReferences().length; i++) {
                MetaReference reference = current.metaReferences()[i];
                Object payload = current.factory().dimension().universe().storage().raw(current,false)[reference.index()];
                valuesRef.put(reference, payload);
            }
            if (sibling != null) {
                for (int i = 0; i < sibling.metaReferences().length; i++) {
                    MetaReference reference = sibling.metaReferences()[i];
                    Object payload2 = sibling.factory().dimension().universe().storage().raw(sibling,false)[reference.index()];
                    Object payload1 = valuesRef.get(reference);
                    if (reference.single()) {
                        boolean isEquals = true;
                        if (payload1 == null) {
                            if (payload2 == null) {
                                isEquals = true;
                            } else {
                                isEquals = false;
                            }
                        } else {
                            isEquals = payload1.equals(payload2);
                        }
                        if (isEquals) {
                            if (inter) {
                                if (payload2 != null) {
                                    traces.add(new ModelAddTrace(current.kid(), reference, (Long) payload2, null));
                                }
                            }
                        } else {
                            if (!inter) {
                                traces.add(new ModelAddTrace(current.kid(), reference, (Long) payload2, null));
                            }
                        }
                    } else {
                        if (payload1 == null && payload2 != null) {
                            Set<Long> siblingToAdd = (Set<Long>) payload2;
                            for (Long siblingElem : siblingToAdd) {
                                if (!inter) {
                                    traces.add(new ModelAddTrace(current.kid(), reference, siblingElem, null));
                                }
                            }
                        } else {
                            if (payload1 != null) {
                                Set<Long> currentPaths = (Set<Long>) payload1;
                                for (Long currentPath : currentPaths) {
                                    boolean isFound = false;
                                    if (payload2 != null) {
                                        Set<Long> siblingPaths = (Set<Long>) payload2;
                                        isFound = siblingPaths.contains(currentPath);
                                    }
                                    if (isFound) {
                                        if (inter) {
                                            traces.add(new ModelAddTrace(current.kid(), reference, currentPath, null));
                                        }
                                    } else {
                                        if (!inter) {
                                            traces.add(new ModelRemoveTrace(current.kid(), reference, currentPath));
                                        }
                                    }
                                }
                            }
                        }
                    }
                    valuesRef.remove(reference);
                }
                if (!inter && !merge && !values.isEmpty()) {
                    for (MetaReference hashLoopRes : valuesRef.keySet()) {
                        Object payload = valuesRef.get(hashLoopRes);
                        if (payload instanceof Long) {
                            traces.add(new ModelRemoveTrace(current.kid(), hashLoopRes, (Long) payload));
                        } else if (payload != null) {
                            Set<Long> toRemoveSet = (Set<Long>) payload;
                            for (Long toRemovePath : toRemoveSet) {
                                traces.add(new ModelRemoveTrace(current.kid(), hashLoopRes, toRemovePath));
                            }
                        }
                    }
                }
            }
        }
        return traces;
    }

}
