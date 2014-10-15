package org.kevoree.modeling.api.trace;

import org.kevoree.modeling.api.KActionType;

/**
 * Created by duke on 10/2/14.
 */
public interface ModelTrace {

    public String getRefName();

    public void setRefName(String refName);

    public KActionType getTraceType();

    public void setTraceType(KActionType traceType);

    public String getSrcPath();

    public void setSrcPath(String srcPath);

    public String toCString(boolean withTypeName, boolean withSrcPath);

}
