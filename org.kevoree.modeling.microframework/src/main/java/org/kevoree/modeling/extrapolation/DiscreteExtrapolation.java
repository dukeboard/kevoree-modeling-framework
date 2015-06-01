package org.kevoree.modeling.extrapolation;

import org.kevoree.modeling.KObject;
import org.kevoree.modeling.abs.AbstractKObject;
import org.kevoree.modeling.memory.struct.segment.HeapCacheSegment;
import org.kevoree.modeling.memory.AccessMode;
import org.kevoree.modeling.meta.MetaAttribute;

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
        HeapCacheSegment payload = ((AbstractKObject) current)._manager.segment(current, AccessMode.READ);
        if (payload != null) {
            return payload.get(attribute.index(), current.metaClass());
        } else {
            return null;
        }
    }

    @Override
    public void mutate(KObject current, MetaAttribute attribute, Object payload) {
        //By requiring a raw on the current object, we automatically create and copy the previous object
        HeapCacheSegment internalPayload = ((AbstractKObject) current)._manager.segment(current, AccessMode.WRITE);
        //The object is also automatically cset to Dirty
        if (internalPayload != null) {
            internalPayload.set(attribute.index(), payload, current.metaClass());
        }
    }

    @Override
    public String save(Object cache, MetaAttribute attribute) {
        if (cache != null) {
            return attribute.attributeType().save(cache);
        } else {
            return null;
        }
    }

    @Override
    public Object load(String payload, MetaAttribute attribute, long now) {
        if (payload != null) {
            return attribute.attributeType().load(payload);
        }
        return null;
    }

}
