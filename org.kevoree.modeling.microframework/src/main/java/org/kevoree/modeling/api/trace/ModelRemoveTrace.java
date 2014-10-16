package org.kevoree.modeling.api.trace;

import org.kevoree.modeling.api.KActionType;
import org.kevoree.modeling.api.json.JSONString;
import org.kevoree.modeling.api.meta.Meta;
import org.kevoree.modeling.api.meta.MetaReference;

/**
 * Created by duke on 10/3/14.
 */
public class ModelRemoveTrace implements ModelTrace {

    private KActionType traceType = KActionType.REMOVE;

    private String srcPath;

    private String objPath;

    private MetaReference reference;

    public ModelRemoveTrace(String srcPath, MetaReference reference, String objPath) {
        this.srcPath = srcPath;
        this.reference = reference;
        this.objPath = objPath;
    }

    public String getObjPath() {
        return objPath;
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

    @Override
    public String toString() {
        StringBuilder buffer = new StringBuilder();
        buffer.append(ModelTraceConstants.openJSON);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.traceType);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.dp);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(KActionType.REMOVE);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.coma);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.src);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.dp);
        buffer.append(ModelTraceConstants.bb);
        JSONString.encodeBuffer(buffer, srcPath);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.coma);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.meta);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.dp);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(reference.metaName());
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.coma);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.objpath);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.dp);
        buffer.append(ModelTraceConstants.bb);
        JSONString.encodeBuffer(buffer, objPath);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.closeJSON);
        return buffer.toString();
    }

}
