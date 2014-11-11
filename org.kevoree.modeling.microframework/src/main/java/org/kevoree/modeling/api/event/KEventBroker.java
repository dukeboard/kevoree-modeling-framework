package org.kevoree.modeling.api.event;

import org.kevoree.modeling.api.KEvent;
import org.kevoree.modeling.api.ModelListener;

/**
 * Created by gregory.nain on 11/11/14.
 */
public interface KEventBroker {

    void registerListener(Object origin, ModelListener listener);

    void notify(KEvent event);

    void flush(Long dimensionKey);
}
