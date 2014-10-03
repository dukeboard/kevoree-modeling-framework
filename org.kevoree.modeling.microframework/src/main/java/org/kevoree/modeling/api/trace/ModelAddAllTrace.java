package org.kevoree.modeling.api.trace;

import org.kevoree.modeling.api.json.JSONString;
import org.kevoree.modeling.api.util.ActionType;

import java.util.List;

/**
 * Created by duke on 10/3/14.
 */
public class ModelAddAllTrace implements ModelTrace {

    private String refName = "";

    private ActionType traceType = ActionType.ADD_ALL;

    private String srcPath;

    private List<String> previousPath;

    private List<String> typeName;

    public ModelAddAllTrace(String srcPath, String refName, List<String> previousPath, List<String> typeName) {
        this.srcPath = srcPath;
        this.refName = refName;
        this.previousPath = previousPath;
        this.typeName = typeName;
    }

    private String mkString(List<String> ss) {
        if (ss == null) {
            return null;
        }
        StringBuilder buffer = new StringBuilder();
        boolean isFirst = true;
        for (String s : ss) {
            if (!isFirst) {
                buffer.append(ModelTraceConstants.coma);
            }
            buffer.append(s);
            isFirst = false;
        }
        return buffer.toString();
    }

    @Override
    public String getRefName() {
        return refName;
    }

    @Override
    public void setRefName(String refName) {
        this.refName = refName;
    }

    @Override
    public ActionType getTraceType() {
        return traceType;
    }

    @Override
    public void setTraceType(ActionType traceType) {
        this.traceType = traceType;
    }

    @Override
    public String getSrcPath() {
        return srcPath;
    }

    @Override
    public void setSrcPath(String srcPath) {
        this.srcPath = srcPath;
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
            buffer.append(ActionType.ADD_ALL);
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
        buffer.append(ModelTraceConstants.refname);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.dp);
        buffer.append(ModelTraceConstants.bb);
        buffer.append(refName);
        buffer.append(ModelTraceConstants.bb);
        if (previousPath != null) {
            buffer.append(ModelTraceConstants.coma);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.previouspath);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.dp);
            buffer.append(ModelTraceConstants.bb);
            JSONString.encodeBuffer(buffer, mkString(previousPath));
            buffer.append(ModelTraceConstants.bb);
        }
        if (typeName != null) {
            buffer.append(ModelTraceConstants.coma);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.typename);
            buffer.append(ModelTraceConstants.bb);
            buffer.append(ModelTraceConstants.dp);
            buffer.append(ModelTraceConstants.bb);
            JSONString.encodeBuffer(buffer, mkString(typeName));
            buffer.append(ModelTraceConstants.bb);
        }
        buffer.append(ModelTraceConstants.closeJSON);
        return buffer.toString();
    }

}
