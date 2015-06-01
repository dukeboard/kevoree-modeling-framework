package org.kevoree.modeling.reflexive;

import org.kevoree.modeling.abs.AbstractKView;
import org.kevoree.modeling.memory.KDataManager;

public class DynamicKView extends AbstractKView {

    protected DynamicKView(long p_universe, long _time, KDataManager p_manager) {
        super(p_universe, _time, p_manager);
    }

}
