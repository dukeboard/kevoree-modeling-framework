package org.kevoree.modeling.api.event;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KEvent;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.data.KStore;
import org.kevoree.modeling.api.meta.MetaModel;

/**
 * Created by gregory.nain on 11/11/14.
 */
public interface KEventBroker {

    public void connect(Callback<Throwable> callback);

    public void close(Callback<Throwable> callback);

    void registerListener(Object origin, ModelListener listener, Object scope);

    void unregister(ModelListener listener);

    void notify(KEvent event);

    void flush();

    void setKStore(KStore store);

    void setMetaModel(MetaModel metaModel);

    void sendOperationEvent(KEvent operationEvent);

}
