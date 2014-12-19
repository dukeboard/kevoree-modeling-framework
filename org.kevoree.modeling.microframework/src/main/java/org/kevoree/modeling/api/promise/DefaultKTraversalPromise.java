package org.kevoree.modeling.api.promise;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.promise.actions.KFilterAction;
import org.kevoree.modeling.api.promise.actions.KFilterAttributeAction;
import org.kevoree.modeling.api.promise.actions.KFinalAction;
import org.kevoree.modeling.api.promise.actions.KTraverseAction;

/**
 * Created by duke on 18/12/14.
 */
public class DefaultKTraversalPromise implements KTraversalPromise {

    private KObject[] _initObjs;

    private KTraversalAction _initAction;

    private KTraversalAction _lastAction;

    private boolean _terminated = false;

    public DefaultKTraversalPromise(KObject p_root, MetaReference p_ref) {
        _initAction = new KTraverseAction(p_ref);
        _initObjs = new KObject[1];
        _initObjs[0] = p_root;
        _lastAction = _initAction;
    }

    @Override
    public KTraversalPromise traverse(MetaReference p_metaReference) {
        if (_terminated) {
            throw new RuntimeException("Promise is terminated by the call of then method, please create another promise");
        }
        KTraverseAction tempAction = new KTraverseAction(p_metaReference);
        _lastAction.chain(tempAction);
        _lastAction = tempAction;
        return this;
    }

    @Override
    public KTraversalPromise attribute(MetaAttribute p_attribute, Object p_expectedValue) {
        if (_terminated) {
            throw new RuntimeException("Promise is terminated by the call of then method, please create another promise");
        }
        KFilterAttributeAction tempAction = new KFilterAttributeAction(p_attribute, p_expectedValue);
        _lastAction.chain(tempAction);
        _lastAction = tempAction;
        return this;
    }

    @Override
    public KTraversalPromise filter(KTraversalFilter p_filter) {
        if (_terminated) {
            throw new RuntimeException("Promise is terminated by the call of then method, please create another promise");
        }
        KFilterAction tempAction = new KFilterAction(p_filter);
        _lastAction.chain(tempAction);
        _lastAction = tempAction;
        return this;
    }

    @Override
    public void then(Callback<KObject[]> callback) {
        //set the terminal leaf action
        _lastAction.chain(new KFinalAction(callback));
        //execute the first element of the chain of actions
        _initAction.execute(_initObjs);
    }

}
