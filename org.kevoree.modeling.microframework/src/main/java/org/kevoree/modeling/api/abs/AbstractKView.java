package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.clone.DefaultModelCloner;
import org.kevoree.modeling.api.compare.DefaultModelCompare;
import org.kevoree.modeling.api.json.JSONModelLoader;
import org.kevoree.modeling.api.json.JSONModelSerializer;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.slice.DefaultModelSlicer;
import org.kevoree.modeling.api.xmi.XMIModelLoader;
import org.kevoree.modeling.api.xmi.XMIModelSerializer;

import java.util.List;

/**
 * Created by duke on 10/10/14.
 */
public abstract class AbstractKView implements KView {

    private long now;

    private KDimension KDimension;

    protected AbstractKView(long now, KDimension KDimension) {
        this.now = now;
        this.KDimension = KDimension;
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

    public MetaClass metaClass(String fqName) {
        MetaClass[] metaClasses = metaClasses();
        for (int i = 0; i < metaClasses.length; i++) {
            if (metaClasses[i].metaName().equals(fqName)) {
                return metaClasses[i];
            }
        }
        return null;
    }

    @Override
    public KObject createFQN(String metaClassName) {
        return create(metaClass(metaClassName));
    }

    protected KObject manageCache(KObject obj) {
        dimension().universe().dataCache().put(dimension(), now(), obj.path(), obj);
        dimension().universe().dataCache().putTimeTree(dimension(), obj.path(), obj.timeTree());
        return obj;
    }

    @Override
    public void root(KObject elem, Callback<Boolean> callback) {

    }

    @Override
    public void select(String query, Callback<List<KObject>> callback) {

    }

    @Override
    public void lookup(String path, Callback<KObject> callback) {
        KObject resolved = dimension().universe().dataCache().get(dimension(), now(), path);
        if (resolved != null) {
            callback.on(resolved);
        } else {
            System.err.println("WARNING: not resolved path=" + path + ",dimension=" + dimension() + ", time=" + now());
            //TODO more complex

            callback.on(null);
        }
    }

    @Override
    public void stream(String query, Callback<KObject> callback) {

    }

}
