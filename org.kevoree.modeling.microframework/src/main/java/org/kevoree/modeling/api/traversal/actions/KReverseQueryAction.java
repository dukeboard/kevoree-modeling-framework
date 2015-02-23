package org.kevoree.modeling.api.traversal.actions;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.manager.AccessMode;
import org.kevoree.modeling.api.data.manager.Index;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.traversal.KTraversalAction;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * Created by duke on 18/12/14.
 */
public class KReverseQueryAction implements KTraversalAction {

    private KTraversalAction _next;

    private String _referenceQuery;

    public KReverseQueryAction(String p_referenceQuery) {
        if (this._referenceQuery != null) {
            this._referenceQuery = p_referenceQuery.replace("*", ".*");
        }
    }

    @Override
    public void chain(KTraversalAction p_next) {
        _next = p_next;
    }

    @Override
    public void execute(KObject[] p_inputs) {
        if (p_inputs == null || p_inputs.length == 0) {
            _next.execute(p_inputs);
            return;
        } else {
            AbstractKView currentView = (AbstractKView) p_inputs[0].view();
            Set<Long> nextIds = new HashSet<Long>();
            Map<Long, KObject> toFilter = new HashMap<Long, KObject>();
            for (int i = 0; i < p_inputs.length; i++) {
                try {
                    AbstractKObject loopObj = (AbstractKObject) p_inputs[i];
                    KCacheEntry raw = currentView.universe().model().manager().entry(loopObj, AccessMode.READ);
                    if (raw != null) {
                        if (_referenceQuery == null) {
                            if (raw.get(Index.INBOUNDS_INDEX) != null && raw.get(Index.INBOUNDS_INDEX) instanceof Set) {
                                Set<Long> casted = (Set<Long>) raw.get(Index.INBOUNDS_INDEX);
                                Long[] castedArr = casted.toArray(new Long[casted.size()]);
                                for (int j = 0; j < castedArr.length; j++) {
                                    nextIds.add(castedArr[j]);
                                }
                            }
                        } else {
                            if (raw.get(Index.INBOUNDS_INDEX) != null && raw.get(Index.INBOUNDS_INDEX) instanceof Set) {
                                Set<Long> casted = (Set<Long>) raw.get(Index.INBOUNDS_INDEX);
                                Long[] castedArr = casted.toArray(new Long[casted.size()]);
                                for (int j = 0; j < castedArr.length; j++) {
                                    toFilter.put(castedArr[j], p_inputs[i]);
                                }
                            }
                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (toFilter.keySet().size() == 0) {
                currentView.internalLookupAll(nextIds.toArray(new Long[nextIds.size()]), new Callback<KObject[]>() {
                    @Override
                    public void on(KObject[] kObjects) {
                        _next.execute(kObjects);
                    }
                });
            } else {
                Long[] toFilterKeys = toFilter.keySet().toArray(new Long[toFilter.keySet().size()]);
                currentView.internalLookupAll(toFilterKeys, new Callback<KObject[]>() {
                    @Override
                    public void on(KObject[] kObjects) {
                        for (int i = 0; i < toFilterKeys.length; i++) {
                            if (kObjects[i] != null) {
                                MetaReference[] references = kObjects[i].referencesWith(toFilter.get(toFilterKeys[i]));
                                for (int h = 0; h < references.length; h++) {
                                    if (references[h].metaName().matches(_referenceQuery)) {
                                        nextIds.add(kObjects[i].uuid());
                                    }
                                }
                            }
                        }
                        currentView.internalLookupAll(nextIds.toArray(new Long[nextIds.size()]),new Callback<KObject[]>() {
                            @Override
                            public void on(KObject[] kObjects) {
                                _next.execute(kObjects);
                            }
                        });
                    }
                });
            }
        }
    }

}
