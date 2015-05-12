package org.kevoree.modeling.microframework.test.cloud;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.microframework.test.cloud.meta.MetaElement;

/**
 * Created by duke on 10/9/14.
 */
public interface Element extends KObject {

    String getName();

    Element setName(String name);

    Double getValue();

    Element setValue(Double name);

}
