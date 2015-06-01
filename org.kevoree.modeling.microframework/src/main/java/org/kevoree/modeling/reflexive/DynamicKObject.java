package org.kevoree.modeling.reflexive;

import org.kevoree.modeling.abs.AbstractKObject;
import org.kevoree.modeling.memory.KDataManager;
import org.kevoree.modeling.meta.MetaClass;

public class DynamicKObject extends AbstractKObject {

    public DynamicKObject(long p_universe, long p_time, long p_uuid, MetaClass p_metaClass, KDataManager p_manager) {
        super(p_universe, p_time, p_uuid, p_metaClass, p_manager);
    }
}
