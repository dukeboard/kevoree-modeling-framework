package org.kevoree.modeling.extrapolation.impl;

import org.kevoree.modeling.KObject;
import org.kevoree.modeling.abs.AbstractKObject;
import org.kevoree.modeling.extrapolation.Extrapolation;
import org.kevoree.modeling.memory.struct.segment.KMemorySegment;
import org.kevoree.modeling.memory.AccessMode;
import org.kevoree.modeling.meta.KMetaAttribute;

public class DiscreteExtrapolation implements Extrapolation {

    private static DiscreteExtrapolation INSTANCE;

    public static Extrapolation instance() {
        if (INSTANCE == null) {
            INSTANCE = new DiscreteExtrapolation();
        }
        return INSTANCE;
    }

    @Override
    public Object extrapolate(KObject current, KMetaAttribute attribute) {
        KMemorySegment payload = ((AbstractKObject) current)._manager.segment(current.universe(),current.now(),current.uuid(), AccessMode.RESOLVE,current.metaClass());
        if (payload != null) {
            return payload.get(attribute.index(), current.metaClass());
        } else {
            return null;
        }
    }

    @Override
    public void mutate(KObject current, KMetaAttribute attribute, Object payload) {
        //By requiring a raw on the current object, we automatically create and copy the previous object
        KMemorySegment internalPayload = ((AbstractKObject) current)._manager.segment(current.universe(),current.now(),current.uuid(), AccessMode.NEW,current.metaClass());
        //The object is also automatically cset to Dirty
        if (internalPayload != null) {
            internalPayload.set(attribute.index(), payload, current.metaClass());
        }
    }

    @Override
    public String save(Object cache, KMetaAttribute attribute) {
        if (cache != null) {
            return attribute.attributeType().save(cache);
        } else {
            return null;
        }
    }

    @Override
    public Object load(String payload, KMetaAttribute attribute, long now) {
        if (payload != null) {
            return attribute.attributeType().load(payload);
        }
        return null;
    }

}
