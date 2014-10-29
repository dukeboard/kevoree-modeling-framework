package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.data.EventDispatcher;
import org.kevoree.modeling.api.data.KDataBase;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.event.DefaultKEvent;

public abstract class AbstractKDataBase implements KDataBase {

    private final EventDispatcher selector = new EventDispatcher();

    @Override
    public void notify(DefaultKEvent event) {
        selector.dispatch(event);
    }

    @Override
    public void register(ModelListener listener, long from, long to, String path) {
        selector.register(listener, from, to, path);
    }

    @Override
    public void unregister(ModelListener listener) {
        selector.unregister(listener);
    }

}