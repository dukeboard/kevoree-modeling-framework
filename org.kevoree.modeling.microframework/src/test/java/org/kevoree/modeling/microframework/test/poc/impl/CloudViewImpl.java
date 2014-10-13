package org.kevoree.modeling.microframework.test.poc.impl;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.data.DataCache;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.microframework.test.poc.CloudView;

import java.util.List;

/**
 * Created by duke on 10/9/14.
 */
public class CloudViewImpl extends AbstractKView {

    protected CloudViewImpl(long now, String dimension, DataCache cache) {
        super(now, dimension, cache);
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
        return CloudView.METACLASSES.values();
    }

}
