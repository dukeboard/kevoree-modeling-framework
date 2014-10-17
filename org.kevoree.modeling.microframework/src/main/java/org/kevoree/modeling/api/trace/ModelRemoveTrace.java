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

    private Long srcKID;

    private Long objKID;

    private MetaReference reference;

    public ModelRemoveTrace(Long srcKID, MetaReference reference, Long objKID) {
        this.srcKID = srcKID;
        this.reference = reference;
        this.objKID = objKID;
    }

    public Long getObjKID() {
        return objKID;
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
    public Long getSrcKID() {
        return srcKID;
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
        JSONString.encodeBuffer(buffer, srcKID+"");
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
        JSONString.encodeBuffer(buffer, objKID+"");
        buffer.append(ModelTraceConstants.bb);
        buffer.append(ModelTraceConstants.closeJSON);
        return buffer.toString();
    }

}
