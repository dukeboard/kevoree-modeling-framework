package org.kevoree.modeling.api.events;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.meta.Meta;
import org.kevoree.modeling.api.KActionType;

public class ModelEvent {
    private KActionType type;
    private Meta meta;
    private Object pastValue;
    private Object newValue;
    private KObject source;

    public ModelEvent(KActionType type, Meta meta, KObject source, Object pastValue, Object newValue) {
        this.type = type;
        this.meta = meta;
        this.source = source;
        this.pastValue = pastValue;
        this.newValue = newValue;
    }

    public KActionType getType() {
        return type;
    }

    public Meta getMeta() {
        return meta;
    }

    public Object getPastValue() {
        return pastValue;
    }

    public Object getNewValue() {
        return newValue;
    }

    public KObject getSource() {
        return source;
    }

    @Override
    public String toString() {
        return "ModelEvent[src:[" + source.now() + "]" + source.uuid() + ", type:" + type + ", meta:" + getMeta() + ", pastValue:" + getPastValue() + ", newValue:" + getNewValue() + "]";
    }
}
