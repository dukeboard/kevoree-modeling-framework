package org.kevoree.modeling.microframework.test.cloud.impl;

import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Element;

/**
 * Created by duke on 10/13/14.
 */
public class ElementImpl extends AbstractKObject<Element, CloudView> implements Element {

    public ElementImpl(CloudView factory, MetaClass metaClass, Long now, KDimension dimension, TimeTree timeTree) {
        super(factory, metaClass, now, dimension, timeTree);
    }

    @Override
    public MetaAttribute[] metaAttributes() {
        return Element.METAATTRIBUTES.values();
    }

    private final MetaReference[] mataReferences = new MetaReference[0];

    @Override
    public MetaReference[] metaReferences() {
        return mataReferences;
    }

    @Override
    public String getName() {
        return (String) get(METAATTRIBUTES.NAME);
    }

    @Override
    public Element setName(String name) {
        set(METAATTRIBUTES.NAME, name);
        return this;
    }

    @Override
    public String getValue() {
        return (String) get(METAATTRIBUTES.VALUE);
    }

    @Override
    public Element setValue(String name) {
        set(METAATTRIBUTES.VALUE, name);
        return this;
    }


}
