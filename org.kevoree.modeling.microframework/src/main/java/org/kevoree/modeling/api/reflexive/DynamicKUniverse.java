package org.kevoree.modeling.api.reflexive;

import org.kevoree.modeling.api.KModel;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.abs.AbstractKUniverse;

/**
 * Created by duke on 16/01/15.
 */
public class DynamicKUniverse extends AbstractKUniverse {

    protected DynamicKUniverse(KModel p_universe, long p_key) {
        super(p_universe, p_key);
    }

    @Override
    protected KView internal_create(long timePoint) {
        return new DynamicKView(timePoint, this);
    }
}
