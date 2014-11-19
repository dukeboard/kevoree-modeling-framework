package org.kevoree.modeling.api.extrapolation;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.data.AccessMode;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaType;
import org.kevoree.modeling.api.polynomial.DefaultPolynomialExtrapolation2;
import org.kevoree.modeling.api.polynomial.util.Prioritization;

/**
 * Created by duke on 10/28/14.
 */
public class PolynomialExtrapolation2 implements Extrapolation {
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
            Double extrapolatedValue = pol.extrapolate(current.now());
            if (attribute.metaType().equals(MetaType.DOUBLE)) {
                return extrapolatedValue;
            } else if (attribute.metaType().equals(MetaType.LONG)) {
                return extrapolatedValue.longValue();
            } else if (attribute.metaType().equals(MetaType.FLOAT)) {
                return extrapolatedValue.floatValue();
            } else if (attribute.metaType().equals(MetaType.INT)) {
                return extrapolatedValue.intValue();
            } else if (attribute.metaType().equals(MetaType.SHORT)) {
                return extrapolatedValue.shortValue();
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    @Override
    public void mutate(KObject current, MetaAttribute attribute, Object payload, KObject[] dependencies) {
        Object previous = current.view().dimension().universe().storage().raw(current, AccessMode.READ)[attribute.index()];
        if (previous == null) {
            org.kevoree.modeling.api.polynomial.PolynomialExtrapolation pol = new DefaultPolynomialExtrapolation2(current.now(), attribute.precision(), 20, 1, Prioritization.LOWDEGREES);
            pol.insert(current.now(), Double.parseDouble(payload.toString()));
            current.view().dimension().universe().storage().raw(current, AccessMode.WRITE)[attribute.index()] = pol;
        } else {
            org.kevoree.modeling.api.polynomial.PolynomialExtrapolation previousPol = (org.kevoree.modeling.api.polynomial.PolynomialExtrapolation) previous;
            if (!previousPol.insert(current.now(), Double.parseDouble(payload.toString()))) {
                long prevTime = previousPol.indexBefore(current.now());
                org.kevoree.modeling.api.polynomial.PolynomialExtrapolation pol = new DefaultPolynomialExtrapolation2(prevTime, attribute.precision(), 20, 1, Prioritization.LOWDEGREES);
                pol.insert(prevTime, previousPol.extrapolate(prevTime));
                pol.insert(current.now(), Double.parseDouble(payload.toString()));
                current.view().dimension().universe().storage().raw(current, AccessMode.WRITE)[attribute.index()] = pol;
                long[] times=pol.timesAfter(current.now());
                // insert again in the tree, and remove it from the previous pol.

            }
        }
    }

    private static PolynomialExtrapolation2 INSTANCE;

    public static Extrapolation instance() {
        if(INSTANCE==null){
            INSTANCE = new PolynomialExtrapolation2();
        }
        return INSTANCE;
    }

}
