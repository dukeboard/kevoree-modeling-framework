package org.kevoree.modeling.api.traversal.actions;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.traversal.KTraversalAction;
import org.kevoree.modeling.api.traversal.KTraversalFilter;

import java.util.ArrayList;

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
    public void execute(KObject[] p_inputs) {
        ArrayList<KObject> nextStep = new ArrayList<KObject>();
        for (int i = 0; i < p_inputs.length; i++) {
            try {
                if (_filter.filter(p_inputs[i])) {
                    nextStep.add(p_inputs[i]);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        _next.execute(nextStep.toArray(new KObject[nextStep.size()]));
    }

}

