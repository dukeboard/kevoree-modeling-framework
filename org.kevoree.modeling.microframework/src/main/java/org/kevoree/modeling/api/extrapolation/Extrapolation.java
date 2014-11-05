package org.kevoree.modeling.api.extrapolation;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.meta.MetaAttribute;

/**
 * Created by duke on 10/28/14.
 */
public interface Extrapolation {

    public Long[] timedDependencies(KObject current);

    public Object extrapolate(KObject current, MetaAttribute attribute, KObject[] dependencies);

    public void mutate(KObject current, MetaAttribute attribute, Object payload, KObject[] dependencies);

}
