package org.kevoree.modeling.api.trace;

import org.kevoree.modeling.api.KActionType;
import org.kevoree.modeling.api.json.JSONString;
import org.kevoree.modeling.api.meta.Meta;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaReference;

/**
 * Created by duke on 10/3/14.
 */
public class ModelAddTrace implements ModelTrace {

    private MetaReference reference;

    private KActionType traceType = KActionType.ADD;

    private String srcPath;

    public String getPreviousPath() {
        return previousPath;
    }

    private String previousPath;

    public MetaClass getMetaClass() {
        return metaClass;
    }

    private MetaClass metaClass;

    public ModelAddTrace(String srcPath, MetaReference reference, String previousPath, MetaClass metaClass) {
        this.srcPath = srcPath;
        this.reference = reference;
        this.previousPath = previousPath;
        this.metaClass = metaClass;
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
        JSONString.encodeBuffer(buffer, srcPath);
        buffer.append(ModelTraceConstants.bb);
        if (reference != null) {
            buffer.append(ModelTraceConstants.coma);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.meta);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.dp);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(reference.metaName());
            buffer.append(ModelTraceConstants.bb);
        }
        if (previousPath != null) {
            buffer.append(ModelTraceConstants.coma);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.previouspath);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.dp);
            buffer.append(ModelTraceConstants.bb);
            JSONString.encodeBuffer(buffer, previousPath);
            buffer.append(ModelTraceConstants.bb);
        }
        if (metaClass != null) {
            buffer.append(ModelTraceConstants.coma);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.typename);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.dp);
            buffer.append(ModelTraceConstants.bb);
            JSONString.encodeBuffer(buffer, metaClass.metaName());
            buffer.append(ModelTraceConstants.bb);
        }
        buffer.append(ModelTraceConstants.closeJSON);
        return buffer.toString();
    }

    @Override
    public Meta getMeta() {
        return reference;
    }

    @Override
    public KActionType getTraceType() {
        return traceType;
    }

    @Override
    public String getSrcPath() {
        return srcPath;
    }

}
