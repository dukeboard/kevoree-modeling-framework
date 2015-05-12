package org.kevoree.modeling.microframework.test.cloud.impl;

import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.data.manager.KDataManager;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Element;
import org.kevoree.modeling.microframework.test.cloud.Node;
import org.kevoree.modeling.microframework.test.cloud.meta.MetaElement;
import org.kevoree.modeling.microframework.test.cloud.meta.MetaNode;

/**
 * Created by duke on 10/9/14.
 */
public class CloudViewImpl extends AbstractKView implements CloudView {

    public CloudViewImpl(long p_universe, long _time, KDataManager p_manager) {
        super(p_universe, _time, p_manager);
    }

    @Override
    public Node createNode() {
        return (Node) this.create(MetaNode.getInstance());
    }

    @Override
    public Element createElement() {
        return (Element) this.create(MetaElement.getInstance());
    }

}
