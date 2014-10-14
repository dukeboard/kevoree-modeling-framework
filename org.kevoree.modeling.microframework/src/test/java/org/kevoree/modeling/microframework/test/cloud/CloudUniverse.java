package org.kevoree.modeling.microframework.test.cloud;

import org.kevoree.modeling.api.abs.AbstractKUniverse;
import org.kevoree.modeling.api.data.DataStore;

/**
 * Created by duke on 10/10/14.
 */
public class CloudUniverse extends AbstractKUniverse<CloudDimension> {

    public CloudUniverse(DataStore dataStore) {
        super(dataStore);
    }

    @Override
    protected CloudDimension internal_create(String key) {
        return new CloudDimension(this,key);
    }
}
