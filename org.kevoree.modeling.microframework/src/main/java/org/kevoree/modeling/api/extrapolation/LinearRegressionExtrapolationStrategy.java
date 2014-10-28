package org.kevoree.modeling.api.extrapolation;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.meta.MetaAttribute;

/**
 * Created by duke on 10/28/14.
 */
public class LinearRegressionExtrapolationStrategy implements ExtrapolationStrategy {
    @Override
    public Long[] timedDependencies(KObject current) {
        //TODO ASSAD HERE, thinks about the case that the object
        return new Long[0];
    }

    @Override
    public Object extrapolate(KObject current, MetaAttribute attribute, KObject[] dependencies) {

        return null;
    }
}
