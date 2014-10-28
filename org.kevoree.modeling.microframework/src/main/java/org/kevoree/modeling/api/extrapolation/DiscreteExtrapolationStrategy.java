package org.kevoree.modeling.api.extrapolation;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.data.KStore;
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
        Object[] payload = current.view().dimension().universe().storage().raw(current, KStore.AccessMode.READ);
        if (payload != null) {
            return payload[attribute.index()];
        } else {
            return null;
        }
    }

}
