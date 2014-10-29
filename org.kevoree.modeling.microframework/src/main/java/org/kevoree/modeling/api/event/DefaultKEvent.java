package org.kevoree.modeling.api.event;

import org.kevoree.modeling.api.KEvent;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.meta.Meta;
import org.kevoree.modeling.api.KActionType;

public class DefaultKEvent implements KEvent {

    private KActionType type;
    private Meta meta;
    private Object pastValue;
    private Object newValue;
    private KObject source;

    public DefaultKEvent(KActionType type, Meta meta, KObject source, Object pastValue, Object newValue) {
        this.type = type;
        this.meta = meta;
        this.source = source;
        this.pastValue = pastValue;
        this.newValue = newValue;
    }

    @Override
    public String toString() {
        String newValuePayload = "";
        if (newValue() != null) {
            newValuePayload = newValue().toString().replace("\n", "");
        }
        return "ModelEvent[src:[t=" + source.now() + "]uuid=" + source.uuid() + ", type:" + type + ", meta:" + meta() + ", pastValue:" + pastValue() + ", newValue:" + newValuePayload + "]";
    }

    @Override
    public KActionType type() {
        return type;
    }

    @Override
    public Meta meta() {
        return meta;
    }

    @Override
    public Object pastValue() {
        return pastValue;
    }

    @Override
    public Object newValue() {
        return newValue;
    }

    @Override
    public KObject src() {
        return source;
    }

}
