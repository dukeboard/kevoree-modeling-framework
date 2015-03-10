package org.kevoree.modeling.api.traversal.actions;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.traversal.KTraversalAction;
import org.kevoree.modeling.api.traversal.KTraversalFilter;

/**
 * Created by duke on 18/12/14.
 */
public class KDeepTraverseAction implements KTraversalAction {

    private KTraversalAction _next;

    private MetaReference _reference;

    private KTraversalFilter _stopCondition;

    public KDeepTraverseAction(MetaReference p_reference, KTraversalFilter p_stopCondition) {
        this._reference = p_reference;
        this._stopCondition = p_stopCondition;
    }

    @Override
    public void chain(KTraversalAction p_next) {
        _next = p_next;
    }

    @Override
    public void execute(KObject[] p_inputs) {
        //TODO
    }

}
