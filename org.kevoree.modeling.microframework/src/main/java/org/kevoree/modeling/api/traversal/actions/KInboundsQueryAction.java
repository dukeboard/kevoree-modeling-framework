package org.kevoree.modeling.api.traversal.actions;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.manager.AccessMode;
import org.kevoree.modeling.api.data.manager.Index;
import org.kevoree.modeling.api.map.LongHashMap;
import org.kevoree.modeling.api.map.LongHashMapCallBack;
import org.kevoree.modeling.api.map.LongLongHashMap;
import org.kevoree.modeling.api.map.LongLongHashMapCallBack;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.traversal.KTraversalAction;
import org.kevoree.modeling.api.traversal.KTraversalHistory;

public class KInboundsQueryAction implements KTraversalAction {

    private KTraversalAction _next;

    private String _referenceQuery;

    public KInboundsQueryAction(String p_referenceQuery) {
        if (this._referenceQuery != null) {
            this._referenceQuery = p_referenceQuery.replace("*", ".*");
        }
    }

    @Override
    public void chain(KTraversalAction p_next) {
        _next = p_next;
    }

    @Override
    public void execute(KObject[] p_inputs, KTraversalHistory p_history) {
        if (p_inputs == null || p_inputs.length == 0) {
            if (p_history != null) {
                p_history.addResult(p_inputs);
            }
            _next.execute(p_inputs, p_history);
            return;
        } else {
            final AbstractKView currentView = (AbstractKView) p_inputs[0].view();
            final LongLongHashMap nextIds = new LongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
            final LongHashMap<KObject> toFilter = new LongHashMap<KObject>(p_inputs.length, KConfig.CACHE_LOAD_FACTOR);
            for (int i = 0; i < p_inputs.length; i++) {
                try {
                    AbstractKObject loopObj = (AbstractKObject) p_inputs[i];
                    KCacheEntry raw = currentView.universe().model().manager().entry(loopObj, AccessMode.READ);
                    if (raw != null) {
                        long[] inboundsKeys = raw.getRef(Index.INBOUNDS_INDEX);
                        if (inboundsKeys != null) {
                            if (_referenceQuery == null) {
                                for (int j = 0; j < inboundsKeys.length; j++) {
                                    nextIds.put(inboundsKeys[j], inboundsKeys[j]);
                                }
                            } else {
                                for (int j = 0; j < inboundsKeys.length; j++) {
                                    toFilter.put(inboundsKeys[j], p_inputs[i]);
                                }
                            }
                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (toFilter.size() == 0) {
                final long[] trimmed = new long[nextIds.size()];
                final int[] inserted = {0};
                nextIds.each(new LongLongHashMapCallBack() {
                    @Override
                    public void on(long key, long value) {
                        trimmed[inserted[0]] = key;
                        inserted[0]++;
                    }
                });
                currentView.internalLookupAll(trimmed, new Callback<KObject[]>() {
                    @Override
                    public void on(KObject[] kObjects) {
                        _next.execute(kObjects, p_history);
                    }
                });
            } else {
                final long[] trimmed = new long[toFilter.size()];
                final int[] inserted = {0};
                toFilter.each(new LongHashMapCallBack<KObject>() {
                    @Override
                    public void on(long key, KObject value) {
                        trimmed[inserted[0]] = key;
                        inserted[0]++;
                    }
                });
                currentView.internalLookupAll(trimmed, new Callback<KObject[]>() {
                    @Override
                    public void on(KObject[] kObjects) {
                        for (int i = 0; i < trimmed.length; i++) {
                            if (kObjects[i] != null) {
                                MetaReference[] references = kObjects[i].referencesWith(toFilter.get(trimmed[i]));
                                for (int h = 0; h < references.length; h++) {
                                    if (references[h].metaName().matches(_referenceQuery)) {
                                        nextIds.put(kObjects[i].uuid(), kObjects[i].uuid());
                                    }
                                }
                            }
                        }
                        final long[] trimmed2 = new long[nextIds.size()];
                        final int[] inserted2 = {0};
                        nextIds.each(new LongLongHashMapCallBack() {
                            @Override
                            public void on(long key, long value) {
                                trimmed2[inserted2[0]] = key;
                                inserted2[0]++;
                            }
                        });
                        currentView.internalLookupAll(trimmed2, new Callback<KObject[]>() {
                            @Override
                            public void on(KObject[] kObjects) {
                                if (p_history != null) {
                                    p_history.addResult(kObjects);
                                }
                                _next.execute(kObjects, p_history);
                            }
                        });
                    }
                });
            }
        }
    }

}
