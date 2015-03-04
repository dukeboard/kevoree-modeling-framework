package org.kevoree.modeling.api.trace;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KActionType;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.meta.MetaType;
import org.kevoree.modeling.api.rbtree.LongRBTree;
import org.kevoree.modeling.api.util.ArrayUtils;

import java.util.HashMap;
import java.util.HashSet;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 06/08/13
 * Time: 08:54
 */
public class ModelTraceApplicator {

    private KObject _targetModel;

    public ModelTraceApplicator(KObject p_targetModel) {
        this._targetModel = p_targetModel;
    }

    public void applyTraceSequence(final TraceSequence traceSeq, final Callback<Throwable> callback) {
        try {
            final ModelTrace[] traces = traceSeq.traces();
            HashSet<Long> dependencies = new HashSet<Long>();
            for (int i = 0; i < traces.length; i++) {
                if (traces[i] instanceof ModelAddTrace) {
                    dependencies.add(((ModelAddTrace) traces[i]).paramUUID());
                    dependencies.add(traces[i].sourceUUID());
                }
                if (traces[i] instanceof ModelRemoveTrace) {
                    dependencies.add(((ModelRemoveTrace) traces[i]).paramUUID());
                    dependencies.add(traces[i].sourceUUID());
                }
                if (traces[i] instanceof ModelSetTrace) {
                    if (traces[i].meta() != null && traces[i].meta().metaType().equals(MetaType.ATTRIBUTE)) {
                        dependencies.add(traces[i].sourceUUID());
                    } else {
                        try {
                            Long paramUUID = Long.parseLong(((ModelSetTrace) traces[i]).content().toString());
                            dependencies.add(paramUUID);
                            dependencies.add(traces[i].sourceUUID());
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
            _targetModel.view().lookupAll(ArrayUtils.flatSet(dependencies)).then(new Callback<KObject[]>() {
                @Override
                public void on(KObject[] kObjects) {
                    HashMap<Long, KObject> cached = new HashMap<Long, KObject>();
                    for (int i = 0; i < traces.length; i++) {
                        try {
                            ModelTrace trace = traces[i];
                            KObject sourceObject = cached.get(trace.sourceUUID());
                            if (sourceObject != null) {
                                if (trace instanceof ModelRemoveTrace) {
                                    ModelRemoveTrace removeTrace = (ModelRemoveTrace) trace;
                                    KObject param = cached.get(removeTrace.paramUUID());
                                    if (param != null) {
                                        sourceObject.mutate(KActionType.REMOVE, (MetaReference) removeTrace.meta(), param);
                                    }
                                } else if (trace instanceof ModelAddTrace) {
                                    ModelAddTrace addTrace = (ModelAddTrace) trace;
                                    KObject param = cached.get(addTrace.paramUUID());
                                    if (param != null) {
                                        sourceObject.mutate(KActionType.ADD, (MetaReference) addTrace.meta(), param);
                                    }
                                } else if (trace instanceof ModelSetTrace) {
                                    ModelSetTrace setTrace = (ModelSetTrace) trace;
                                    if (trace.meta() != null && trace.meta().metaType().equals(MetaType.ATTRIBUTE)) {
                                        sourceObject.set((MetaAttribute) trace.meta(), setTrace.content());
                                    } else {
                                        try {
                                            Long paramUUID = Long.parseLong(((ModelSetTrace) traces[i]).content().toString());
                                            KObject param = cached.get(paramUUID);
                                            if (param != null) {
                                                sourceObject.mutate(KActionType.SET, (MetaReference) trace.meta(), param);
                                            }
                                        } catch (Exception e) {
                                            e.printStackTrace();
                                        }
                                    }
                                } else if (trace instanceof ModelNewTrace) {
                                    LongRBTree universeTree = new LongRBTree();
                                    universeTree.insert(_targetModel.universe().key(), _targetModel.now());
                                    KObject newCreated = ((AbstractKView) _targetModel.view()).createProxy((MetaClass) trace.meta(), universeTree, trace.sourceUUID());
                                    _targetModel.universe().model().manager().initKObject(newCreated, _targetModel.view());
                                    cached.put(newCreated.uuid(), newCreated);
                                } else {
                                    System.err.println("Unknow traceType: " + trace);
                                }
                            } else {
                                System.err.println("Unknow object: " + trace);
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                            System.err.println("Error " + e);
                        }
                    }
                    callback.on(null);
                }
            });
        } catch (Exception e) {
            callback.on(e);
        }
    }

}
