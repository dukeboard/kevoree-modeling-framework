package org.kevoree.modeling.api;

import org.kevoree.modeling.api.meta.MetaClass;

public interface KView {

    KObject createByName(String metaClassName);

    KObject create(MetaClass clazz);

    KDefer<KObject[]> select(String query);

    KDefer<KObject> lookup(long key);

    KDefer<KObject[]> lookupAll(long[] keys);

    long universe();

    long now();

    ModelFormat json();

    ModelFormat xmi();

    boolean equals(Object other);

    KDefer<Throwable> setRoot(KObject elem);

    KDefer<KObject> getRoot();

}
