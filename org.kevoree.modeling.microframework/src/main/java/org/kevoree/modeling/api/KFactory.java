package org.kevoree.modeling.api;

import org.kevoree.modeling.api.json.JSONModelLoader;
import org.kevoree.modeling.api.json.JSONModelSerializer;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.xmi.XMIModelLoader;
import org.kevoree.modeling.api.xmi.XMIModelSerializer;

import java.util.List;

/**
 * Created by thomas on 10/2/14.
 */
public interface KFactory {

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

}
