package org.kevoree.modeling.microframework.test.cloud.impl;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaOperation;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Element;
import org.kevoree.modeling.microframework.test.cloud.Node;

/**
 * Created by duke on 10/10/14.
 */
public class NodeImpl extends AbstractKObject implements Node {

    public NodeImpl(CloudView p_factory, long p_uuid, TimeTree p_timeTree, MetaClass p_clazz) {
        super(p_factory, p_uuid, p_timeTree, p_clazz);
    }

    @Override
    public MetaAttribute[] metaAttributes() {
        return Node.METAATTRIBUTES.values();
    }

    @Override
    public MetaReference[] metaReferences() {
        return Node.METAREFERENCES.values();
    }

    @Override
    public MetaOperation[] metaOperations() {
        return Node.METAOPERATIONS.values();
    }

    @Override
    public String getName() {
        return (String) this.get(Node.METAATTRIBUTES.NAME);
    }

    @Override
    public Node setName(String p_name) {
        this.set(Node.METAATTRIBUTES.NAME, p_name);
        return this;
    }

    @Override
    public String getValue() {
        return (String) this.get(Node.METAATTRIBUTES.VALUE);
    }

    @Override
    public Node setValue(String p_value) {
        this.set(Node.METAATTRIBUTES.VALUE, p_value);
        return this;
    }

    @Override
    public Node addChildren(Node p_obj) {
        this.mutate(KActionType.ADD, Node.METAREFERENCES.CHILDREN, p_obj, true);
        return this;
    }

    @Override
    public Node removeChildren(Node p_obj) {
        this.mutate(KActionType.REMOVE, Node.METAREFERENCES.CHILDREN, p_obj, true);
        return this;
    }

    @Override
    public void eachChildren(Callback<Node> p_callback, Callback<Throwable> p_end) {
        this.each(Node.METAREFERENCES.CHILDREN, p_callback, p_end);
    }

    @Override
    public Node setElement(Element p_obj) {
        this.mutate(KActionType.SET, Node.METAREFERENCES.ELEMENT, p_obj, true);
        return this;
    }

    @Override
    public void getElement(Callback<Element> p_callback) {
        this.each(Node.METAREFERENCES.ELEMENT, p_callback, null);
    }

    @Override
    public void trigger(String param, Callback<String> callback) {
        Object[] internal_params = new Object[1];
        internal_params[0] = param;
        view().dimension().universe().storage().operationManager().call(this, METAOPERATIONS.TRIGGER, internal_params, new Callback<Object>() {
            @Override
            public void on(Object o) {
                if (callback != null) {
                    callback.on((String) o);
                }
            }
        });
    }

    @Override
    public CloudView view() {
        return (CloudView) super.view();
    }

}
