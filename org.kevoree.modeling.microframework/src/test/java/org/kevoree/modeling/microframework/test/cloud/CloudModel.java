package org.kevoree.modeling.microframework.test.cloud;

import org.kevoree.modeling.KObject;
import org.kevoree.modeling.abs.AbstractKModel;
import org.kevoree.modeling.abs.AbstractMetaModel;
import org.kevoree.modeling.meta.MetaClass;
import org.kevoree.modeling.meta.MetaModel;
import org.kevoree.modeling.meta.reflexive.DynamicKObject;
import org.kevoree.modeling.microframework.test.cloud.impl.ElementImpl;
import org.kevoree.modeling.microframework.test.cloud.impl.NodeImpl;
import org.kevoree.modeling.microframework.test.cloud.meta.MetaElement;
import org.kevoree.modeling.microframework.test.cloud.meta.MetaNode;

/**
 * Created by duke on 10/10/14.
 */
public class CloudModel extends AbstractKModel<CloudUniverse> {

    private MetaModel _metaModel;

    public CloudModel() {
        super();
        _metaModel = new AbstractMetaModel("Cloud", -1);
        MetaClass[] tempMetaClasses = new MetaClass[2];
        tempMetaClasses[0] = MetaNode.getInstance();
        tempMetaClasses[1] = MetaElement.getInstance();
        ((AbstractMetaModel) _metaModel).init(tempMetaClasses);
    }

    @Override
    protected CloudUniverse internalCreateUniverse(long universe) {
        return new CloudUniverse(universe, _manager);
    }

    @Override
    protected KObject internalCreateObject(long universe, long time, long uuid, MetaClass clazz) {
        if (clazz == null) {
            return null;
        }
        switch (clazz.index()) {
            case 0:
                return new NodeImpl(universe, time, uuid, clazz, _manager);
            case 1:
                return new ElementImpl(universe, time, uuid, clazz, _manager);
            default:
                return new DynamicKObject(universe, time, uuid, clazz, _manager);
        }
    }

    @Override
    public MetaModel metaModel() {
        return _metaModel;
    }

}
