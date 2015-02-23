package org.kevoree.modeling.api.operation;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.data.manager.AccessMode;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.trace.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Created by duke on 26/07/13.
 */

public class DefaultModelCompare {

    public static void diff(KObject origin, KObject target, Callback<TraceSequence> callback) {
        internal_diff(origin, target, false, false, callback);
    }

    public static void merge(KObject origin, KObject target, Callback<TraceSequence> callback) {
        internal_diff(origin, target, false, true, callback);
    }

    public static void intersection(KObject origin, KObject target, Callback<TraceSequence> callback) {
        internal_diff(origin, target, true, false, callback);
    }

    private static void internal_diff(KObject origin, final KObject target, final boolean inter, final boolean merge, final Callback<TraceSequence> callback) {
        final List<ModelTrace> traces = new ArrayList<ModelTrace>();
        final List<ModelTrace> tracesRef = new ArrayList<ModelTrace>();
        final Map<Long, KObject> objectsMap = new HashMap<Long, KObject>();
        traces.addAll(internal_createTraces(origin, target, inter, merge, false, true));
        tracesRef.addAll(internal_createTraces(origin, target, inter, merge, true, false));
        origin.visit(new ModelVisitor() {
            @Override
            public VisitResult visit(KObject elem) {
                objectsMap.put(elem.uuid(), elem);
                return VisitResult.CONTINUE;
            }
        }, VisitRequest.CONTAINED).then(new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                if (throwable != null) {
                    throwable.printStackTrace();
                    callback.on(null);
                } else {
                    target.visit(new ModelVisitor() {
                        @Override
                        public VisitResult visit(KObject elem) {
                            Long childUUID = elem.uuid();
                            if (objectsMap.containsKey(childUUID)) {
                                if (inter) {
                                    traces.add(new ModelNewTrace(elem.uuid(), elem.metaClass()));
                                    traces.add(new ModelAddTrace(elem.parentUuid(), elem.referenceInParent(), elem.uuid()));
                                }
                                traces.addAll(internal_createTraces(objectsMap.get(childUUID), elem, inter, merge, false, true));
                                tracesRef.addAll(internal_createTraces(objectsMap.get(childUUID), elem, inter, merge, true, false));
                                objectsMap.remove(childUUID); //drop from to process elements
                            } else {
                                if (!inter) {
                                    traces.add(new ModelNewTrace(elem.uuid(), elem.metaClass()));
                                    traces.add(new ModelAddTrace(elem.parentUuid(), elem.referenceInParent(), elem.uuid()));
                                    traces.addAll(internal_createTraces(elem, elem, true, merge, false, true));
                                    tracesRef.addAll(internal_createTraces(elem, elem, true, merge, true, false));
                                }
                            }
                            return VisitResult.CONTINUE;
                        }
                    }, VisitRequest.CONTAINED).then(new Callback<Throwable>() {
                        @Override
                        public void on(Throwable throwable) {
                            if (throwable != null) {
                                throwable.printStackTrace();
                                callback.on(null);
                            } else {
                                traces.addAll(tracesRef); //references should be deleted before, deletion of elements
                                if (!inter && !merge) {
                                    //if diff
                                    Long[] diffChildKeys = objectsMap.keySet().toArray(new Long[objectsMap.size()]);
                                    for (int i = 0; i < diffChildKeys.length; i++) {
                                        Long diffChildKey = diffChildKeys[i];
                                        KObject diffChild = objectsMap.get(diffChildKey);
                                        Long src = diffChild.parentUuid();
                                        traces.add(new ModelRemoveTrace(src, diffChild.referenceInParent(), diffChild.uuid()));
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

    private static List<ModelTrace> internal_createTraces(final KObject current, KObject sibling, final boolean inter, boolean merge, boolean references, boolean attributes) {
        final List<ModelTrace> traces = new ArrayList<ModelTrace>();
        final Map<MetaAttribute, String> values = new HashMap<MetaAttribute, String>();
        if (attributes) {
            if (current != null) {
                current.visitAttributes(new ModelAttributeVisitor() {
                    @Override
                    public void visit(MetaAttribute metaAttribute, Object value) {
                        if (value == null) {
                            values.put(metaAttribute, null);
                        } else {
                            values.put(metaAttribute, value.toString());
                        }
                    }
                });
            }
            if (sibling != null) {
                sibling.visitAttributes(new ModelAttributeVisitor() {
                    @Override
                    public void visit(MetaAttribute metaAttribute, Object value) {
                        String flatAtt2 = null;
                        if (value != null) {
                            flatAtt2 = value.toString();
                        }
                        String flatAtt1 = values.get(metaAttribute);
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
                                traces.add(new ModelSetTrace(current.uuid(), metaAttribute, flatAtt2));
                            }
                        } else {
                            if (!inter) {
                                traces.add(new ModelSetTrace(current.uuid(), metaAttribute, flatAtt2));
                            }
                        }
                        values.remove(metaAttribute);
                    }
                });
            }
            if (!inter && !merge && !values.isEmpty()) {
                MetaAttribute[] mettaAttributes = values.keySet().toArray(new MetaAttribute[values.size()]);
                for (int i = 0; i < mettaAttributes.length; i++) {
                    MetaAttribute hashLoopRes = mettaAttributes[i];
                    traces.add(new ModelSetTrace(current.uuid(), hashLoopRes, null));
                    values.remove(hashLoopRes);
                }
            }
        }
        Map<MetaReference, Object> valuesRef = new HashMap<MetaReference, Object>();
        if (references) {
            for (int i = 0; i < current.metaClass().metaReferences().length; i++) {
                MetaReference reference = current.metaClass().metaReferences()[i];
                Object payload = current.view().universe().model().manager().entry(current, AccessMode.READ).get(reference.index());
                valuesRef.put(reference, payload);
            }
            if (sibling != null) {
                for (int i = 0; i < sibling.metaClass().metaReferences().length; i++) {
                    MetaReference reference = sibling.metaClass().metaReferences()[i];
                    Object payload2 = sibling.view().universe().model().manager().entry(sibling, AccessMode.READ).get(reference.index());
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
                                    traces.add(new ModelAddTrace(current.uuid(), reference, (Long) payload2));
                                }
                            }
                        } else {
                            if (!inter) {
                                traces.add(new ModelAddTrace(current.uuid(), reference, (Long) payload2));
                            }
                        }
                    } else {
                        if (payload1 == null && payload2 != null) {
                            Long[] siblingToAdd = ((Set<Long>) payload2).toArray(new Long[((Set<Long>) payload2).size()]);
                            for (int j = 0; j < siblingToAdd.length; j++) {
                                Long siblingElem = siblingToAdd[j];
                                if (!inter) {
                                    traces.add(new ModelAddTrace(current.uuid(), reference, siblingElem));
                                }
                            }
                        } else {
                            if (payload1 != null) {
                                Long[] currentPaths = ((Set<Long>) payload1).toArray(new Long[((Set<Long>) payload1).size()]);
                                for (int j = 0; j < currentPaths.length; j++) {
                                    Long currentPath = currentPaths[j];
                                    boolean isFound = false;
                                    if (payload2 != null) {
                                        Set<Long> siblingPaths = (Set<Long>) payload2;
                                        isFound = siblingPaths.contains(currentPath);
                                    }
                                    if (isFound) {
                                        if (inter) {
                                            traces.add(new ModelAddTrace(current.uuid(), reference, currentPath));
                                        }
                                    } else {
                                        if (!inter) {
                                            traces.add(new ModelRemoveTrace(current.uuid(), reference, currentPath));
                                        }
                                    }
                                }
                            }
                        }
                    }
                    valuesRef.remove(reference);
                }
                if (!inter && !merge && !valuesRef.isEmpty()) {
                    MetaReference[] metaReferences = valuesRef.keySet().toArray(new MetaReference[valuesRef.size()]);
                    for (int i = 0; i < metaReferences.length; i++) {
                        MetaReference hashLoopResRef = metaReferences[i];
                        Object payload = valuesRef.get(hashLoopResRef);
                        if (payload != null) {
                            if (payload instanceof Set) {
                                Long[] toRemoveSet = ((Set<Long>) payload).toArray(new Long[((Set<Long>) payload).size()]);
                                for (int j = 0; j < toRemoveSet.length; j++) {
                                    Long toRemovePath = toRemoveSet[j];
                                    traces.add(new ModelRemoveTrace(current.uuid(), hashLoopResRef, toRemovePath));
                                }
                            } else {
                                traces.add(new ModelRemoveTrace(current.uuid(), hashLoopResRef, (Long) payload));
                            }
                        }
                    }
                }
            }
        }
        return traces;
    }

}
