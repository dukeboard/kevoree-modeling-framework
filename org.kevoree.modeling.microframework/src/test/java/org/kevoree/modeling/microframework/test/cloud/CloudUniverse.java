package org.kevoree.modeling.microframework.test.cloud;

import org.kevoree.modeling.api.KModel;
import org.kevoree.modeling.api.abs.AbstractKUniverse;
import org.kevoree.modeling.microframework.test.cloud.impl.CloudViewImpl;

/**
 * Created by duke on 10/13/14.
 */
public class CloudUniverse extends AbstractKUniverse<CloudView, CloudUniverse, CloudModel> {

    protected CloudUniverse(KModel univers, long key) {
        super(univers, key);
    }

    @Override
    protected CloudView internal_create(Long timePoint) {
        return new CloudViewImpl(timePoint,this);
    }

}
