package org.kevoree.modeling.traversal.actions;

import org.kevoree.modeling.Callback;
import org.kevoree.modeling.KConfig;
import org.kevoree.modeling.KObject;
import org.kevoree.modeling.abs.AbstractKObject;
import org.kevoree.modeling.memory.struct.segment.KCacheSegment;
import org.kevoree.modeling.memory.AccessMode;
import org.kevoree.modeling.memory.struct.map.LongHashMap;
import org.kevoree.modeling.memory.struct.map.LongHashMapCallBack;
import org.kevoree.modeling.memory.struct.map.LongLongHashMap;
import org.kevoree.modeling.memory.struct.map.LongLongHashMapCallBack;
import org.kevoree.modeling.meta.MetaReference;
import org.kevoree.modeling.traversal.KTraversalAction;
import org.kevoree.modeling.traversal.KTraversalFilter;

public class KDeepCollectAction implements KTraversalAction {

    private KTraversalAction _next;

    private MetaReference _reference;

    private KTraversalFilter _continueCondition;

    public KDeepCollectAction(MetaReference p_reference, KTraversalFilter p_continueCondition) {
        this._reference = p_reference;
        this._continueCondition = p_continueCondition;
    }

    @Override
    public void chain(KTraversalAction p_next) {
        _next = p_next;
    }

    private LongHashMap<KObject> _alreadyPassed = null;

    private LongHashMap<KObject> _finalElements = null;

    @Override
    public void execute(KObject[] p_inputs) {
        if (p_inputs == null || p_inputs.length == 0) {
            _next.execute(p_inputs);
            return;
        } else {
            _alreadyPassed = new LongHashMap<KObject>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
            _finalElements = new LongHashMap<KObject>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
            KObject[] filtered_inputs = new KObject[p_inputs.length];
            for (int i = 0; i < p_inputs.length; i++) {
                if (_continueCondition == null || _continueCondition.filter(p_inputs[i])) {
                    filtered_inputs[i] = p_inputs[i];
                    _alreadyPassed.put(p_inputs[i].uuid(), p_inputs[i]);
                }
            }
            final Callback<KObject[]>[] iterationCallbacks = new Callback[1];
            iterationCallbacks[0] = new Callback<KObject[]>() {
                @Override
                public void on(KObject[] traversed) {
                    KObject[] filtered_inputs2 = new KObject[traversed.length];
                    int nbSize = 0;
                    for (int i = 0; i < traversed.length; i++) {
                        if ((_continueCondition == null || _continueCondition.filter(traversed[i])) && !_alreadyPassed.containsKey(traversed[i].uuid())) {
                            filtered_inputs2[i] = traversed[i];
                            _alreadyPassed.put(traversed[i].uuid(), traversed[i]);
                            _finalElements.put(traversed[i].uuid(), traversed[i]);
                            nbSize++;
                        }
                    }
                    if (nbSize > 0) {
                        executeStep(filtered_inputs2, iterationCallbacks[0]);
                    } else {
                        KObject[] trimmed = new KObject[_finalElements.size()];
                        final int[] nbInserted = {0};
                        _finalElements.each(new LongHashMapCallBack<KObject>() {
                            @Override
                            public void on(long key, KObject value) {
                                trimmed[nbInserted[0]] = value;
                                nbInserted[0]++;
                            }
                        });
                        _next.execute(trimmed);
                    }
                }
            };
            executeStep(filtered_inputs, iterationCallbacks[0]);
        }
    }

    private void executeStep(KObject[] p_inputStep, Callback<KObject[]> private_callback) {
        AbstractKObject currentObject = null;
        LongLongHashMap nextIds = new LongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
        for (int i = 0; i < p_inputStep.length; i++) {
            if (p_inputStep[i] != null) {
                try {
                    AbstractKObject loopObj = (AbstractKObject) p_inputStep[i];
                    currentObject = loopObj;
                    KCacheSegment raw = loopObj._manager.segment(loopObj, AccessMode.READ);
                    if (raw != null) {
                        if (_reference == null) {
                            for (int j = 0; j < loopObj.metaClass().metaReferences().length; j++) {
                                MetaReference ref = loopObj.metaClass().metaReferences()[j];
                                long[] resolved = raw.getRef(ref.index(),loopObj.metaClass());
                                if (resolved != null) {
                                    for (int k = 0; k < resolved.length; k++) {
                                        nextIds.put(resolved[k], resolved[k]);
                                    }
                                }
                            }
                        } else {
                            MetaReference translatedRef = loopObj.internal_transpose_ref(_reference);
                            if (translatedRef != null) {
                                long[] resolved = raw.getRef(translatedRef.index(),loopObj.metaClass());
                                if (resolved != null) {
                                    for (int j = 0; j < resolved.length; j++) {
                                        nextIds.put(resolved[j], resolved[j]);
                                    }
                                }
                            }
                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
        final long[] trimmed = new long[nextIds.size()];
        final int[] inserted = {0};
        nextIds.each(new LongLongHashMapCallBack() {
            @Override
            public void on(long key, long value) {
                trimmed[inserted[0]] = key;
                inserted[0]++;
            }
        });
        //call
        currentObject._manager.lookupAllobjects(currentObject.universe(), currentObject.now(), trimmed, new Callback<KObject[]>() {
            @Override
            public void on(KObject[] kObjects) {
                private_callback.on(kObjects);
            }
        });
    }

}
