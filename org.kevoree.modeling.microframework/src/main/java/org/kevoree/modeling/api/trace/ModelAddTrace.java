package org.kevoree.modeling.api.trace;

import org.kevoree.modeling.api.KActionType;
import org.kevoree.modeling.api.json.JsonString;
import org.kevoree.modeling.api.meta.Meta;
import org.kevoree.modeling.api.meta.MetaReference;

/**
 * Created by duke on 10/3/14.
 */
public class ModelAddTrace implements ModelTrace {

    private long _srcUUID;

    private MetaReference _reference;

    private long _paramUUID;

    public ModelAddTrace(Long p_srcUUID, MetaReference p_reference, long p_paramUUID) {
        this._srcUUID = p_srcUUID;
        this._reference = p_reference;
        this._paramUUID = p_paramUUID;
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
        buffer.append(KActionType.ADD.toString());
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.coma);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.src);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.dp);
        buffer.append(ModelTraceConstants.bb);
        JsonString.encodeBuffer(buffer, _srcUUID + "");
        buffer.append(ModelTraceConstants.bb);
        if (_reference != null) {
            buffer.append(ModelTraceConstants.coma);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.meta);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.dp);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(_reference.origin().metaName());
            buffer.append(ModelTraceConstants.sep);
            buffer.append(_reference.metaName());
            buffer.append(ModelTraceConstants.bb);
        }
        buffer.append(ModelTraceConstants.coma);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.previouspath);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.dp);
        buffer.append(ModelTraceConstants.bb);
        JsonString.encodeBuffer(buffer, _paramUUID + "");
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.closeJSON);
        return buffer.toString();
    }

    @Override
    public Meta meta() {
        return _reference;
    }

    @Override
    public KActionType traceType() {
        return KActionType.ADD;
    }

    @Override
    public Long sourceUUID() {
        return null;
    }

    public long paramUUID() {
        return _paramUUID;
    }

}
