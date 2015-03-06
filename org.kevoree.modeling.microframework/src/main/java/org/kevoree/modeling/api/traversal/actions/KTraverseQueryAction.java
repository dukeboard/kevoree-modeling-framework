package org.kevoree.modeling.api.traversal.actions;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.manager.AccessMode;
import org.kevoree.modeling.api.map.LongLongHashMap;
import org.kevoree.modeling.api.map.LongLongHashMapCallBack;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.traversal.KTraversalAction;
import org.kevoree.modeling.api.util.ArrayUtils;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by duke on 30/01/15.
 */
public class KTraverseQueryAction implements KTraversalAction {

    private final String SEP = ",";

    private KTraversalAction _next;

    private String _referenceQuery;

    public KTraverseQueryAction(String p_referenceQuery) {
        this._referenceQuery = p_referenceQuery;
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
            LongLongHashMap nextIds = new LongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
            for (int i = 0; i < p_inputs.length; i++) {
                try {
                    AbstractKObject loopObj = (AbstractKObject) p_inputs[i];
                    KCacheEntry raw = currentView.universe().model().manager().entry(loopObj, AccessMode.READ);
                    if (raw != null) {
                        if (_referenceQuery == null) {
                            for (int j = 0; j < loopObj.metaClass().metaReferences().length; j++) {
                                MetaReference ref = loopObj.metaClass().metaReferences()[j];
                                Object resolved = raw.get(ref.index());
                                if (resolved != null) {
                                    long[] resolvedArr = (long[]) resolved;
                                    for (int k = 0; k < resolvedArr.length; k++) {
                                        Long idResolved = resolvedArr[k];
                                        nextIds.put(idResolved, idResolved);
                                    }
                                }
                            }
                        } else {
                            String[] queries = _referenceQuery.split(SEP);
                            for (int k = 0; k < queries.length; k++) {
                                queries[k] = queries[k].replace("*", ".*");
                            }
                            MetaReference[] loopRefs = loopObj.metaClass().metaReferences();
                            for (int h = 0; h < loopRefs.length; h++) {
                                MetaReference ref = loopRefs[h];
                                boolean selected = false;
                                for (int k = 0; k < queries.length; k++) {
                                    if (ref.metaName().matches(queries[k])) {
                                        selected = true;
                                        break;
                                    }
                                }
                                if (selected) {
                                    Object resolved = raw.get(ref.index());
                                    if (resolved != null) {
                                        long[] resolvedCasted = (long[]) resolved;
                                        for (int j = 0; j < resolvedCasted.length; j++) {
                                            nextIds.put(resolvedCasted[j], resolvedCasted[j]);
                                        }
                                    }
                                }
                            }
                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
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
                    _next.execute(kObjects);
                }
            });
        }
    }

}
