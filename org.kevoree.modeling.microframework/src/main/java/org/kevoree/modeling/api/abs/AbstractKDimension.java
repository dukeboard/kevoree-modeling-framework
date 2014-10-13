package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KUnivers;

/**
 * Created by duke on 10/10/14.
 */
public abstract class AbstractKDimension implements KDimension {

    private KUnivers manager;

    private String key;

    protected AbstractKDimension(KUnivers manager, String key) {
        this.manager = manager;
        this.key = key;
    }

    @Override
    public String key() {
        return key;
    }
}
