package org.kevoree.modeling.microframework.test.cloud.impl;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KActionType;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.data.manager.KDataManager;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.microframework.test.cloud.Element;
import org.kevoree.modeling.microframework.test.cloud.Node;
import org.kevoree.modeling.microframework.test.cloud.meta.MetaNode;

/**
 * Created by duke on 10/10/14.
 */
public class NodeImpl extends AbstractKObject implements Node {

    public NodeImpl(long p_universe, long p_time, long p_uuid, MetaClass p_metaClass, KDataManager p_manager) {
        super(p_universe, p_time, p_uuid, p_metaClass, p_manager);
    }

    @Override
    public String getName() {
        return (String) this.get(MetaNode.ATT_NAME);
    }

    @Override
    public Node setName(String p_name) {
        this.set(MetaNode.ATT_NAME, p_name);
        return this;
    }

    @Override
    public String getValue() {
        return (String) this.get(MetaNode.ATT_VALUE);
    }

    @Override
    public Node setValue(String p_value) {
        this.set(MetaNode.ATT_VALUE, p_value);
        return this;
    }

    @Override
    public Node addChildren(Node p_obj) {
        this.mutate(KActionType.ADD, MetaNode.REF_CHILDREN, p_obj);
        return this;
    }

    @Override
    public Node removeChildren(Node p_obj) {
        this.mutate(KActionType.REMOVE, MetaNode.REF_CHILDREN, p_obj);
        return this;
    }

    @Override
    public void getChildren(final Callback<Node[]> p_callback) {
        this.ref(MetaNode.REF_CHILDREN,new Callback<KObject[]>() {
            @Override
            public void on(KObject[] kObjects) {
                if (p_callback != null) {
                    Node[] casted = new Node[kObjects.length];
                    for (int i = 0; i < casted.length; i++) {
                        casted[i] = (Node) kObjects[i];
                    }
                    p_callback.on(casted);
                }
            }
        });
    }

    @Override
    public Node setElement(Element p_obj) {
        this.mutate(KActionType.SET, MetaNode.REF_ELEMENT, p_obj);
        return this;
    }

    @Override
    public void getElement(final Callback<Element> p_callback) {
        this.ref(MetaNode.REF_ELEMENT,new Callback<KObject[]>() {
            @Override
            public void on(KObject[] kObject) {
                if (p_callback != null && kObject.length > 0) {
                    p_callback.on((Element) kObject[0]);
                }
            }
        });
    }

    @Override
    public void trigger(String param, final Callback<String> callback) {
        Object[] internal_params = new Object[1];
        internal_params[0] = param;
        _manager.operationManager().call(this, MetaNode.OP_TRIGGER, internal_params, new Callback<Object>() {
            @Override
            public void on(Object o) {
                if (callback != null) {
                    callback.on((String) o);
                }
            }
        });
    }

}
