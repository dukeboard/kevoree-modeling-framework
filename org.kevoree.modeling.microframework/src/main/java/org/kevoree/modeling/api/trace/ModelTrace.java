package org.kevoree.modeling.api.trace;

import org.kevoree.modeling.api.KActionType;
import org.kevoree.modeling.api.meta.Meta;

/**
 * Created by duke on 10/2/14.
 */
public interface ModelTrace {

    public Meta getMeta();

    public KActionType getTraceType();

    public Long getSrcKID();

}
