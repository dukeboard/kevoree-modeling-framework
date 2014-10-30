package org.kevoree.modeling.api.event;

import org.kevoree.modeling.api.KEvent;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.meta.Meta;
import org.kevoree.modeling.api.KActionType;

public class DefaultKEvent implements KEvent {

    private KActionType _type;
    private Meta _meta;
    private Object _pastValue;
    private Object _newValue;
    private KObject _source;

    public DefaultKEvent(KActionType p_type, Meta p_meta, KObject p_source, Object p_pastValue, Object p_newValue) {
        this._type = p_type;
        this._meta = p_meta;
        this._source = p_source;
        this._pastValue = p_pastValue;
        this._newValue = p_newValue;
    }

    @Override
    public String toString() {
        String newValuePayload = "";
        if (newValue() != null) {
            newValuePayload = newValue().toString().replace("\n", "");
        }
        return "ModelEvent[src:[t=" + _source.now() + "]uuid=" + _source.uuid() + ", type:" + _type + ", meta:" + meta() + ", pastValue:" + pastValue() + ", newValue:" + newValuePayload + "]";
    }

    @Override
    public KActionType type() {
        return _type;
    }

    @Override
    public Meta meta() {
        return _meta;
    }

    @Override
    public Object pastValue() {
        return _pastValue;
    }

    @Override
    public Object newValue() {
        return _newValue;
    }

    @Override
    public KObject src() {
        return _source;
    }

}
