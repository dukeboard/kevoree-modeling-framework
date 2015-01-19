package org.kevoree.modeling.api.extrapolation;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.data.AccessMode;
import org.kevoree.modeling.api.meta.MetaAttribute;

/**
 * Created by duke on 10/28/14.
 */
public class DiscreteExtrapolation implements Extrapolation {

    private static DiscreteExtrapolation INSTANCE;

    public static Extrapolation instance() {
        if (INSTANCE == null) {
            INSTANCE = new DiscreteExtrapolation();
        }
        return INSTANCE;
    }

    @Override
    public Object extrapolate(KObject current, MetaAttribute attribute) {
        Object[] payload = current.view().universe().model().storage().raw(current, AccessMode.READ);
        if (payload != null) {
            return payload[attribute.index()];
        } else {
            return null;
        }
    }

    @Override
    public void mutate(KObject current, MetaAttribute attribute, Object payload) {
        //By requiring a raw on the current object, we automatically create and copy the previous object
        Object[] internalPayload = current.view().universe().model().storage().raw(current, AccessMode.WRITE);
        //The object is also automatically cset to Dirty
        if (internalPayload != null) {
            internalPayload[attribute.index()] = payload;
        }
    }

    @Override
    public String save(Object cache, MetaAttribute attribute) {
        if (cache != null) {
            return attribute.metaType().save(cache);
        } else {
            return null;
        }
    }

    @Override
    public Object load(String payload, MetaAttribute attribute, long now) {
        if (payload != null) {
            return attribute.metaType().load(payload);
        }
        return null;
    }

}
