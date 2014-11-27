package org.kevoree.modeling.api.extrapolation;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.meta.MetaAttribute;

/**
 * Created by duke on 10/28/14.
 */
public interface Extrapolation {

    public Object extrapolate(KObject current, MetaAttribute attribute);

    public void mutate(KObject current, MetaAttribute attribute, Object payload);

    public abstract String save(Object cache);

    public abstract Object load(String payload, MetaAttribute attribute, long now);

}
