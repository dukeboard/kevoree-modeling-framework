package org.kevoree.modeling.api.reflexive;

import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.abs.AbstractKUniverse;
import org.kevoree.modeling.api.data.KDataManager;

public class DynamicKUniverse extends AbstractKUniverse {

    protected DynamicKUniverse(long p_key, KDataManager p_manager) {
        super(p_key, p_manager);
    }

    @Override
    protected KView internal_create(long timePoint) {
        return new DynamicKView(_universe, timePoint,_manager);
    }
}
