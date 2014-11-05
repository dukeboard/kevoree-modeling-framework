package org.kevoree.modeling.api.extrapolation;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.data.AccessMode;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.polynomial.DefaultPolynomialExtrapolation;
import org.kevoree.modeling.api.polynomial.util.Prioritization;

/**
 * Created by duke on 10/28/14.
 */
public class PolynomialExtrapolation implements Extrapolation {
    @Override
    public Long[] timedDependencies(KObject current) {
        //By default we need the current object
        Long[] times = new Long[1];
        times[0] = current.timeTree().resolve(current.now());
        return times;
    }

    @Override
    public Object extrapolate(KObject current, MetaAttribute attribute, KObject[] dependencies) {
        org.kevoree.modeling.api.polynomial.PolynomialExtrapolation pol = (org.kevoree.modeling.api.polynomial.PolynomialExtrapolation) current.view().dimension().universe().storage().raw(current, AccessMode.READ)[attribute.index()];
        if (pol != null) {
            return pol.extrapolate(current.now());
        } else {
            return null;
        }
    }

    @Override
    public void mutate(KObject current, MetaAttribute attribute, Object payload, KObject[] dependencies) {
        Object previous = current.view().dimension().universe().storage().raw(current, AccessMode.READ)[attribute.index()];
        if (previous == null) {
            org.kevoree.modeling.api.polynomial.PolynomialExtrapolation pol = new DefaultPolynomialExtrapolation(current.now(), attribute.precision(), 20, 1, Prioritization.LOWDEGREES);
            pol.insert(current.now(), Double.parseDouble(payload.toString()));
            current.view().dimension().universe().storage().raw(current, AccessMode.WRITE)[attribute.index()] = pol;
        } else {
            org.kevoree.modeling.api.polynomial.PolynomialExtrapolation previousPol = (org.kevoree.modeling.api.polynomial.PolynomialExtrapolation) previous;
            if (!previousPol.insert(current.now(), Double.parseDouble(payload.toString()))) {
                org.kevoree.modeling.api.polynomial.PolynomialExtrapolation pol = new DefaultPolynomialExtrapolation(previousPol.lastIndex(), attribute.precision(), 20, 1, Prioritization.LOWDEGREES);
                pol.insert(previousPol.lastIndex(), previousPol.extrapolate(previousPol.lastIndex()));
                pol.insert(current.now(), Double.parseDouble(payload.toString()));
                current.view().dimension().universe().storage().raw(current, AccessMode.WRITE)[attribute.index()] = pol;
            }
        }
    }

    private static PolynomialExtrapolation INSTANCE = new PolynomialExtrapolation();

    public static Extrapolation instance(){
        return INSTANCE;
    }

}
