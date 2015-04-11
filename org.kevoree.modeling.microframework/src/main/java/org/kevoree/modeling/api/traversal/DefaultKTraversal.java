package org.kevoree.modeling.api.traversal;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KDefer;
import org.kevoree.modeling.api.abs.AbstractKDeferWrapper;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.traversal.actions.*;

public class DefaultKTraversal implements KTraversal {

    private static final String TERMINATED_MESSAGE = "Promise is terminated by the call of done method, please create another promise";

    private KObject[] _initObjs;

    private KTraversalAction _initAction;

    private KTraversalAction _lastAction;

    private boolean _terminated = false;

    public DefaultKTraversal(KObject p_root) {
        this._initObjs = new KObject[1];
        this._initObjs[0] = p_root;
    }

    private KTraversal internal_chain_action(KTraversalAction p_action) {
        if (_terminated) {
            throw new RuntimeException(TERMINATED_MESSAGE);
        }
        if (_initAction == null) {
            _initAction = p_action;
        }
        if (_lastAction != null) {
            _lastAction.chain(p_action);
        }
        _lastAction = p_action;
        return this;
    }


    @Override
    public KTraversal traverse(MetaReference p_metaReference) {
        return internal_chain_action(new KTraverseAction(p_metaReference));
    }

    @Override
    public KTraversal traverseQuery(String p_metaReferenceQuery) {
        return internal_chain_action(new KTraverseQueryAction(p_metaReferenceQuery));
    }

    @Override
    public KTraversal withAttribute(MetaAttribute p_attribute, Object p_expectedValue) {
        return internal_chain_action(new KFilterAttributeAction(p_attribute, p_expectedValue));
    }

    @Override
    public KTraversal withoutAttribute(MetaAttribute p_attribute, Object p_expectedValue) {
        return internal_chain_action(new KFilterNotAttributeAction(p_attribute, p_expectedValue));
    }

    @Override
    public KTraversal attributeQuery(String p_attributeQuery) {
        return internal_chain_action(new KFilterAttributeQueryAction(p_attributeQuery));
    }

    @Override
    public KTraversal filter(KTraversalFilter p_filter) {
        return internal_chain_action(new KFilterAction(p_filter));
    }

    @Override
    public KTraversal inbounds(MetaReference p_metaReference) {
        return internal_chain_action(new KInboundsAction(p_metaReference));
    }

    @Override
    public KTraversal inboundsQuery(String p_metaReferenceQuery) {
        return internal_chain_action(new KInboundsQueryAction(p_metaReferenceQuery));
    }

    @Override
    public KTraversal parents() {
        return internal_chain_action(new KParentsAction());
    }

    @Override
    public KTraversal removeDuplicate() {
        return internal_chain_action(new KRemoveDuplicateAction());
    }

    @Override
    public KTraversal deepTraverse(MetaReference metaReference, KTraversalFilter continueCondition) {
        return internal_chain_action(new KDeepTraverseAction(metaReference, continueCondition));
    }

    @Override
    public KTraversal deepCollect(MetaReference metaReference, KTraversalFilter continueCondition) {
        return internal_chain_action(new KDeepCollectAction(metaReference, continueCondition));
    }

    @Override
    public KTraversal activateHistory() {
        return internal_chain_action(new KActivateHistoryAction());
    }

    @Override
    public KTraversal reverse() {
        return internal_chain_action(new KReverseAction());
    }

    @Override
    public KDefer<KObject[]> done() {
        AbstractKDeferWrapper<KObject[]> task = new AbstractKDeferWrapper<KObject[]>();
        //set the terminal leaf action
        internal_chain_action(new KFinalAction(task.initCallback()));
        _terminated = true;
        //execute the first element of the chain of actions
        _initAction.execute(_initObjs, null);
        return task;
    }

    @Override
    public KDefer<Object[]> map(MetaAttribute attribute) {
        AbstractKDeferWrapper<Object[]> task = new AbstractKDeferWrapper<Object[]>();
        //set the terminal leaf action
        internal_chain_action(new KMapAction(attribute, task.initCallback()));
        _terminated = true;
        //execute the first element of the chain of actions
        _initAction.execute(_initObjs, null);
        return task;
    }


}
