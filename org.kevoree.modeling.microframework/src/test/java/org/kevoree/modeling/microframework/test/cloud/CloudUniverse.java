package org.kevoree.modeling.microframework.test.cloud;

import org.kevoree.modeling.api.abs.AbstractKUniverse;
import org.kevoree.modeling.api.data.KDataBase;

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
