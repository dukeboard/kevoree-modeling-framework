package org.kevoree.modeling.api;

import org.kevoree.modeling.api.trace.TraceSequence;

import java.util.List;

/**
 * Created by duke on 9/30/14.
 */

public interface ModelSlicer {

    public void slice(List<KObject> elems, Callback<TraceSequence> callback);

}