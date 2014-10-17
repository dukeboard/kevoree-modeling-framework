package org.kevoree.modeling.api;

import org.kevoree.modeling.api.meta.MetaClass;

import java.util.List;
import java.util.Set;

/**
 * Created by thomas on 10/2/14.
 */
public interface KView {

    public KObject createFQN(String metaClassName);

    public KObject create(MetaClass clazz);

    public void root(KObject elem);

    public ModelSerializer createJSONSerializer();

    public ModelLoader createJSONLoader();

    public ModelSerializer createXMISerializer();

    public ModelLoader createXMILoader();

    public ModelCompare createModelCompare();

    public ModelCloner createModelCloner();

    public ModelSlicer createModelSlicer();

    public void select(String query, Callback<List<KObject>> callback);

    public void lookup(long key, Callback<KObject> callback);

    public void lookupAll(Set<Long> keys, Callback<List<KObject>> callback);

    public void stream(String query, Callback<KObject> callback);

    public MetaClass[] metaClasses();

    public MetaClass metaClass(String fqName);

    public KDimension dimension();

    public long now();

}
