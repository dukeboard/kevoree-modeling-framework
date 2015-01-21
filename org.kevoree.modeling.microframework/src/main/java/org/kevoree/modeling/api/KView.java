package org.kevoree.modeling.api;

import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.trace.TraceSequence;

import java.util.List;

/**
 * Created by thomas on 10/2/14.
 */
public interface KView {

    public KObject createFQN(String metaClassName);

    public KObject create(MetaClass clazz);

    public void select(String query, Callback<KObject[]> callback);

    public void lookup(Long key, Callback<KObject> callback);

    public void lookupAll(Long[] keys, Callback<KObject[]> callback);

    public KUniverse universe();

    public long now();

    public void listen(ModelListener listener);

    public void slice(List<KObject> elems, Callback<TraceSequence> callback);

    public ModelFormat json();

    public ModelFormat xmi();

    public boolean equals(Object other);

    public void setRoot(KObject elem, Callback<Throwable> callback);

    public KTask<KObject> taskLookup(Long key);

    public KTask<KObject[]> taskLookupAll(Long[] keys);

    public KTask<KObject[]> taskSelect(String query);

    public KTask<Throwable> taskSetRoot(KObject elem);

    public KTask<TraceSequence> taskSlice(List<KObject> elems);

}
