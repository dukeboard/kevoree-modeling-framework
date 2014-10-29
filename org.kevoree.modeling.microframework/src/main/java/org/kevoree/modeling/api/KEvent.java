package org.kevoree.modeling.api;

import org.kevoree.modeling.api.meta.Meta;

/**
 * Created by duke on 10/29/14.
 */
public interface KEvent {

    public KActionType type();

    public Meta meta();

    public Object pastValue();

    public Object newValue();

    public KObject src();

}
