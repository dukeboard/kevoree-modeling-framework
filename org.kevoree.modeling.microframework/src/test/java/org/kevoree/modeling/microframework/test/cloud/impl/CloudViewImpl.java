package org.kevoree.modeling.microframework.test.cloud.impl;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Element;
import org.kevoree.modeling.microframework.test.cloud.Node;

import java.util.List;

/**
 * Created by duke on 10/9/14.
 */
public class CloudViewImpl extends AbstractKView implements CloudView {

    public CloudViewImpl(long now, KDimension dimension) {
        super(now, dimension);
    }

    @Override
    public KObject create(MetaClass clazz) {
        if(clazz==null){
            return null;
        }
        switch (clazz.index()) {
            case 0:
                return internal_create(new NodeImpl(this, METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE, now(), dimension(), null));
            case 1:
                return internal_create(new ElementImpl(this, METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_ELEMENT, now(), dimension(), null));
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
        return (Node) create(METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE);
    }

    @Override
    public Element createElement() {
        return (Element) create(METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_ELEMENT);
    }
}
