package org.kevoree.modeling.extrapolation;

import org.kevoree.modeling.KObject;
import org.kevoree.modeling.meta.MetaAttribute;

public interface Extrapolation {

    Object extrapolate(KObject current, MetaAttribute attribute);

    void mutate(KObject current, MetaAttribute attribute, Object payload);

    String save(Object cache, MetaAttribute attribute);

    Object load(String payload, MetaAttribute attribute, long now);

}
