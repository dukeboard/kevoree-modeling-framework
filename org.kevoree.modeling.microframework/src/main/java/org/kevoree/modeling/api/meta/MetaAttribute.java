package org.kevoree.modeling.api.meta;

import org.kevoree.modeling.api.KMetaType;
import org.kevoree.modeling.api.extrapolation.Extrapolation;

/**
 * Created by duke on 10/9/14.
 */
public interface MetaAttribute extends Meta {

    boolean key();

    KMetaType metaType();

    Extrapolation strategy();

    double precision();

    public void setExtrapolation(Extrapolation extrapolation);

}
