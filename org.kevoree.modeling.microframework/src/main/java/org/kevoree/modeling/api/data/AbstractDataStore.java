package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.events.ModelElementListener;
import org.kevoree.modeling.api.events.ModelEvent;

public abstract class AbstractDataStore implements DataStore {

    private final EventDispatcher selector = new EventDispatcher();

    @Override
    public void notify(ModelEvent event) {
        selector.dispatch(event);
    }

    @Override
    public void register(ModelElementListener listener, long from, long to, String path) {
        selector.register(listener, from, to, path);
    }

    @Override
    public void unregister(ModelElementListener listener) {
        selector.unregister(listener);
    }

}