package org.kevoree.modeling.microframework.test.poc;

import org.kevoree.modeling.api.abs.AbstractKUnivers;
import org.kevoree.modeling.api.data.DataStore;

/**
 * Created by duke on 10/10/14.
 */
public class CloudUnivers extends AbstractKUnivers {

    protected CloudUnivers(DataStore dataStore) {
        super(dataStore);
    }
}
