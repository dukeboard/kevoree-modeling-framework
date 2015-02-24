package org.kevoree.modeling.api.traversal;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KDefer;
import org.kevoree.modeling.api.abs.AbstractKDeferWrapper;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.traversal.actions.*;

/**
 * Created by duke on 18/12/14.
 */
public class DefaultKTraversal implements KTraversal {

    private KObject[] _initObjs;

    private KTraversalAction _initAction;

    private KTraversalAction _lastAction;

    private boolean _terminated = false;

    public DefaultKTraversal(KObject p_root, KTraversalAction p_initAction) {
        this._initAction = p_initAction;
        this._initObjs = new KObject[1];
        this._initObjs[0] = p_root;
        this._lastAction = _initAction;
    }

    private static final String TERMINATED_MESSAGE = "Promise is terminated by the call of then method, please create another promise";

    @Override
    public KTraversal traverse(MetaReference p_metaReference) {
        if (_terminated) {
            throw new RuntimeException(TERMINATED_MESSAGE);
        }
        KTraverseAction tempAction = new KTraverseAction(p_metaReference);
        _lastAction.chain(tempAction);
        _lastAction = tempAction;
        return this;
    }

    @Override
    public KTraversal traverseQuery(String p_metaReferenceQuery) {
        if (_terminated) {
            throw new RuntimeException(TERMINATED_MESSAGE);
        }
        KTraverseQueryAction tempAction = new KTraverseQueryAction(p_metaReferenceQuery);
        _lastAction.chain(tempAction);
        _lastAction = tempAction;
        return this;
    }

    @Override
    public KTraversal withAttribute(MetaAttribute p_attribute, Object p_expectedValue) {
        if (_terminated) {
            throw new RuntimeException(TERMINATED_MESSAGE);
        }
        KFilterAttributeAction tempAction = new KFilterAttributeAction(p_attribute, p_expectedValue);
        _lastAction.chain(tempAction);
        _lastAction = tempAction;
        return this;
    }

    @Override
    public KTraversal withoutAttribute(MetaAttribute p_attribute, Object p_expectedValue) {
        if (_terminated) {
            throw new RuntimeException(TERMINATED_MESSAGE);
        }
        KFilterNotAttributeAction tempAction = new KFilterNotAttributeAction(p_attribute, p_expectedValue);
        _lastAction.chain(tempAction);
        _lastAction = tempAction;
        return this;
    }

    @Override
    public KTraversal attributeQuery(String p_attributeQuery) {
        if (_terminated) {
            throw new RuntimeException(TERMINATED_MESSAGE);
        }
        KFilterAttributeQueryAction tempAction = new KFilterAttributeQueryAction(p_attributeQuery);
        _lastAction.chain(tempAction);
        _lastAction = tempAction;
        return this;
    }

    @Override
    public KTraversal filter(KTraversalFilter p_filter) {
        if (_terminated) {
            throw new RuntimeException(TERMINATED_MESSAGE);
        }
        KFilterAction tempAction = new KFilterAction(p_filter);
        _lastAction.chain(tempAction);
        _lastAction = tempAction;
        return this;
    }

    @Override
    public KTraversal reverse(MetaReference p_metaReference) {
        if (_terminated) {
            throw new RuntimeException(TERMINATED_MESSAGE);
        }
        KReverseAction tempAction = new KReverseAction(p_metaReference);
        _lastAction.chain(tempAction);
        _lastAction = tempAction;
        return this;
    }

    @Override
    public KTraversal reverseQuery(String p_metaReferenceQuery) {
        if (_terminated) {
            throw new RuntimeException(TERMINATED_MESSAGE);
        }
        KReverseQueryAction tempAction = new KReverseQueryAction(p_metaReferenceQuery);
        _lastAction.chain(tempAction);
        _lastAction = tempAction;
        return this;
    }

    @Override
    public KTraversal parents() {
        if (_terminated) {
            throw new RuntimeException(TERMINATED_MESSAGE);
        }
        KParentsAction tempAction = new KParentsAction();
        _lastAction.chain(tempAction);
        _lastAction = tempAction;
        return this;
    }

    @Override
    public KDefer<KObject[]> then() {
        AbstractKDeferWrapper<KObject[]> task = new AbstractKDeferWrapper<KObject[]>();
        _terminated = true;
        //set the terminal leaf action
        _lastAction.chain(new KFinalAction(task.initCallback()));
        //execute the first element of the chain of actions
        _initAction.execute(_initObjs);
        return task;
    }

    @Override
    public KDefer<Object[]> map(MetaAttribute attribute) {
        AbstractKDeferWrapper<Object[]> task = new AbstractKDeferWrapper<Object[]>();
        _terminated = true;
        //set the terminal leaf action
        _lastAction.chain(new KMapAction(attribute, task.initCallback()));
        //execute the first element of the chain of actions
        _initAction.execute(_initObjs);
        return task;
    }

}
