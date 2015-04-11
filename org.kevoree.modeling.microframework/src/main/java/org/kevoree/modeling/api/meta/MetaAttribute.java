package org.kevoree.modeling.api.meta;

import org.kevoree.modeling.api.KType;
import org.kevoree.modeling.api.extrapolation.Extrapolation;

public interface MetaAttribute extends Meta {

    boolean key();

    KType attributeType();

    Extrapolation strategy();

    double precision();

    void setExtrapolation(Extrapolation extrapolation);

}
