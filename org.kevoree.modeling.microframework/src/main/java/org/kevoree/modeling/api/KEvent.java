package org.kevoree.modeling.api;

import org.kevoree.modeling.api.meta.Meta;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.trace.ModelTrace;

/**
 * Created by duke on 10/29/14.
 */
public interface KEvent {

    public Long dimension();

    public Long time();

    public Long uuid();

    public KActionType actionType();

    public MetaClass metaClass();

    public Meta metaElement();

    public Object value();

    public String toJSON();

    public ModelTrace toTrace();

}
