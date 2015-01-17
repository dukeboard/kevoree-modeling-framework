package org.kevoree.modeling.api.reflexive;

import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.abs.AbstractKUniverse;
import org.kevoree.modeling.api.meta.MetaModel;

/**
 * Created by duke on 16/01/15.
 */
public class DynamicKUniverse extends AbstractKUniverse {

    private MetaModel _metaModel = null;

    public void setMetaModel(MetaModel p_metaModel) {
        this._metaModel = p_metaModel;
    }

    @Override
    public MetaModel metaModel() {
        return _metaModel;
    }

    @Override
    protected KDimension internal_create(long key) {
        return new DynamicKDimension(this, key);
    }
}
