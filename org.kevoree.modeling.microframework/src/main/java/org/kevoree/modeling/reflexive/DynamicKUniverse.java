package org.kevoree.modeling.reflexive;

import org.kevoree.modeling.abs.AbstractKUniverse;
import org.kevoree.modeling.KView;
import org.kevoree.modeling.memory.KDataManager;

public class DynamicKUniverse extends AbstractKUniverse {

    protected DynamicKUniverse(long p_key, KDataManager p_manager) {
        super(p_key, p_manager);
    }

    @Override
    protected KView internal_create(long timePoint) {
        return new DynamicKView(_universe, timePoint,_manager);
    }
}
