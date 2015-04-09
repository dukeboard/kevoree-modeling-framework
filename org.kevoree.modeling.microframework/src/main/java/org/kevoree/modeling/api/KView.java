package org.kevoree.modeling.api;

import org.kevoree.modeling.api.meta.MetaClass;

/**
 * Created by thomas on 10/2/14.
 */
public interface KView {

    KObject createByName(String metaClassName);

    KObject create(MetaClass clazz);

    KDefer<KObject[]> select(String query);

    KDefer<KObject> lookup(long key);

    KDefer<KObject[]> lookupAll(long[] keys);

    KUniverse universe();

    long now();

    ModelFormat json();

    ModelFormat xmi();

    boolean equals(Object other);

    KDefer<Throwable> setRoot(KObject elem);

    KDefer<KObject> getRoot();

}
