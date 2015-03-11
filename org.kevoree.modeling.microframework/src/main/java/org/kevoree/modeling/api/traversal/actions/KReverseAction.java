package org.kevoree.modeling.api.traversal.actions;

import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.manager.AccessMode;
import org.kevoree.modeling.api.data.manager.Index;
import org.kevoree.modeling.api.map.LongHashMap;
import org.kevoree.modeling.api.map.LongHashMapCallBack;
import org.kevoree.modeling.api.map.LongLongHashMap;
import org.kevoree.modeling.api.map.LongLongHashMapCallBack;
import org.kevoree.modeling.api.traversal.KTraversalAction;
import org.kevoree.modeling.api.traversal.KTraversalHistory;

/**
 * Created by duke on 11/03/15.
 */
public class KReverseAction implements KTraversalAction {

    private KTraversalAction _next;

    @Override
    public void chain(KTraversalAction p_next) {
        _next = p_next;
    }

    @Override
    public void execute(KObject[] p_inputs, KTraversalHistory p_history) {
        if (p_history == null || p_history.historySize() == 0) {
            throw new RuntimeException("Error during traversal execution, reverse action cannot be called without an history activation before, or history is null");
        }
        LongLongHashMap inbounds = new LongLongHashMap(p_inputs.length, KConfig.CACHE_LOAD_FACTOR);
        for (int i = 0; i < p_inputs.length; i++) {
            KCacheEntry rawPayload = p_inputs[i].view().universe().model().manager().entry(p_inputs[i], AccessMode.READ);
            if (rawPayload != null) {
                long[] loopInbounds = rawPayload.getRef(Index.INBOUNDS_INDEX);
                if (loopInbounds != null) {
                    for (int j = 0; j < loopInbounds.length; j++) {
                        inbounds.put(loopInbounds[j], loopInbounds[j]);
                    }
                }
            }
            p_history.remove(p_inputs[i].uuid());
        }
        LongHashMap<KObject> selected = new LongHashMap<KObject>(inbounds.size(), KConfig.CACHE_LOAD_FACTOR);
        inbounds.each(new LongLongHashMapCallBack() {
            @Override
            public void on(long key, long value) {
                KObject previous = p_history.get(key);
                if (previous != null) {
                    selected.put(key, previous);
                }
            }
        });
        KObject[] trimmed = new KObject[selected.size()];
        final int[] nbInsert = {0};
        selected.each(new LongHashMapCallBack<KObject>() {
            @Override
            public void on(long key, KObject value) {
                trimmed[nbInsert[0]] = value;
                nbInsert[0]++;
            }
        });
        _next.execute(trimmed, p_history);
    }

}
