package org.kevoree.modeling.api.data.cdn;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KEvent;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.data.cache.KCache;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.manager.KDataManager;
import org.kevoree.modeling.api.meta.MetaModel;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/11/2013
 * Time: 11:30
 */

public interface KContentDeliveryDriver {

    public void atomicGetMutate(KContentKey key, AtomicOperation operation, ThrowableCallback<String> callback);

    public void get(KContentKey[] keys, ThrowableCallback<String[]> callback);

    public void put(KContentPutRequest request, Callback<Throwable> error);

    public void remove(String[] keys, Callback<Throwable> error);

    public void commit(Callback<Throwable> error);

    public void connect(Callback<Throwable> callback);

    public void close(Callback<Throwable> callback);

    public KCache cache();

    void registerListener(Object origin, ModelListener listener, Object scope);

    void unregister(ModelListener listener);

    void notify(KEvent event);

    void sendOperationEvent(KEvent operationEvent);

    void setManager(KDataManager manager);

}