package org.kevoree.modeling.api.extrapolation;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.data.AccessMode;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaType;

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
        Object[] payload = current.view().dimension().universe().storage().raw(current, AccessMode.READ);
        if (payload != null) {
            return payload[attribute.index()];
        } else {
            return null;
        }
    }

    @Override
    public void mutate(KObject current, MetaAttribute attribute, Object payload) {
        //By requiring a raw on the current object, we automatically create and copy the previous object
        Object[] internalPayload = current.view().dimension().universe().storage().raw(current, AccessMode.WRITE);
        //The object is also automatically cset to Dirty
        if (internalPayload != null) {
            internalPayload[attribute.index()] = payload;
        }
    }

    @Override
    public String save(Object cache) {
        if (cache != null) {
            return cache.toString();
        } else {
            return null;
        }
    }

    @Override
    public Object load(String payload, MetaAttribute attribute, long now) {
        return convertRaw(attribute, payload);
    }

    public static Object convertRaw(MetaAttribute attribute, Object raw) {
        try {
            if (attribute.metaType().equals(MetaType.STRING)) {
                return raw.toString();
            } else if (attribute.metaType().equals(MetaType.LONG)) {
                return Long.parseLong(raw.toString());
            } else if (attribute.metaType().equals(MetaType.INT)) {
                return Integer.parseInt(raw.toString());
            } else if (attribute.metaType().equals(MetaType.BOOL)) {
                return raw.toString().equals("true");
            } else if (attribute.metaType().equals(MetaType.SHORT)) {
                return Short.parseShort(raw.toString());
            } else if (attribute.metaType().equals(MetaType.DOUBLE)) {
                return Double.parseDouble(raw.toString());
            } else if (attribute.metaType().equals(MetaType.FLOAT)) {
                return Float.parseFloat(raw.toString());
            } else {
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
