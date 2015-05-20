package org.kevoree.modeling.api.traversal.actions;

import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.manager.AccessMode;
import org.kevoree.modeling.api.map.LongHashMap;
import org.kevoree.modeling.api.map.LongHashMapCallBack;
import org.kevoree.modeling.api.traversal.KTraversalAction;
import org.kevoree.modeling.api.traversal.KTraversalHistory;

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
        LongHashMap<KObject> selected = new LongHashMap<KObject>(KConfig.CACHE_INIT_SIZE, KConfig.CACHE_LOAD_FACTOR);
        for (int i = 0; i < p_inputs.length; i++) {
            AbstractKObject loopObj = (AbstractKObject)p_inputs[i];
            KCacheEntry rawPayload = loopObj._manager.entry(p_inputs[i], AccessMode.READ);
            if (rawPayload != null) {
                for(int j=0;j<loopObj.metaClass().metaReferences().length;j++){
                    long[] loopInbounds = rawPayload.getRef(loopObj.metaClass().metaReferences()[j].index());
                    if (loopInbounds != null) {
                        for (int h = 0; h < loopInbounds.length; h++) {
                            KObject previous = p_history.get(loopInbounds[h]);
                            if (previous != null) {
                                selected.put(loopInbounds[h], previous);
                            }
                        }
                    }
                }
            }
            p_history.remove(p_inputs[i].uuid());
        }
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
