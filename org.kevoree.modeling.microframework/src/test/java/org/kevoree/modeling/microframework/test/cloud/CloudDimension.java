package org.kevoree.modeling.microframework.test.cloud;

import org.kevoree.modeling.api.KUnivers;
import org.kevoree.modeling.api.abs.AbstractKDimension;

/**
 * Created by duke on 10/13/14.
 */
public class CloudDimension extends AbstractKDimension<CloudView, CloudDimension, CloudUnivers> {

    protected CloudDimension(KUnivers univers, String key) {
        super(univers, key);
    }

}
