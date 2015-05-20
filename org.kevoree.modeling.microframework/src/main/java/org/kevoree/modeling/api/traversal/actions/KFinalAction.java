package org.kevoree.modeling.api.traversal.actions;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.traversal.KTraversalAction;

public class KFinalAction implements KTraversalAction {

    private Callback<KObject[]> _finalCallback;

    public KFinalAction(Callback<KObject[]> p_callback) {
        this._finalCallback = p_callback;
    }

    @Override
    public void chain(KTraversalAction next) {
        //terminal leaf action
    }

    @Override
    public void execute(KObject[] inputs) {
        _finalCallback.on(inputs);
    }
}
