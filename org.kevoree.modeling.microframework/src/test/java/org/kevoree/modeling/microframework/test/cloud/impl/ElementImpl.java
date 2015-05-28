package org.kevoree.modeling.microframework.test.cloud.impl;

import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.data.KDataManager;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.microframework.test.cloud.Element;
import org.kevoree.modeling.microframework.test.cloud.meta.MetaElement;

/**
 * Created by duke on 10/13/14.
 */
public class ElementImpl extends AbstractKObject implements Element {

    public ElementImpl(long p_universe, long p_time, long p_uuid, MetaClass p_metaClass, KDataManager p_manager) {
        super(p_universe, p_time, p_uuid, p_metaClass, p_manager);
    }

    @Override
    public String getName() {
        return (String) this.get(MetaElement.ATT_NAME);
    }

    @Override
    public Element setName(String p_name) {
        this.set(MetaElement.ATT_NAME, p_name);
        return this;
    }

    @Override
    public Double getValue() {
        return (Double) this.get(MetaElement.ATT_VALUE);
    }

    @Override
    public Element setValue(Double p_name) {
        this.set(MetaElement.ATT_VALUE, p_name);
        return this;
    }

}
