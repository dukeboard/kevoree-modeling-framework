package org.kevoree.modeling.api.traversal.actions;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.manager.AccessMode;
import org.kevoree.modeling.api.map.LongHashMap;
import org.kevoree.modeling.api.map.LongHashMapCallBack;
import org.kevoree.modeling.api.map.LongLongHashMap;
import org.kevoree.modeling.api.map.LongLongHashMapCallBack;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.traversal.KTraversalAction;
import org.kevoree.modeling.api.traversal.KTraversalHistory;

public class KInboundsAction implements KTraversalAction {

    private KTraversalAction _next;

    private MetaReference _reference;

    public KInboundsAction(MetaReference p_reference) {
        this._reference = p_reference;
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
            final AbstractKObject currentObject = (AbstractKObject) p_inputs[0];
            final LongLongHashMap nextIds = new LongLongHashMap(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
            for (int i = 0; i < p_inputs.length; i++) {
                try {
                    AbstractKObject loopObj = (AbstractKObject) p_inputs[i];
                    KCacheEntry raw = currentObject._manager.entry(loopObj, AccessMode.READ);
                    if (raw != null) {
                        for (int h = 0; h < loopObj.metaClass().metaReferences().length; h++) {
                            long[] elementsKeys = raw.getRef(loopObj.metaClass().metaReferences()[h].index());
                            if (elementsKeys != null) {
                                for (int j = 0; j < elementsKeys.length; j++) {
                                    nextIds.put(elementsKeys[j], elementsKeys[j]);
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
            currentObject._manager.lookupAllobjects(currentObject.universe(), currentObject.now(), trimmed, new Callback<KObject[]>() {
                @Override
                public void on(KObject[] kObjects) {
                    if (p_history != null) {
                        p_history.addResult(kObjects);
                    }
                    _next.execute(kObjects, p_history);
                }
            });
        }
    }

}
