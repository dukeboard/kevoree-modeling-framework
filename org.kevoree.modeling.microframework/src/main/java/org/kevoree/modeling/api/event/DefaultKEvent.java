package org.kevoree.modeling.api.event;

import org.kevoree.modeling.api.KEvent;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.json.JsonString;
import org.kevoree.modeling.api.json.JsonToken;
import org.kevoree.modeling.api.json.Lexer;
import org.kevoree.modeling.api.json.Type;
import org.kevoree.modeling.api.meta.Meta;
import org.kevoree.modeling.api.KActionType;

public class DefaultKEvent implements KEvent {

    private Long _dimensionKey;
    private Long _time;
    private Long _uuid;

    private String _kActionType;
    private String _metaClass;
    private String _metaElement;

    private String _pastValue;
    private String _newValue;


    public DefaultKEvent(KActionType p_type, KObject p_source, Meta p_meta,  String p_pastValue, String p_newValue) {
        if(p_source != null) {
            this._dimensionKey = p_source.dimension().key();
            this._time = p_source.now();
            this._uuid = p_source.uuid();
            this._metaClass = p_source.metaClass().metaName();
        }
        if(p_type != null) {
            this._kActionType = p_type.toString();
        }
        if(p_meta != null) {
            this._metaElement = p_meta.metaName();
        }
        if(p_pastValue != null) {
            this._pastValue = p_pastValue;
        }
        if(p_newValue != null) {
            this._newValue = p_newValue;
        }
    }

    public Long dimension() {
        return _dimensionKey;
    }

    public Long time() {
        return _time;
    }

    public Long uuid() {
        return _uuid;
    }

    public String kActionType() {
        return _kActionType;
    }

    public String metaClass() {
        return _metaClass;
    }

    public String metaElement() {
        return _metaElement;
    }

    @Override
    public String pastValue() {
        return _pastValue;
    }

    @Override
    public String newValue() {
        return _newValue;
    }


    @Override
    public String toString() {
        return toJSON();
    }


    private static final String LEFT_BRACE="{", RIGHT_BRACE="}", DIMENSION_KEY="dim", TIME_KEY="time", UUID_KEY="uuid", TYPE_KEY="type", CLASS_KEY="class", ELEMENT_KEY="elem", PAST_VALUE_KEY="pastValue", NEW_VALUE_KEY="newValue";
    public String toJSON() {
        StringBuilder sb = new StringBuilder();
        sb.append(LEFT_BRACE);
        sb.append("\"").append(DIMENSION_KEY).append("\":\"").append(_dimensionKey).append("\",");
        sb.append("\"").append(TIME_KEY).append("\":\"").append(_time).append("\",");
        sb.append("\"").append(UUID_KEY).append("\":\"").append(_uuid).append("\",");
        sb.append("\"").append(TYPE_KEY).append("\":\"").append(_kActionType).append("\",");
        sb.append("\"").append(CLASS_KEY).append("\":\"").append(_metaClass).append("\"");
        if(_metaElement != null) {
            sb.append(",\"").append(ELEMENT_KEY).append("\":\"").append(_metaElement).append("\"");
        }
        if(_pastValue != null) {
            sb.append(",\"").append(PAST_VALUE_KEY).append("\":\"").append(JsonString.encode(_pastValue)).append("\"");
        }
        if(_newValue != null) {
            sb.append(",\"").append(NEW_VALUE_KEY).append("\":\"").append(JsonString.encode(_newValue)).append("\"");
        }
        sb.append(RIGHT_BRACE);
        return sb.toString();
    }


    public static KEvent fromJSON(String payload) {
        Lexer lexer = new Lexer(payload);
        JsonToken currentToken = lexer.nextToken();
        if (currentToken.tokenType() == Type.LEFT_BRACE) {
            String currentAttributeName = null;
            DefaultKEvent event = new DefaultKEvent(null, null, null, null, null);
            currentToken = lexer.nextToken();
            while(currentToken.tokenType() != Type.EOF) {
                if(currentToken.tokenType() == Type.VALUE) {
                    if(currentAttributeName == null) {
                        currentAttributeName = currentToken.value().toString();
                    } else {
                        setEventAttribute(event, currentAttributeName, currentToken.value().toString());
                        currentAttributeName = null;
                    }
                }
                currentToken = lexer.nextToken();
            }
            return event;
        }
        return null;
    }

    private static void setEventAttribute(DefaultKEvent event, String currentAttributeName, String value){
        if(currentAttributeName.equals(DIMENSION_KEY)) {
            event._dimensionKey = Long.parseLong(value);
        } else if(currentAttributeName.equals(TIME_KEY)) {
            event._time = Long.parseLong(value);
        } else if(currentAttributeName.equals(UUID_KEY)) {
            event._uuid = Long.parseLong(value);
        } else if(currentAttributeName.equals(TYPE_KEY)) {
            event._kActionType = value;
        } else if(currentAttributeName.equals(CLASS_KEY)) {
            event._metaClass = value;
        } else if(currentAttributeName.equals(ELEMENT_KEY)) {
            event._metaElement = value;
        } else if(currentAttributeName.equals(PAST_VALUE_KEY)) {
            event._pastValue = JsonString.unescape(value);
        } else if(currentAttributeName.equals(NEW_VALUE_KEY)) {
            event._newValue = JsonString.unescape(value);
        } else {
            //WTF !
        }
    }

}
