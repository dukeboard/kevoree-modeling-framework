package org.kevoree.modeling.api.util;

import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KManager;

/**
 * Created by duke on 10/10/14.
 */
public abstract class AbstractKDimension implements KDimension {

    private KManager manager;

    private String key;

    protected AbstractKDimension(KManager manager, String key) {
        this.manager = manager;
        this.key = key;
    }

    @Override
    public String key() {
        return key;
    }
}
