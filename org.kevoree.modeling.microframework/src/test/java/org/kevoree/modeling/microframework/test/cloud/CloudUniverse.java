package org.kevoree.modeling.microframework.test.cloud;

import org.kevoree.modeling.api.abs.AbstractKUniverse;

/**
 * Created by duke on 10/10/14.
 */
public class CloudUniverse extends AbstractKUniverse<CloudDimension> {

    public CloudUniverse() {
        super();
    }

    @Override
    protected CloudDimension internal_create(long key) {
        return new CloudDimension(this, key);
    }

}
