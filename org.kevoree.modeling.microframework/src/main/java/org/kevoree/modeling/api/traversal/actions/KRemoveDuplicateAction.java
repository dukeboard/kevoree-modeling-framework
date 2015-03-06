package org.kevoree.modeling.api.traversal.actions;

import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.map.LongHashMap;
import org.kevoree.modeling.api.map.LongHashMapCallBack;
import org.kevoree.modeling.api.traversal.KTraversalAction;

/**
 * Created by duke on 05/03/15.
 */
public class KRemoveDuplicateAction implements KTraversalAction {

    private KTraversalAction _next;

    @Override
    public void chain(KTraversalAction p_next) {
        _next = p_next;
    }

    @Override
    public void execute(KObject[] p_inputs) {
        LongHashMap elems = new LongHashMap(p_inputs.length, KConfig.CACHE_LOAD_FACTOR);
        for (int i = 0; i < p_inputs.length; i++) {
            elems.put(p_inputs[i].uuid(), p_inputs[i]);
        }
        final KObject[] trimmed = new KObject[elems.size()];
        final int[] nbInserted = {0};
        elems.each(new LongHashMapCallBack<KObject>() {
            @Override
            public void on(long key, KObject value) {
                trimmed[nbInserted[0]] = value;
                nbInserted[0]++;
            }
        });
        _next.execute(trimmed);
    }

}