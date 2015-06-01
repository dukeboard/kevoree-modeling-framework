package org.kevoree.modeling.meta.reflexive;

import org.kevoree.modeling.KObject;
import org.kevoree.modeling.KUniverse;
import org.kevoree.modeling.abs.AbstractKModel;
import org.kevoree.modeling.meta.MetaClass;
import org.kevoree.modeling.meta.MetaModel;

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
    protected KUniverse internalCreateUniverse(long universe) {
        return new DynamicKUniverse(universe,_manager);
    }

    @Override
    protected KObject internalCreateObject(long universe, long time, long uuid,MetaClass clazz) {
        return new DynamicKObject(universe,time,uuid,clazz,_manager);
    }

}
