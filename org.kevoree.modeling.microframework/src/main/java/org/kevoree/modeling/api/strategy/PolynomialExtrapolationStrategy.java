package org.kevoree.modeling.api.strategy;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.data.KStore;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.polynomial.DefaultPolynomialExtrapolation;
import org.kevoree.modeling.api.polynomial.PolynomialExtrapolation;
import org.kevoree.modeling.api.polynomial.util.Prioritization;

/**
 * Created by duke on 10/28/14.
 */
public class PolynomialExtrapolationStrategy implements ExtrapolationStrategy {
    @Override
    public Long[] timedDependencies(KObject current) {
        //By default we need the current object
        Long[] times = new Long[1];
        times[0] = current.timeTree().resolve(current.now());
        return times;
    }

    @Override
    public Object extrapolate(KObject current, MetaAttribute attribute, KObject[] dependencies) {
        Object[] internalPayload = current.view().dimension().universe().storage().raw(current, KStore.AccessMode.READ);
        PolynomialExtrapolation pol = (PolynomialExtrapolation) internalPayload[attribute.index()];
        if (pol != null) {
            return pol.extrapolate(current.now());
        } else {
            return null;
        }
    }

    @Override
    public void mutate(KObject current, MetaAttribute attribute, Object payload, KObject[] dependencies) {
        Object[] internalPayload = current.view().dimension().universe().storage().raw(current, KStore.AccessMode.READ);
        PolynomialExtrapolation pol = (PolynomialExtrapolation) internalPayload[attribute.index()];
        if (pol == null || !pol.insert(current.now(), Double.parseDouble(payload.toString()))) {
            pol = new DefaultPolynomialExtrapolation(current.now(), 0.1 /* TODO call attrbute definition */, 20, 1, Prioritization.LOWDEGREES);
            pol.insert(current.now(), Double.parseDouble(payload.toString()));
            Object[] internalPayloadWrite = current.view().dimension().universe().storage().raw(current, KStore.AccessMode.WRITE);
            internalPayloadWrite[attribute.index()] = pol;
        }
    }
}
