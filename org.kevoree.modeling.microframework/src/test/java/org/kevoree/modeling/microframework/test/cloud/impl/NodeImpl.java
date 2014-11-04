package org.kevoree.modeling.microframework.test.cloud.impl;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KActionType;
import org.kevoree.modeling.api.KDimension;
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
public class NodeImpl extends AbstractKObject<Node, CloudView> implements Node {

    public NodeImpl(CloudView p_factory, MetaClass p_metaClass, long p_uuid, Long p_now, KDimension p_dimension, TimeTree p_timeTree) {
        super(p_factory, p_metaClass, p_uuid, p_now, p_dimension, p_timeTree);
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
        return Node.METAOPERATION.values();
    }

    @Override
    public String getName() {
        return (String) get(METAATTRIBUTES.NAME);
    }

    @Override
    public Node setName(String p_name) {
        set(Node.METAATTRIBUTES.NAME, p_name);
        return this;
    }

    @Override
    public String getValue() {
        return (String) get(Node.METAATTRIBUTES.VALUE);
    }

    @Override
    public Node setValue(String p_value) {
        set(Node.METAATTRIBUTES.VALUE, p_value);
        return this;
    }

    @Override
    public Node addChildren(Node p_obj) {
        mutate(KActionType.ADD, Node.METAREFERENCES.CHILDREN, p_obj, true);
        return this;
    }

    @Override
    public Node removeChildren(Node p_obj) {
        mutate(KActionType.REMOVE, Node.METAREFERENCES.CHILDREN, p_obj, true);
        return this;
    }

    @Override
    public void eachChildren(Callback<Node> p_callback, Callback<Throwable> p_end) {
        each(Node.METAREFERENCES.CHILDREN, p_callback, p_end);
    }

    @Override
    public Node setElement(Element p_obj) {
        mutate(KActionType.SET, Node.METAREFERENCES.ELEMENT, p_obj, true);
        return this;
    }

    @Override
    public void getElement(Callback<Element> p_callback) {
        each(Node.METAREFERENCES.ELEMENT, p_callback, null);
    }

    @Override
    public void trigger(String param, Callback<String> callback) {
        //TODO
    }
}
