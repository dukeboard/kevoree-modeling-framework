package org.kevoree.modeling.traversal.actions;

import org.kevoree.modeling.KObject;
import org.kevoree.modeling.Callback;
import org.kevoree.modeling.KConfig;
import org.kevoree.modeling.abs.AbstractKObject;
import org.kevoree.modeling.memory.KCacheElementSegment;
import org.kevoree.modeling.memory.struct.segment.HeapCacheSegment;
import org.kevoree.modeling.memory.AccessMode;
import org.kevoree.modeling.memory.struct.map.LongLongHashMap;
import org.kevoree.modeling.memory.struct.map.LongLongHashMapCallBack;
import org.kevoree.modeling.meta.MetaReference;
import org.kevoree.modeling.traversal.KTraversalAction;

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
            AbstractKObject currentFirstObject = (AbstractKObject) p_inputs[0];
            LongLongHashMap nextIds = new LongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
            for (int i = 0; i < p_inputs.length; i++) {
                try {
                    AbstractKObject loopObj = (AbstractKObject) p_inputs[i];
                    KCacheElementSegment raw = loopObj._manager.segment(loopObj, AccessMode.READ);
                    if (raw != null) {
                        if (_referenceQuery == null) {
                            for (int j = 0; j < loopObj.metaClass().metaReferences().length; j++) {
                                MetaReference ref = loopObj.metaClass().metaReferences()[j];
                                Object resolved = raw.get(ref.index(), loopObj.metaClass());
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
                                    if (queries[k] != null && queries[k].startsWith("#")) {
                                        if (ref.opposite().metaName().matches(queries[k].substring(1))) {
                                            selected = true;
                                            break;
                                        }
                                    } else {
                                        if (ref.metaName().matches(queries[k])) {
                                            selected = true;
                                            break;
                                        }
                                    }
                                }
                                if (selected) {
                                    Object resolved = raw.get(ref.index(), loopObj.metaClass());
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
            currentFirstObject._manager.lookupAllobjects(currentFirstObject.universe(), currentFirstObject.now(), trimmed, new Callback<KObject[]>() {
                @Override
                public void on(KObject[] kObjects) {
                    _next.execute(kObjects);
                }
            });
        }
    }

}
