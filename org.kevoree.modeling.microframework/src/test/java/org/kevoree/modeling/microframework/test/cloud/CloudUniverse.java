package org.kevoree.modeling.microframework.test.cloud;

import org.kevoree.modeling.api.abs.AbstractKUniverse;
import org.kevoree.modeling.api.data.KDataManager;
import org.kevoree.modeling.microframework.test.cloud.impl.CloudViewImpl;

/**
 * Created by duke on 10/13/14.
 */
public class CloudUniverse extends AbstractKUniverse<CloudView, CloudUniverse, CloudModel> {

    protected CloudUniverse(long p_universe, KDataManager p_manager) {
        super(p_universe, p_manager);
    }

    @Override
    protected CloudView internal_create(long timePoint) {
        return new CloudViewImpl(_universe, timePoint, _manager);
    }

}
