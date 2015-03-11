package org.kevoree.modeling.api.traversal.actions;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.traversal.KTraversalAction;
import org.kevoree.modeling.api.traversal.KTraversalFilter;
import org.kevoree.modeling.api.traversal.KTraversalHistory;

/**
 * Created by duke on 19/12/14.
 */
public class KFilterAction implements KTraversalAction {

    private KTraversalAction _next;

    private KTraversalFilter _filter;

    public KFilterAction(KTraversalFilter p_filter) {
        this._filter = p_filter;
    }

    @Override
    public void chain(KTraversalAction p_next) {
        _next = p_next;
    }

    @Override
    public void execute(KObject[] p_inputs, KTraversalHistory p_history) {
        boolean[] selectedIndex = new boolean[p_inputs.length];
        int selected = 0;
        for (int i = 0; i < p_inputs.length; i++) {
            try {
                if (_filter.filter(p_inputs[i], p_history)) {
                    selectedIndex[i] = true;
                    selected++;
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        KObject[] nextStepElement = new KObject[selected];
        int inserted = 0;
        for (int i = 0; i < p_inputs.length; i++) {
            if (selectedIndex[i]) {
                nextStepElement[inserted] = p_inputs[i];
                inserted++;
            }
        }
        if(p_history!=null){
            p_history.addResult(nextStepElement);
        }
        _next.execute(nextStepElement, p_history);
    }

}

