package org.kevoree.modeling.microframework.test.cloud;

import org.kevoree.modeling.api.KUnivers;
import org.kevoree.modeling.api.abs.AbstractKDimension;
import org.kevoree.modeling.microframework.test.cloud.impl.CloudViewImpl;

/**
 * Created by duke on 10/13/14.
 */
public class CloudDimension extends AbstractKDimension<CloudView, CloudDimension, CloudUnivers> {

    protected CloudDimension(KUnivers univers, String key) {
        super(univers, key);
    }

    @Override
    protected CloudView internal_create(Long timePoint) {
        return new CloudViewImpl(timePoint,this);
    }

}
