package org.kevoree.modeling.api.events;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.meta.Meta;
import org.kevoree.modeling.api.KActionType;

public class ModelEvent {
    private KActionType etype;
    private Meta meta;
    private String elementAttributeName;
    private Object value;
    private Object previous_value;
    private KObject source;
    private String previousPath;

    public ModelEvent(KActionType etype, Meta meta, String elementAttributeName, Object value, Object previous_value, KObject source, String previousPath) {
        this.etype = etype;
        this.meta = meta;
        this.elementAttributeName = elementAttributeName;
        this.value = value;
        this.previous_value = previous_value;
        this.source = source;
        this.previousPath = previousPath;
    }

    public Object getValue() {
        return value;
    }

    public KObject getSource() {
        return source;
    }

    public String getPreviousPath() {
        return previousPath;
    }

    public Object getPrevious_value() {
        return previous_value;
    }

    public String getElementAttributeName() {
        return elementAttributeName;
    }

    public KActionType getEtype() {
        return etype;
    }

    public Meta getMeta() {
        return meta;
    }

    @Override
    public String toString() {
        return "ModelEvent[src:[" + source.now() + "]" + source.path() + ", type:" + etype + ", meta:" + getMeta() + ", elementAttributeName:" + elementAttributeName + ", value:" + value + ", previousValue:" + previous_value + "]";
    }
}
