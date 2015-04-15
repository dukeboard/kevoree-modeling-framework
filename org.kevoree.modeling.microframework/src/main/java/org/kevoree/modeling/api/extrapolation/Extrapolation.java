package org.kevoree.modeling.api.extrapolation;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.meta.MetaAttribute;

public interface Extrapolation {

    Object extrapolate(KObject current, MetaAttribute attribute);

    void mutate(KObject current, MetaAttribute attribute, Object payload);

    String save(Object cache, MetaAttribute attribute);

    Object load(String payload, MetaAttribute attribute, long now);

}
