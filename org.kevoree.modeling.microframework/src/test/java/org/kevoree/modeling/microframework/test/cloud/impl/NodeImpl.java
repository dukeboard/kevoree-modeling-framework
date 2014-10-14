package org.kevoree.modeling.microframework.test.cloud.impl;

import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Node;

/**
 * Created by duke on 10/10/14.
 */
public class NodeImpl extends AbstractKObject<Node, CloudView> implements Node {

    public NodeImpl(CloudView factory, MetaClass metaClass, String path, Long now, KDimension dimension, TimeTree timeTree) {
        super(factory, metaClass, path, now, dimension, timeTree);
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
    public String getName() {
        return (String) get(METAATTRIBUTES.NAME);
    }

    @Override
    public Node setName(String name) {
        set(METAATTRIBUTES.NAME, name);
        return this;
    }

    @Override
    public String getValue() {
        return (String) get(METAATTRIBUTES.VALUE);
    }

    @Override
    public Node setValue(String name) {
        set(METAATTRIBUTES.VALUE, name);
        return this;
    }
}
