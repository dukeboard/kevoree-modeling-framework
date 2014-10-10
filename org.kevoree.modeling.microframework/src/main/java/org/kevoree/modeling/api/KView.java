package org.kevoree.modeling.api;

import org.kevoree.modeling.api.meta.MetaClass;

import java.util.List;

/**
 * Created by thomas on 10/2/14.
 */
public interface KView {

    public KObject create(String metaClassName);

    public void root(KObject elem, Callback<Boolean> callback);

    public ModelSerializer createJSONSerializer();

    public ModelLoader createJSONLoader();

    public ModelSerializer createXMISerializer();

    public ModelLoader createXMILoader();

    public ModelCompare createModelCompare();

    public ModelCloner createModelCloner();

    public ModelSlicer createModelSlicer();

    public void select(String query, Callback<List<KObject>> callback);

    public void lookup(String path, Callback<KObject> callback);

    public void stream(String query, Callback<KObject> callback);

    public MetaClass[] metaClasses();

    public KDimension dimension();

    public long now();

}
