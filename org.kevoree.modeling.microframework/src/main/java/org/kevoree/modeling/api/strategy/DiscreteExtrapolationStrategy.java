package org.kevoree.modeling.api.strategy;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.data.AccessMode;
import org.kevoree.modeling.api.meta.MetaAttribute;

/**
 * Created by duke on 10/28/14.
 */
public class DiscreteExtrapolationStrategy implements ExtrapolationStrategy {

    @Override
    public Long[] timedDependencies(KObject current) {
        Long[] times = new Long[1];
        times[0] = current.timeTree().resolve(current.now());
        return times;
    }

    @Override
    public Object extrapolate(KObject current, MetaAttribute attribute, KObject[] dependencies) {
        Object[] payload = current.view().dimension().universe().storage().raw(current, AccessMode.READ);
        if (payload != null) {
            return payload[attribute.index()];
        } else {
            return null;
        }
    }

    @Override
    public void mutate(KObject current, MetaAttribute attribute, Object payload, KObject[] dependencies) {
        //By requiring a raw on the current object, we automatically create and copy the previous object
        Object[] internalPayload = current.view().dimension().universe().storage().raw(current, AccessMode.WRITE);
        //The object is also automatically cset to Dirty
        if (internalPayload != null) {
            internalPayload[attribute.index()] = payload;
        }
    }

}
