package org.kevoree.modeling.microframework.test.cloud.impl;

import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Element;
import org.kevoree.modeling.microframework.test.cloud.meta.MetaElement;

/**
 * Created by duke on 10/13/14.
 */
public class ElementImpl extends AbstractKObject implements Element {

    public ElementImpl(CloudView factory, long kid, TimeTree timeTree, MetaClass p_metaclass) {
        super(factory, kid, timeTree, p_metaclass);
    }

    @Override
    public String getName() {
        return (String) this.get(metaClass().ATT_NAME);
    }

    @Override
    public Element setName(String p_name) {
        this.set(metaClass().ATT_NAME, p_name);
        return this;
    }

    @Override
    public Double getValue() {
        return (Double) this.get(metaClass().ATT_VALUE);
    }

    @Override
    public Element setValue(Double p_name) {
        this.set(metaClass().ATT_VALUE, p_name);
        return this;
    }

    @Override
    public CloudView view() {
        return (CloudView) super.view();
    }

    @Override
    public MetaElement metaClass() {
        return (MetaElement) super.metaClass();
    }

}
