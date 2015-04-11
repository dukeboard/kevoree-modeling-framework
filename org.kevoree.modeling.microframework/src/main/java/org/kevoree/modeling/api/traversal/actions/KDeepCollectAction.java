package org.kevoree.modeling.api.traversal.actions;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.manager.AccessMode;
import org.kevoree.modeling.api.map.LongHashMap;
import org.kevoree.modeling.api.map.LongHashMapCallBack;
import org.kevoree.modeling.api.map.LongLongHashMap;
import org.kevoree.modeling.api.map.LongLongHashMapCallBack;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.traversal.KTraversalAction;
import org.kevoree.modeling.api.traversal.KTraversalFilter;
import org.kevoree.modeling.api.traversal.KTraversalHistory;

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

    private AbstractKView currentView;

    @Override
    public void execute(KObject[] p_inputs, KTraversalHistory p_history) {
        if (p_inputs == null || p_inputs.length == 0) {
            if (p_history != null) {
                p_history.addResult(p_inputs);
            }
            _next.execute(p_inputs, p_history);
            return;
        } else {
            currentView = (AbstractKView) p_inputs[0].view();
            _alreadyPassed = new LongHashMap<KObject>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
            _finalElements = new LongHashMap<KObject>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
            KObject[] filtered_inputs = new KObject[p_inputs.length];
            for (int i = 0; i < p_inputs.length; i++) {
                if (_continueCondition == null || _continueCondition.filter(p_inputs[i], p_history)) {
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
                        if ((_continueCondition == null || _continueCondition.filter(traversed[i], p_history)) && !_alreadyPassed.containsKey(traversed[i].uuid())) {
                            filtered_inputs2[i] = traversed[i];
                            _alreadyPassed.put(traversed[i].uuid(), traversed[i]);
                            _finalElements.put(traversed[i].uuid(), traversed[i]);
                            nbSize++;
                        }
                    }
                    if (nbSize > 0) {
                        if(p_history != null){
                            p_history.addResult(filtered_inputs2);
                        }
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
                        if (p_history != null) {
                            p_history.addResult(trimmed);
                        }
                        _next.execute(trimmed, p_history);
                    }
                }
            };
            executeStep(filtered_inputs, iterationCallbacks[0]);
        }
    }

    private void executeStep(KObject[] p_inputStep, Callback<KObject[]> private_callback) {
        LongLongHashMap nextIds = new LongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
        for (int i = 0; i < p_inputStep.length; i++) {
            if (p_inputStep[i] != null) {
                try {
                    AbstractKObject loopObj = (AbstractKObject) p_inputStep[i];
                    KCacheEntry raw = currentView.universe().model().manager().entry(loopObj, AccessMode.READ);
                    if (raw != null) {
                        if (_reference == null) {
                            for (int j = 0; j < loopObj.metaClass().metaReferences().length; j++) {
                                MetaReference ref = loopObj.metaClass().metaReferences()[j];
                                long[] resolved = raw.getRef(ref.index());
                                if (resolved != null) {
                                    for (int k = 0; k < resolved.length; k++) {
                                        nextIds.put(resolved[k], resolved[k]);
                                    }
                                }
                            }
                        } else {
                            MetaReference translatedRef = loopObj.internal_transpose_ref(_reference);
                            if (translatedRef != null) {
                                long[] resolved = raw.getRef(translatedRef.index());
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
        currentView.internalLookupAll(trimmed, new Callback<KObject[]>() {
            @Override
            public void on(KObject[] kObjects) {
                private_callback.on(kObjects);
            }
        });
    }

}
