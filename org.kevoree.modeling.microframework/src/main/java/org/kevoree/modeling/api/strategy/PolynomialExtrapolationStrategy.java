package org.kevoree.modeling.api.strategy;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.data.KStore;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.polynomial.DefaultPolynomialExtrapolation;
import org.kevoree.modeling.api.polynomial.PolynomialExtrapolation;
import org.kevoree.modeling.api.polynomial.util.Prioritization;

import java.util.Objects;

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
        PolynomialExtrapolation pol = (PolynomialExtrapolation) current.view().dimension().universe().storage().raw(current, KStore.AccessMode.READ)[attribute.index()];
        if (pol != null) {
            return pol.extrapolate(current.now());
        } else {
            return null;
        }
    }

    @Override
    public void mutate(KObject current, MetaAttribute attribute, Object payload, KObject[] dependencies) {
        Object previous = current.view().dimension().universe().storage().raw(current, KStore.AccessMode.READ)[attribute.index()];
        if (previous == null) {
            PolynomialExtrapolation pol = new DefaultPolynomialExtrapolation(current.now(), attribute.precision(), 20, 1, Prioritization.LOWDEGREES);
            pol.insert(current.now(), Double.parseDouble(payload.toString()));
            current.view().dimension().universe().storage().raw(current, KStore.AccessMode.WRITE)[attribute.index()] = pol;
        } else {
            PolynomialExtrapolation previousPol = (PolynomialExtrapolation) previous;
            if (!previousPol.insert(current.now(), Double.parseDouble(payload.toString()))) {
                PolynomialExtrapolation pol = new DefaultPolynomialExtrapolation(previousPol.lastIndex(), attribute.precision(), 20, 1, Prioritization.LOWDEGREES);
                pol.insert(previousPol.lastIndex(), previousPol.extrapolate(previousPol.lastIndex()));
                pol.insert(current.now(), Double.parseDouble(payload.toString()));
                current.view().dimension().universe().storage().raw(current, KStore.AccessMode.WRITE)[attribute.index()] = pol;
            }
        }
    }
}
