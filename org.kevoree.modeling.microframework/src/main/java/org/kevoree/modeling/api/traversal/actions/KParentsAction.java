package org.kevoree.modeling.api.traversal.actions;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.manager.AccessMode;
import org.kevoree.modeling.api.data.manager.Index;
import org.kevoree.modeling.api.map.LongLongHashMap;
import org.kevoree.modeling.api.map.LongLongHashMapCallBack;
import org.kevoree.modeling.api.traversal.KTraversalAction;

/**
 * Created by duke on 18/12/14.
 */
public class KParentsAction implements KTraversalAction {

    private KTraversalAction _next;

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
            LongLongHashMap selected = new LongLongHashMap(p_inputs.length, KConfig.CACHE_LOAD_FACTOR);
            for (int i = 0; i < p_inputs.length; i++) {
                try {
                    AbstractKObject loopObj = (AbstractKObject) p_inputs[i];
                    KCacheEntry raw = loopObj.universe().model().manager().entry(loopObj, AccessMode.READ);
                    long[] resolved = raw.getRef(Index.PARENT_INDEX);
                    if (resolved != null && resolved.length > 0) {
                        selected.put(resolved[0], resolved[0]);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            long[] trimmed = new long[selected.size()];
            final int[] nbInserted = {0};
            selected.each(new LongLongHashMapCallBack() {
                @Override
                public void on(long key, long value) {
                    trimmed[nbInserted[0]] = key;
                    nbInserted[0]++;
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
