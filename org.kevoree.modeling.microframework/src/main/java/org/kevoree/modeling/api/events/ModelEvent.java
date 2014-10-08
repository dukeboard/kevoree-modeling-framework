package org.kevoree.modeling.api.events;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.time.TimeAwareKObject;
import org.kevoree.modeling.api.util.ActionType;
import org.kevoree.modeling.api.util.ElementAttributeType;

public class ModelEvent {
    private ActionType etype;
    private ElementAttributeType elementAttributeType;
    private String elementAttributeName;
    private Object value;
    private Object previous_value;
    private KObject source;
    private String previousPath;

    public ModelEvent(ActionType etype, ElementAttributeType elementAttributeType, String elementAttributeName, Object value, Object previous_value, KObject source, String previousPath) {
        this.etype = etype;
        this.elementAttributeType = elementAttributeType;
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

    public ActionType getEtype() {
        return etype;
    }

    public ElementAttributeType getElementAttributeType() {
        return elementAttributeType;
    }

    @Override
    public String toString() {
        if (source instanceof TimeAwareKObject) {
            return "ModelEvent[src:[" + source.now() + "]" + source.path() + ", type:" + etype + ", elementAttributeType:" + elementAttributeType + ", elementAttributeName:" + elementAttributeName + ", value:" + value + ", previousValue:" + previous_value + "]";
        } else {
            String srcPath = "";
            if (source != null) {
                srcPath = source.path();
            }
            return "ModelEvent[src:" + srcPath + ", type:" + etype + ", elementAttributeType:" + elementAttributeType + ", elementAttributeName:" + elementAttributeName + ", value:" + value + ", previousValue:" + previous_value + "]";
        }
    }
}
