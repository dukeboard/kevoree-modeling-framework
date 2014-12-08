package org.kevoree.modeling.microframework.test.cloud;

import org.kevoree.modeling.api.abs.AbstractKUniverse;
import org.kevoree.modeling.api.abs.AbstractMetaModel;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaModel;
import org.kevoree.modeling.microframework.test.cloud.meta.MetaElement;
import org.kevoree.modeling.microframework.test.cloud.meta.MetaNode;

/**
 * Created by duke on 10/10/14.
 */
public class CloudUniverse extends AbstractKUniverse<CloudDimension> {

    private org.kevoree.modeling.api.meta.MetaModel _metaModel;

    public final MetaNode META_NODE;

    public final MetaElement META_ELEMENT;

    public CloudUniverse() {
        super();
        _metaModel = new AbstractMetaModel("Cloud", -1);
        META_NODE = MetaNode.build(_metaModel);
        META_ELEMENT = MetaElement.build(_metaModel);
        MetaClass[] tempMetaClasses = new MetaClass[2];
        tempMetaClasses[0] = META_NODE;
        tempMetaClasses[1] = META_ELEMENT;
        ((AbstractMetaModel) _metaModel).init(tempMetaClasses);
    }

    @Override
    protected CloudDimension internal_create(long key) {
        return new CloudDimension(this, key);
    }


    @Override
    public MetaModel metaModel() {
        return _metaModel;
    }
}
