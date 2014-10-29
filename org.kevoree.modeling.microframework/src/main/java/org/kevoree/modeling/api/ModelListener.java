package org.kevoree.modeling.api;

import org.kevoree.modeling.api.event.DefaultKEvent;

public interface ModelListener {
    public void on(DefaultKEvent evt);
}
