package org.kevoree.modeling.api.trace;

import org.kevoree.modeling.api.KActionType;
import org.kevoree.modeling.api.meta.Meta;
import org.kevoree.modeling.api.meta.MetaClass;

/**
 * Created by duke on 11/12/14.
 */
public class ModelNewTrace implements ModelTrace {

    private long _srcUUID;

    private MetaClass _metaClass;

    public ModelNewTrace(Long p_srcUUID, MetaClass p_metaClass) {
        this._srcUUID = p_srcUUID;
        this._metaClass = p_metaClass;
    }

    @Override
    public Meta meta() {
        return _metaClass;
    }

    @Override
    public KActionType traceType() {
        return KActionType.NEW;
    }

    @Override
    public Long sourceUUID() {
        return _srcUUID;
    }
}
