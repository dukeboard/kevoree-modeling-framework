package org.kevoree.modeling.api;

import org.kevoree.modeling.api.meta.MetaClass;

/**
 * Created by thomas on 10/2/14.
 */
public interface KView {

    public KObject createFQN(String metaClassName);

    public KObject create(MetaClass clazz);

    public KDefer<KObject[]> select(String query);

    public KDefer<KObject> lookup(long key);

    public KDefer<KObject[]> lookupAll(long[] keys);

    public KUniverse universe();

    public long now();

    public void listen(KEventListener listener);

    public ModelFormat json();

    public ModelFormat xmi();

    public boolean equals(Object other);

    public KDefer<Throwable> setRoot(KObject elem);

    public KDefer<KObject> getRoot();

}
