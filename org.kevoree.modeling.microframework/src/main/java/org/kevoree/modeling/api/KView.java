package org.kevoree.modeling.api;

import org.kevoree.modeling.api.event.ListenerScope;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.api.trace.TraceSequence;

import java.util.List;

/**
 * Created by thomas on 10/2/14.
 */
public interface KView {

    public KObject createFQN(String metaClassName);

    public KObject create(MetaClass clazz);

    public void setRoot(KObject elem, Callback<Throwable> callback);
    
    public void select(String query, Callback<KObject[]> callback);

    public void lookup(Long key, Callback<KObject> callback);

    public void lookupAll(Long[] keys, Callback<KObject[]> callback);

    public void stream(String query, Callback<KObject> callback);

    public MetaClass[] metaClasses();

    public MetaClass metaClass(String fqName);

    public KDimension dimension();

    public long now();

    //TODO maybe hide...
    public KObject createProxy(MetaClass clazz, TimeTree timeTree, long key);

    public void listen(ModelListener listener, ListenerScope scope);

    public void slice(List<KObject> elems, Callback<TraceSequence> callback);

    public ModelFormat json();

    public ModelFormat xmi();

    public boolean equals(Object other);
}
