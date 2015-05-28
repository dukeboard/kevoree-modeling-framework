package org.kevoree.modeling.api.reflexive;

import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.data.KDataManager;
import org.kevoree.modeling.api.meta.MetaClass;

public class DynamicKObject extends AbstractKObject {

    public DynamicKObject(long p_universe, long p_time, long p_uuid, MetaClass p_metaClass, KDataManager p_manager) {
        super(p_universe, p_time, p_uuid, p_metaClass, p_manager);
    }
}
