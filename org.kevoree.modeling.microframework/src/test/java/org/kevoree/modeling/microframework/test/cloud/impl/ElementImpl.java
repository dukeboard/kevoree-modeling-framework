package org.kevoree.modeling.microframework.test.cloud.impl;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.ModelVisitor;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.api.trace.ModelTrace;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Element;

import java.util.List;

/**
 * Created by duke on 10/13/14.
 */
public class ElementImpl extends AbstractKObject<Element, CloudView> implements Element {

    public ElementImpl(CloudView factory, MetaClass metaClass, Long now, KDimension dimension, TimeTree timeTree) {
        super(factory, metaClass, now, dimension, timeTree);
    }

    @Override
    public String getName() {
        return null;
    }

    @Override
    public String setName(String name) {
        return null;
    }

    @Override
    public String getValue() {
        return null;
    }

    @Override
    public String setValue(String name) {
        return null;
    }

    @Override
    public String parentPath() {
        return null;
    }

    @Override
    public void visitNotContained(ModelVisitor visitor, Callback<Throwable> end) {

    }

    @Override
    public void visitContained(ModelVisitor visitor, Callback<Throwable> end) {

    }

    @Override
    public void visitAll(ModelVisitor visitor, Callback<Throwable> end) {

    }

    @Override
    public void deepVisitNotContained(ModelVisitor visitor, Callback<Throwable> end) {

    }

    @Override
    public void deepVisitContained(ModelVisitor visitor, Callback<Throwable> end) {

    }

    @Override
    public void deepVisitAll(ModelVisitor visitor, Callback<Throwable> end) {

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
    public List<ModelTrace> createTraces(Element similarObj, boolean isInter, boolean isMerge, boolean onlyReferences, boolean onlyAttributes) {
        return null;
    }


    @Override
    public boolean modelEquals(Element similarObj) {
        return false;
    }

    @Override
    public void deepModelEquals(Element similarObj, Callback<Boolean> callback) {

    }
}
