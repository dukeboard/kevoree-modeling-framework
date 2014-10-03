package org.kevoree.modeling.api.trace;

import org.kevoree.modeling.api.util.ActionType;

/**
 * Created by duke on 10/2/14.
 */
public interface ModelTrace {

    public String getRefName();

    public void setRefName(String refName);

    public ActionType getTraceType();

    public void setTraceType(ActionType traceType);

    public String getSrcPath();

    public void setSrcPath(String srcPath);

    public String toCString(boolean withTypeName, boolean withSrcPath);

}
