package org.kevoree.modeling.api.trace;

import org.kevoree.modeling.api.KActionType;
import org.kevoree.modeling.api.meta.Meta;

/**
 * Created by duke on 10/2/14.
 */
public interface ModelTrace {

    public Meta meta();

    public KActionType traceType();

    public Long sourceUUID();

}
