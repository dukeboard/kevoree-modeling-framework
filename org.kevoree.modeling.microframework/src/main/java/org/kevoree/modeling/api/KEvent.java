package org.kevoree.modeling.api;

import org.kevoree.modeling.api.meta.Meta;

/**
 * Created by duke on 10/29/14.
 */
public interface KEvent {

    public Long dimension();

    public Long time();

    public Long uuid();

    public String kActionType();

    public String metaClass();

    public String metaElement();

    public String pastValue();

    public String newValue();

    public String toJSON();

}
