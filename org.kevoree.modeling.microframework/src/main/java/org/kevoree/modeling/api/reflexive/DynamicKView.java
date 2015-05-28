package org.kevoree.modeling.api.reflexive;

import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.data.KDataManager;

public class DynamicKView extends AbstractKView {

    protected DynamicKView(long p_universe, long _time, KDataManager p_manager) {
        super(p_universe, _time, p_manager);
    }

}
