package org.kevoree.modeling.api.trace;

import org.kevoree.modeling.api.KActionType;
import org.kevoree.modeling.api.json.JsonString;
import org.kevoree.modeling.api.meta.Meta;
import org.kevoree.modeling.api.meta.MetaAttribute;

/**
 * Created by duke on 10/3/14.
 */
public class ModelSetTrace implements ModelTrace {

    private Long _srcUUID;

    private MetaAttribute _attribute;

    private Object _content;

    public ModelSetTrace(long p_srcUUID, MetaAttribute p_attribute, Object p_content) {
        this._srcUUID = p_srcUUID;
        this._attribute = p_attribute;
        this._content = p_content;
    }

    @Override
    public String toString() {
        StringBuilder buffer = new StringBuilder();
        buffer.append(ModelTraceConstants.openJSON);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.traceType);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.dp);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(KActionType.SET);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.coma);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.src);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.dp);
        buffer.append(ModelTraceConstants.bb);
        JsonString.encodeBuffer(buffer, _srcUUID + "");
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.coma);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.meta);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.dp);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(_attribute.metaName());
        buffer.append(ModelTraceConstants.bb);
        if (_content != null) {
            buffer.append(ModelTraceConstants.coma);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.content);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.dp);
            buffer.append(ModelTraceConstants.bb);
            JsonString.encodeBuffer(buffer, _content.toString());//TODO manage for array
            buffer.append(ModelTraceConstants.bb);
        }
        buffer.append(ModelTraceConstants.closeJSON);
        return buffer.toString();
    }

    @Override
    public Meta meta() {
        return _attribute;
    }

    @Override
    public KActionType traceType() {
        return KActionType.SET;
    }

    @Override
    public Long sourceUUID() {
        return _srcUUID;
    }

    public Object content() {
        return _content;
    }


}
