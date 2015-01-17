package org.kevoree.modeling.api.reflexive;

import org.kevoree.modeling.api.KUniverse;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.abs.AbstractKDimension;

/**
 * Created by duke on 16/01/15.
 */
public class DynamicKDimension extends AbstractKDimension {

    protected DynamicKDimension(KUniverse p_universe, long p_key) {
        super(p_universe, p_key);
    }

    @Override
    protected KView internal_create(Long timePoint) {
        return new DynamicKView(timePoint, this);
    }
}
