package org.kevoree.modeling.microframework.test.cloud;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.microframework.test.cloud.meta.MetaElement;

/**
 * Created by duke on 10/9/14.
 */
public interface Element extends KObject {

    public String getName();

    public Element setName(String name);

    public Double getValue();

    public Element setValue(Double name);

    @Override
    public CloudView view();

    @Override
    public MetaElement metaClass();

}
