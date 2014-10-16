package org.kevoree.modeling.api.trace;

import org.kevoree.modeling.api.json.JSONString;
import org.kevoree.modeling.api.KActionType;
import org.kevoree.modeling.api.meta.Meta;

/**
 * Created by duke on 10/3/14.
 */
public class ModelControlTrace implements ModelTrace {

    private KActionType traceType = KActionType.CONTROL;

    private String srcPath;

    private String traceTypeGlobal;

    public ModelControlTrace(String srcPath, String traceTypeGlobal) {
        this.srcPath = srcPath;
        this.traceTypeGlobal = traceTypeGlobal;
    }

    @Override
    public Meta getMeta() {
        return null;
    }

    @Override
    public KActionType getTraceType() {
        return traceType;
    }

    @Override
    public String getSrcPath() {
        return srcPath;
    }

    @Override
    public String toString() {
        return toCString(true, true);
    }

    @Override
    public String toCString(boolean withTypeName, boolean withSrcPath) {
        StringBuilder buffer = new StringBuilder();
        buffer.append(ModelTraceConstants.openJSON);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.traceType);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.dp);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(KActionType.CONTROL.toString());
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.coma);
        if (traceTypeGlobal == null) {
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.src);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.dp);
            buffer.append(ModelTraceConstants.bb);
            JSONString.encodeBuffer(buffer, srcPath);
            buffer.append(ModelTraceConstants.bb);
        } else {
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.meta);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.dp);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(traceTypeGlobal);
            buffer.append(ModelTraceConstants.bb);
        }
        buffer.append(ModelTraceConstants.closeJSON);
        return buffer.toString();
    }

}
