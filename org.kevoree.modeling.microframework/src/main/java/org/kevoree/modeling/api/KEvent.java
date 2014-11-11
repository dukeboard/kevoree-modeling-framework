package org.kevoree.modeling.api;

import org.kevoree.modeling.api.meta.Meta;

/**
 * Created by duke on 10/29/14.
 */
public interface KEvent {

    public Long getSourceDimension();

    public Long getSourceTime();

    public Long getSourceUUID();

    public String getKActionTypeIndex();

    public String getMetaClassIndex();

    public String getMetaElementIndex();

    public String pastValue();

    public String newValue();

    public String toJSON();

}
