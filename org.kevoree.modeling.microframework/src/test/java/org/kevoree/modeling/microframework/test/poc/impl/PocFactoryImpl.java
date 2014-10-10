package org.kevoree.modeling.microframework.test.poc.impl;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.util.AbstractKFactory;
import org.kevoree.modeling.microframework.test.poc.PocFactory;

import java.util.List;

/**
 * Created by duke on 10/9/14.
 */
public class PocFactoryImpl extends AbstractKFactory {

    protected PocFactoryImpl(long now, String dimension) {
        super(now, dimension);
    }

    @Override
    public KObject create(String metaClassName) {
        return null;
    }

    @Override
    public void root(KObject elem, Callback<Boolean> callback) {

    }

    @Override
    public void select(String query, Callback<List<KObject>> callback) {

    }

    @Override
    public void lookup(String path, Callback<KObject> callback) {

    }

    @Override
    public void stream(String query, Callback<KObject> callback) {

    }

    @Override
    public MetaClass[] metaClasses() {
        return PocFactory.METACLASSES.values();
    }

}
