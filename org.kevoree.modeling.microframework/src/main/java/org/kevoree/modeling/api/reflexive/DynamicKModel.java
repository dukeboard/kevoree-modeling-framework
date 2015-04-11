package org.kevoree.modeling.api.reflexive;

import org.kevoree.modeling.api.KUniverse;
import org.kevoree.modeling.api.abs.AbstractKModel;
import org.kevoree.modeling.api.meta.MetaModel;

public class DynamicKModel extends AbstractKModel {

    private MetaModel _metaModel = null;

    public void setMetaModel(MetaModel p_metaModel) {
        this._metaModel = p_metaModel;
    }

    @Override
    public MetaModel metaModel() {
        return _metaModel;
    }

    @Override
    protected KUniverse internal_create(long key) {
        return new DynamicKUniverse(this, key);
    }
}
