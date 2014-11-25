package org.kevoree.modeling.api.extrapolation;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.abs.AbstractKObject;
import org.kevoree.modeling.api.data.AccessMode;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaType;
import org.kevoree.modeling.api.polynomial.DefaultPolynomialModel;
import org.kevoree.modeling.api.polynomial.PolynomialModel;
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
        PolynomialModel pol = (PolynomialModel) current.view().dimension().universe().storage().raw(current, AccessMode.READ)[attribute.index()];
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
            PolynomialModel pol = new DefaultPolynomialModel(current.now(), attribute.precision(), 20, 1, Prioritization.LOWDEGREES);
            pol.insert(current.now(), Double.parseDouble(payload.toString()));
            current.view().dimension().universe().storage().raw(current, AccessMode.WRITE)[attribute.index()] = pol;
        } else {
            PolynomialModel previousPol = (PolynomialModel) previous;
            if (!previousPol.insert(current.now(), Double.parseDouble(payload.toString()))) {
                PolynomialModel pol = new DefaultPolynomialModel(previousPol.lastIndex(), attribute.precision(), 20, 1, Prioritization.LOWDEGREES);
                pol.insert(previousPol.lastIndex(), previousPol.extrapolate(previousPol.lastIndex()));
                pol.insert(current.now(), Double.parseDouble(payload.toString()));
                current.view().dimension().universe().storage().raw(current, AccessMode.WRITE)[attribute.index()] = pol;
            } else {
                //Value fit the previous polynomial, but if degrees has changed we have to set the object to dirty for the next save batch
                if (previousPol.isDirty()) {
                    ((AbstractKObject) current).setDirty(true);
                }
            }
        }
    }

    private static PolynomialExtrapolation INSTANCE;

    public static Extrapolation instance() {
        if (INSTANCE == null) {
            INSTANCE = new PolynomialExtrapolation();
        }
        return INSTANCE;
    }

}
