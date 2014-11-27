package org.kevoree.modeling.microframework.test.cloud.impl;

import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Element;
import org.kevoree.modeling.microframework.test.cloud.Node;

/**
 * Created by duke on 10/9/14.
 */
public class CloudViewImpl extends AbstractKView implements CloudView {

    public CloudViewImpl(long now, KDimension dimension) {
        super(now, dimension);
    }

    @Override
    protected KObject internalCreate(MetaClass p_clazz, TimeTree p_timeTree, long p_key) {
        if (p_clazz == null) {
            return null;
        }
        switch (p_clazz.index()) {
            case 0:
                return this.manageCache(new NodeImpl(this, p_key, this.now(), this.dimension(), p_timeTree, p_clazz));
            case 1:
                return this.manageCache(new ElementImpl(this, p_key, this.now(), this.dimension(), p_timeTree, p_clazz));
            default:
                return null;
        }
    }

    @Override
    public MetaClass[] metaClasses() {
        return CloudView.METACLASSES.values();
    }

    @Override
    public Node createNode() {
        return (Node) this.create(CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE);
    }

    @Override
    public Element createElement() {
        return (Element) this.create(CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_ELEMENT);
    }
}
