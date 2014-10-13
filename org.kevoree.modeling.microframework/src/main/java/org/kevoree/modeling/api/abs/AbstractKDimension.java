package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KUnivers;

/**
 * Created by duke on 10/10/14.
 */
public abstract class AbstractKDimension implements KDimension {

    private KUnivers univers;

    private String key;

    protected AbstractKDimension(KUnivers univers, String key) {
        this.univers = univers;
        this.key = key;
    }

    @Override
    public String key() {
        return key;
    }

    @Override
    public KUnivers univers() {
        return univers;
    }

}
