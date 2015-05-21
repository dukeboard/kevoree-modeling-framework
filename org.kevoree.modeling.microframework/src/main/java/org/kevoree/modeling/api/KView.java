package org.kevoree.modeling.api;

import org.kevoree.modeling.api.meta.MetaClass;

public interface KView {

    KObject createByName(String metaClassName);

    KObject create(MetaClass clazz);

    void select(String query, Callback<KObject[]> cb);

    void lookup(long key, Callback<KObject> cb);

    void lookupAll(long[] keys, Callback<KObject[]> cb);

    long universe();

    long now();

    KModelFormat json();

    KModelFormat xmi();

    boolean equals(Object other);

    void setRoot(KObject elem, Callback cb);

    void getRoot(Callback<KObject> cb);

}
