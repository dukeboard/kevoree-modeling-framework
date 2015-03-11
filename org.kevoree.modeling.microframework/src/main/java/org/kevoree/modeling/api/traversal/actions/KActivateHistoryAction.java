package org.kevoree.modeling.api.traversal.actions;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.traversal.KTraversalAction;
import org.kevoree.modeling.api.traversal.KTraversalHistory;

/**
 * Created by duke on 11/03/15.
 */
public class KActivateHistoryAction implements KTraversalAction {

    private KTraversalAction _next;

    @Override
    public void chain(KTraversalAction p_next) {
        _next = p_next;
    }

    @Override
    public void execute(KObject[] inputs, KTraversalHistory p_history) {
        KTraversalHistory _history = p_history;
        if (_history == null) {
            _history = new KTraversalHistory();
        }
        _history.addResult(inputs);
        _next.execute(inputs, _history);
    }
}
