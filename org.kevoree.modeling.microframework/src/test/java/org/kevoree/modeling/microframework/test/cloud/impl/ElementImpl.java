package org.kevoree.modeling.microframework.test.cloud.impl;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaOperation;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Element;
import org.kevoree.modeling.microframework.test.cloud.Node;

/**
 * Created by duke on 10/13/14.
 */
public class ElementImpl extends AbstractKObject implements Element {

    public ElementImpl(CloudView factory, long kid, TimeTree timeTree, MetaClass p_metaclass) {
        super(factory, kid, timeTree, p_metaclass);
    }

    @Override
    public MetaAttribute[] metaAttributes() {
        return Element.METAATTRIBUTES.values();
    }

    private final MetaReference[] _mataReferences = new MetaReference[0];

    @Override
    public MetaReference[] metaReferences() {
        return _mataReferences;
    }

    @Override
    public MetaOperation[] metaOperations() {
        return new MetaOperation[0];
    }

    @Override
    public String getName() {
        return (String) this.get(Element.METAATTRIBUTES.NAME);
    }

    @Override
    public Element setName(String p_name) {
        this.set(Element.METAATTRIBUTES.NAME, p_name);
        return this;
    }

    @Override
    public Double getValue() {
        return (Double) this.get(Element.METAATTRIBUTES.VALUE);
    }

    @Override
    public Element setValue(Double p_name) {
        this.set(Element.METAATTRIBUTES.VALUE, p_name);
        return this;
    }

    @Override
    public CloudView view() {
        return (CloudView) super.view();
    }


}
