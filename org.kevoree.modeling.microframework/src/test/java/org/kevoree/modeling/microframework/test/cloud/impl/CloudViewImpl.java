package org.kevoree.modeling.microframework.test.cloud.impl;

import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.abs.DynamicKObject;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.microframework.test.cloud.*;
import org.kevoree.modeling.microframework.test.cloud.meta.MetaElement;
import org.kevoree.modeling.microframework.test.cloud.meta.MetaNode;

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
                return new NodeImpl(this, p_key, p_timeTree, p_clazz);
            case 1:
                return new ElementImpl(this, p_key, p_timeTree, p_clazz);
            default:
                return new DynamicKObject(this, p_key, p_timeTree, p_clazz);
        }
    }

    @Override
    public Node createNode() {
        return (Node) this.create(MetaNode.getInstance());
    }

    @Override
    public Element createElement() {
        return (Element) this.create(MetaElement.getInstance());
    }

    @Override
    public CloudDimension dimension() {
        return (CloudDimension) super.dimension();
    }

}
