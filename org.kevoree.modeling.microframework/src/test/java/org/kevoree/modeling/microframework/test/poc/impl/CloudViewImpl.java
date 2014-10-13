package org.kevoree.modeling.microframework.test.poc.impl;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.data.DataCache;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.microframework.test.poc.CloudView;
import org.kevoree.modeling.microframework.test.poc.Element;
import org.kevoree.modeling.microframework.test.poc.Node;

import java.util.List;

/**
 * Created by duke on 10/9/14.
 */
public class CloudViewImpl extends AbstractKView implements CloudView {

    protected CloudViewImpl(long now, KDimension dimension, DataCache cache) {
        super(now, dimension, cache);
    }

    @Override
    public KObject createFQN(String metaClassName) {
        return null;
    }

    @Override
    public KObject create(MetaClass clazz) {
        switch (clazz.index()) {
            case 0:
                return internal_create(new NodeImpl(this, CloudView.METACLASSES.org_kevoree_modeling_microframework_test_poc_Node, now(), dimension(), null));
            case 1:
                return internal_create(new ElementImpl(this, METACLASSES.org_kevoree_modeling_microframework_test_poc_Element, now(), dimension(), null));
            default:
                return null;
        }
    }

    private KObject internal_create(KObject obj) {
        //TODO put into cache, iniate values cache
        return obj;
    }

    @Override
    public void root(KObject elem, Callback<Boolean> callback) {

    }

    @Override
    public void select(String query, Callback<List<KObject>> callback) {

    }

    @Override
    public void lookup(String path, Callback<KObject> callback) {

    }

    @Override
    public void stream(String query, Callback<KObject> callback) {

    }

    @Override
    public MetaClass[] metaClasses() {
        return CloudView.METACLASSES.values();
    }

    @Override
    public Node createNode() {
        return (Node) create(METACLASSES.org_kevoree_modeling_microframework_test_poc_Node);
    }

    @Override
    public Element createElement() {
        return (Element) create(METACLASSES.org_kevoree_modeling_microframework_test_poc_Element);
    }
}
