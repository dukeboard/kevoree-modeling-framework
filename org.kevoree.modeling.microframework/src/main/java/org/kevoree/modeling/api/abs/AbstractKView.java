package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.clone.DefaultModelCloner;
import org.kevoree.modeling.api.compare.DefaultModelCompare;
import org.kevoree.modeling.api.data.DataCache;
import org.kevoree.modeling.api.json.JSONModelSerializer;
import org.kevoree.modeling.api.slice.DefaultModelSlicer;
import org.kevoree.modeling.api.xmi.XMIModelLoader;

/**
 * Created by duke on 10/10/14.
 */
public abstract class AbstractKView implements KView {

    private long now;

    private KDimension KDimension;

    private DataCache dataCache;

    public DataCache getDataCache() {
        return dataCache;
    }

    protected AbstractKView(long now, KDimension KDimension, DataCache dataCache) {
        this.now = now;
        this.KDimension = KDimension;
        this.dataCache = dataCache;
    }

    @Override
    public long now() {
        return now;
    }

    @Override
    public KDimension dimension() {
        return KDimension;
    }

    @Override
    public ModelSerializer createJSONSerializer() {
        return new JSONModelSerializer();
    }

    @Override
    public ModelLoader createJSONLoader() {
        return null;
        //return new JSONModelLoader(this);
    }

    @Override
    public ModelSerializer createXMISerializer() {
        return null;
        //return new XMIModelSerializer();
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
