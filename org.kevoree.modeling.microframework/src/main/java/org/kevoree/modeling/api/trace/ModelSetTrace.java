package org.kevoree.modeling.api.trace;

import org.kevoree.modeling.api.KActionType;
import org.kevoree.modeling.api.json.JSONString;
import org.kevoree.modeling.api.meta.Meta;
import org.kevoree.modeling.api.meta.MetaAttribute;

/**
 * Created by duke on 10/3/14.
 */
public class ModelSetTrace implements ModelTrace {

    private KActionType traceType = KActionType.SET;

    private String srcPath;

    private MetaAttribute attribute;

    private Object content;

    public ModelSetTrace(String srcPath, MetaAttribute attribute, Object content) {
        this.srcPath = srcPath;
        this.attribute = attribute;
        this.content = content;
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
    public Meta getMeta() {
        return attribute;
    }

    public Object getContent() {
        return content;
    }

    @Override
    public String toString() {
        return toCString(true, true);
    }

    @Override
    public String toCString(boolean withTypeName, boolean withSrcPath) {
        StringBuilder buffer = new StringBuilder();
        buffer.append(ModelTraceConstants.openJSON);
        if (withTypeName) {
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.traceType);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.dp);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(KActionType.SET);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.coma);
        }
        if (withSrcPath) {
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.src);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.dp);
            buffer.append(ModelTraceConstants.bb);
            JSONString.encodeBuffer(buffer, srcPath);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.coma);
        }
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.meta);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.dp);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(attribute.metaName());
        buffer.append(ModelTraceConstants.bb);
        if (content != null) {
            buffer.append(ModelTraceConstants.coma);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.content);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.dp);
            buffer.append(ModelTraceConstants.bb);
            JSONString.encodeBuffer(buffer, content.toString());//TODO manage for array
            buffer.append(ModelTraceConstants.bb);
        }
        buffer.append(ModelTraceConstants.closeJSON);
        return buffer.toString();
    }

}
