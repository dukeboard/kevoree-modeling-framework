package org.kevoree.modeling.api;

import org.kevoree.modeling.api.meta.MetaClass;

/**
 * Created by thomas on 10/2/14.
 */
public interface KView {

    public KObject createFQN(String metaClassName);

    public KObject create(MetaClass clazz);

    public KTask<KObject[]> select(String query);

    public KTask<KObject> lookup(Long key);

    public KTask<KObject[]> lookupAll(Long[] keys);

    public KUniverse universe();

    public long now();

    public void listen(KEventListener listener);

    public ModelFormat json();

    public ModelFormat xmi();

    public boolean equals(Object other);

    public KTask<Throwable> setRoot(KObject elem);

    public KTask<KObject> getRoot();

}
