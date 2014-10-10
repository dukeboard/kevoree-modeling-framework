package org.kevoree.modeling.api.util;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.clone.DefaultModelCloner;
import org.kevoree.modeling.api.compare.DefaultModelCompare;
import org.kevoree.modeling.api.json.JSONModelLoader;
import org.kevoree.modeling.api.json.JSONModelSerializer;
import org.kevoree.modeling.api.slice.DefaultModelSlicer;
import org.kevoree.modeling.api.xmi.XMIModelLoader;
import org.kevoree.modeling.api.xmi.XMIModelSerializer;

/**
 * Created by duke on 10/10/14.
 */
public abstract class AbstractKFactory implements KFactory {

    private long now;

    private String dimension;

    protected AbstractKFactory(long now, String dimension) {
        this.now = now;
        this.dimension = dimension;
    }

    @Override
    public long now() {
        return now;
    }

    @Override
    public String dimension() {
        return dimension;
    }

    @Override
    public ModelSerializer createJSONSerializer() {
        return new JSONModelSerializer();
    }

    @Override
    public ModelLoader createJSONLoader() {
        return new JSONModelLoader(this);
    }

    @Override
    public ModelSerializer createXMISerializer() {
        return new XMIModelSerializer();
    }

    @Override
    public ModelLoader createXMILoader() {
        return new XMIModelLoader(this);
    }

    @Override
    public ModelCompare createModelCompare() {
        return new DefaultModelCompare(this);
    }

    @Override
    public ModelCloner createModelCloner() {
        return new DefaultModelCloner(this);
    }

    @Override
    public ModelSlicer createModelSlicer() {
        return new DefaultModelSlicer();
    }
}
